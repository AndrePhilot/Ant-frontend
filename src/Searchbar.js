import useFields from "./hooks/useFields";

function Searchbar({ type, fetchCompanies, fetchJobs, setIsLoading }) {
    const [ formData, handleChange, resetFormData ] = useFields({
        term: ""
    })

    const handleSubmit = async e => {
        setIsLoading(true);
        e.preventDefault();
        type === 'company' ?
        fetchCompanies(formData.term) :
        fetchJobs(formData.term);
        resetFormData();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter search term" 
                    aria-label="Search term" 
                    aria-describedby="button-addon2"
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                >
                </input>
                <button 
                    className="btn btn-primary" 
                    type="submit" 
                    id="button-addon2"
                >
                    Find
                </button>
            </div>
        </form>
    )
}

export default Searchbar;