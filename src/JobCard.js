import JoblyApi from "./api";
import { useAuth } from './hooks/useAuth';

function JobCard({ jobs, authData }) {
    const { setAuthData } = useAuth();

    const handleApply = async (jobId) => {
        try {
            await JoblyApi.apply(jobId, authData, setAuthData);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        jobs && jobs.length === 0 ? (
            <p>No jobs found</p>
        ) : (
            jobs && jobs.map(job => (
                <div key={job.id} className="card border-primary mb-3" style={{ maxWidth: '15rem' }}>
                    <div className="card-header">{job.title}</div>
                    <div className="card-body">
                        <h4 className="card-title">Salary: {job.salary}</h4>
                        <button id={job.id} onClick={() => handleApply(job.id)} disabled={authData.applications.includes(job.id)} type="button" className="btn btn-primary" style={{ maxWidth: '5rem' }}>Apply</button>
                    </div>
                </div>
            ))
        )
    );
}

export default JobCard;