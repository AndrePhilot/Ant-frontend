import JoblyApi from './api';
import { useAuth } from './hooks/useAuth';
import useFields from './hooks/useFields';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Signup() {
    const { setAuthData } = useAuth();
    const navigate = useNavigate();
    const [ formData, handleChange, resetFormData ] = useFields({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [showAlert, setShowAlert] = useState({ containsAlert: false, message: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await JoblyApi.postUser(formData, setAuthData);
            resetFormData();
            navigate('/');
        } catch (error) {
            setShowAlert({ containsAlert: true, message: error });
        }
    };

    return (
        <>
            {showAlert.containsAlert && (
                <div className="alert alert-danger" role="alert">
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
            <div className="card bg-secondary mb-3" style={{ maxWidth: "30rem" }}>
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
                        required
                    />
                    <label 
                        htmlFor="usernameInput">
                            Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password" 
                        className="form-control" 
                        id="passwordInput" 
                        placeholder="Password" 
                        autoComplete="off"
                        required
                    />
                    <label 
                        htmlFor="passwordInput">
                            Password</label>
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
                        required
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
                        required
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
                        required
                    />
                    <label 
                        htmlFor="lastNameInput">
                            Last Name</label>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </div>
        </form>
        </>
    );
}

export default Signup;