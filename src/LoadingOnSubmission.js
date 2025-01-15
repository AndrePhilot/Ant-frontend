function LoadingOnSubmission({ isLoading, buttonText, isFormDirty = true }) {
    return (
        isLoading ? (
            <div className="loader-container">
                <div className="loader"></div>
                <p className="loading-message">
                    Hang tight! This might take up to 2 minutes. Think of it as a coffee break, but without the coffee—our free hosting needs its time to shine!
                </p>
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
    );
}

export default LoadingOnSubmission;
