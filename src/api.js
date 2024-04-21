import axios from 'axios';

const BASE_URL = "https://nutjobs.onrender.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

export default class JoblyApi {
  static async request(endpoint, data = {}, method = "get", token = null) {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get companies. */

  static async getCompanies(query) {
    let res;
    query ?
    res = await this.request(`companies/${query}`) :
    res = await this.request('companies/')
    return res.companies;
  }

  /** Get jobs. */

  static async getJobs(query) {
    let res;
    query ?
    res = await this.request(`jobs/${query}`) :
    res = await this.request('jobs/')
    return res.jobs;
  }

  /** Register users. */

  static async postUser(data, setAuthData) {
    let method = "post";
    const res = await this.request(`auth/register/`, data, method);
    const { token } = res;
    const res2 = await this.request(`users/${data.username}`, {}, "get", token);
    const { username, firstName, lastName, email, isAdmin, applications } = res2.user;
    setAuthData({ token, username, firstName, lastName, email, isAdmin, applications });
  }

  /** Login users. */

  static async logUser(data, setAuthData) {
    let method = "post";
    const res1 = await this.request(`auth/token/`, data, method);
    const { token } = res1;
    const res2 = await this.request(`users/${data.username}`, {}, "get", token);
    const { username, firstName, lastName, email, isAdmin, applications } = res2.user;
    setAuthData({ token, username, firstName, lastName, email, isAdmin, applications });
  }

  /** Patch user. */

  static async patchUser(data, authData, setAuthData) {
    try {
      let method = "patch";
      let token = authData.token;
      const requestData = { ...data };
      delete requestData['username'];
      const res = await this.request(`users/${authData.username}`, requestData, method, token);
      setAuthData({ ...authData, ...res.user });
    } catch (error) {
      throw error;
    }
  }

  /** Apply for a job. */

  static async apply(data, authData, setAuthData) {
    try {
      let method = "post";
      let token = authData.token;
      const res = await this.request(`users/${authData.username}/jobs/${data}`, {}, method, token);      
      setAuthData({ ...authData, applications: [...authData.applications, res.applied] });
    } catch (error) {
      throw error;
    }
  }
}