import React from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
    const { authScope, login, logout } = useAuthContext();

    return (
        <nav>
            <ul>
                {authScope !== 'NONE' ? (
                    <>
                        <li>
                            <GoogleLogout
                                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
                                buttonText="Log out"
                                onLogoutSuccess={logout}
                            />
                        </li>
                        {
                            authScope === 'ADMIN' && (
                                <li>
                                    <Link to="/admin">Admin site</Link>
                                </li>
                            )
                        }
                        <li>
                            <Link to="/calendar">Calendar</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <GoogleLogin
                            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
                            buttonText="Login"
                            onSuccess={login}
                            cookiePolicy="single_host_origin"
                            isSignedIn
                        />
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
