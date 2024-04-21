import JoblyApi from './api';
import { useAuth } from './hooks/useAuth';
import useFields from './hooks/useFields';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingOnSubmission from './LoadingOnSubmission';

function Profile() {
    const { authData, setAuthData } = useAuth();
    const navigate = useNavigate();
    const [ formData, handleChange, , isFormDirty, setIsFormDirty ] = useFields({
        username: authData.username,
        firstName: authData.firstName,
        lastName: authData.lastName,
        email: authData.email
    });
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await JoblyApi.patchUser(formData, authData, setAuthData);
            setIsLoading(false);
            navigate('/profile');
            setShowAlert({ success: true, message: "Changes saved successfully!"});
            setTimeout(() => setShowAlert(false), 3000);
            setIsFormDirty(false);
        } catch (error) {
            setIsLoading(false);
            setShowAlert({ success: false, message: error });
        }
    };

    return (
        <div>
            {showAlert && (
                <div className={`alert ${showAlert.success ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {Array.isArray(showAlert.message) ? (
                        <ul>
                            {showAlert.message.map((message, index) => (
                                <li key={index}>{message}</li>
                            ))}
                        </ul>
                    ) : (
                        showAlert.message
                    )}
                </div>
            )}
            <form className="credentials-form" onSubmit={handleSubmit}>
                <div className="card bg-secondary mb-3 p-2" style={{ maxWidth: "30rem" }}>
                    <div className="form-floating mb-3">
                        <input 
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            type="text" 
                            className="form-control" 
                            id="usernameInput" 
                            placeholder="Username"
                            autoComplete="on"
                            disabled
                        />
                        <label 
                            htmlFor="usernameInput">
                                Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email" 
                            className="form-control" 
                            id="emailInput" 
                            placeholder="name@example.com"
                            autoComplete="on"
                        />
                        <label 
                            htmlFor="emailInput">
                                Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            type="text" 
                            className="form-control" 
                            id="firstNameInput" 
                            placeholder="First Name"
                        />
                        <label 
                            htmlFor="firstNameInput">
                                First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            type="text" 
                            className="form-control" 
                            id="lastNameInput" 
                            placeholder="Last Name"
                        />
                        <label 
                            htmlFor="lastNameInput">
                                Last Name</label>
                    </div>
                    <LoadingOnSubmission isLoading={isLoading} buttonText={"Save Changes"} isFormDirty={isFormDirty} />
                </div>
            </form>
    </div>
    );
}

export default Profile;