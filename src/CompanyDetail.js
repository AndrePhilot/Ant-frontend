import JoblyApi from "./api";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import JobCard from './JobCard';

function CompanyDetail() {
    const [ company, setCompany ] = useState([]);
    const params = useParams();
    const { authData } = useAuth();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        async function fetchCompany() {
            const response = await JoblyApi.getCompany(params.handle);
            setCompany(response);
            setIsLoading(false);
        }
        fetchCompany();
    }, [params.handle]);

    return (
        <div>
            {isLoading ? (
                <p>Loading ...</p>
            ) : (
                <>
                    <div className="company-title">
                        <h4>Company: {company.name}</h4>
                        <h5>Number of employees: {company.numEmployees}</h5>
                        <h6>Description: {company.description}</h6>
                    </div>
                    <div className="company-list-container">
                        <JobCard jobs={company.jobs} authData={authData} />
                    </div>                </>
            )}
        </div>
    );
}

export default CompanyDetail;