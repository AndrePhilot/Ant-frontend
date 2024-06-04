import JoblyApi from "./api";
import { useState, useEffect } from 'react';
import Searchbar from "./Searchbar";
import { useAuth } from './hooks/useAuth';
import JobCard from "./JobCard";

function JobsList() {
    const [ jobs, setJobs ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const { authData } = useAuth();

    const fetchJobs = async (term) => {
        let response;
        if (term) {
            const query = `?title=${term}`
            response = await JoblyApi.getJobs(query);
        } else {
            response = await JoblyApi.getJobs();
        }
        setJobs(response);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div>
            <h1 className="title">List of jobs</h1>
            <div className="searchbar">
                <Searchbar 
                    fetchJobs={fetchJobs}
                    setIsLoading={setIsLoading}
                />
            </div>
            {isLoading ? (
                <p>Loading ...</p>
                ) : (
                    <div className="company-list-container">
                        <JobCard jobs={jobs} authData={authData} />
                    </div>
                )}
        </div>
    )
}

export default JobsList;