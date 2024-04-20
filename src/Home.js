import Spline from '@splinetool/react-spline';
import { useAuth } from './hooks/useAuth';
import { Link } from 'react-router-dom';
import './Home.css';
import { useState } from 'react';

function Home() {
    const { authData } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="home-container">
            {isLoading && (
                <div className='loader-container'>
                    <div className="loader"></div>
                </div>
            )}
            <div className='spline-wrapper'>
                <Spline scene="https://prod.spline.design/FGBOYQTGNy2txhwQ/scene.splinecode" onLoad={handleLoad} />
            </div>
            {!isLoading && (
                <div>
                    <div className="welcome-message">
                        <div className="card bg-secondary mb-3 custom-card">
                            <div className="card-body">
                                <h3 className="card-text lg custom-card-text"><b>Welcome to Nutjobs!</b></h3>
                                <p className="card-text custom-card-text">We're just like any other job application platform, except for one thing: we promise you'll never hear back from our companies. It's not that they're ghosting you; they simply don't exist in the first place! Try now!</p>
                            </div>
                        </div>
                    </div>
                    {authData.token ? (
                        <div className="auth-buttons">
                            <Link to='/jobs'><button className="btn btn-success">Jobs</button></Link>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to='/login'><button className="btn btn-success">Login</button></Link>
                            <Link to='/signup'><button className="btn btn-success">Sign Up</button></Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
