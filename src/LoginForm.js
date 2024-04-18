import JoblyApi from './api';
import { useAuth } from './hooks/useAuth';
import useFields from './hooks/useFields';
import { useNavigate } from 'react-router-dom';
import './Form.css'

function LoginForm() {
    const { setAuthData } = useAuth();
    const navigate = useNavigate();
    const [ formData, handleChange ] = useFields({
        username: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await JoblyApi.logUser(formData, setAuthData);
            navigate('/');
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
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
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default LoginForm;