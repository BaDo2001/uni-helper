import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
    const { authenticated, login, logout } = useAuthContext();

    return (
        <nav>
            <ul>
                {authenticated ? (
                    <>
                        <li>
                            <button type="button" onClick={logout}>Log out</button>
                        </li>
                        <li>
                            <Link to="/admin">Admin site</Link>
                        </li>
                        <li>
                            <Link to="/calendar">Calendar</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <button type="button" onClick={login}>Log in</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
