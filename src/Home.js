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
            {isLoading && <p>Loading...</p>}
            <div className='spline-wrapper'>
                <Spline scene="https://prod.spline.design/FGBOYQTGNy2txhwQ/scene.splinecode" onLoad={handleLoad} />
            </div>
            {!isLoading && (
                <div>
                    <div className="welcome-message">
                        <h1>Welcome to Ant!</h1>
                        <p>Your Gateway to Unimaginable Careers</p>
                        <p>At Ant, we're just like any other job application platform, except for one thing: we promise you'll never hear back from our companies. It's not that they're ghosting you; they simply don't exist in the first place! Try now!</p>
                    </div>
                    {authData.token ? (
                        <div className="auth-buttons">
                            <Link to='/jobs'><button className="btn btn-primary">Jobs</button></Link>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to='/login'><button className="btn btn-primary">Login</button></Link>
                            <Link to='/signup'><button className="btn btn-primary">Sign Up</button></Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
