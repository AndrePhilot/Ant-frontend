import { Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import './navbar.css'

function NavBar() {
    const { authData, setAuthData } = useAuth();

    const handleLogout = () => {
        setAuthData({ token: null, username: null });
    }

    return (
        <nav className="navbar navbar-expand-xl bg-primary" data-bs-theme="dark"> 
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to="/"><b>Ant</b></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto text-light">
                        {authData.token && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/companies">Companies</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/jobs">Jobs</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" onClick={handleLogout} to="/">Log out {authData.username}</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {!authData.token && (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/signup">Sign Up</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
