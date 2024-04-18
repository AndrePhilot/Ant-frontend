import JoblyApi from "./api";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';
import './CompanyList.css'

function CompanyList() {
    const [ companies, setCompanies ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const navigate = useNavigate();

    const fetchCompanies = async (term) => {
        let response;
        if (term) {
            const query = `?name=${term}`
            response = await JoblyApi.getCompanies(query);
        } else {
            response = await JoblyApi.getCompanies();
        }
        setCompanies(response);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleClick = (companyHandle) => {
        navigate(`/companies/${companyHandle}`);
    };

    return (
        <div>
            <h1 className="title">List of companies</h1>
            <div className="searchbar">
                <Searchbar 
                    type="company" 
                    fetchCompanies={fetchCompanies}
                    setIsLoading={setIsLoading}
                />
            </div>
            <div className="company-list-container">
                {isLoading ? (
                    <p>Loading ...</p>
                    ) : (
                    companies.length === 0 ? (
                        <p>No company found</p>
                    ) : (
                        companies.map(company => (
                            <button 
                                type="button" 
                                className="btn btn-outline-primary"
                                key={company.handle}
                                onClick={() => handleClick(company.handle)}
                            >
                                {company.name}
                            </button>
                        ))  
                        )
                    )
                }
            </div>
        </div>
    );
}

export default CompanyList;