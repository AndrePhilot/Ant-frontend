function LoadingOnSubmission({ isLoading, buttonText, isFormDirty = true }) {
    return (
        isLoading ? (
            <div className='loader-container'>
                <div className="loader"></div>
            </div>
        ) : (
        <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!isFormDirty}
        >
            {buttonText}
        </button>
        )
    )
}

export default LoadingOnSubmission;