import React from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faCalendarAlt, faHome, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../../contexts/AuthContext';
import { NavItemContainer, LinkNavItem, ButtonNavItem } from './NavItem';

const Navbar: React.FC = () => {
    const { authScope, login, logout } = useAuthContext();

    return (
        <nav className="sm:p-4 text-blue-600">
            <h2 className="uppercase text-lg font-semibold p-2 mb-6">Uni-helper</h2>
            <ul>
                {authScope === 'NONE' ? (
                    <NavItemContainer variant="BUTTON" icon={faGoogle}>
                        <GoogleLogin
                            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
                            onSuccess={login}
                            cookiePolicy="single_host_origin"
                            isSignedIn
                            render={renderProps => <ButtonNavItem title="Log in" {...renderProps} />}
                        />
                    </NavItemContainer>
                ) : (
                    <>
                        <NavItemContainer variant="BUTTON" icon={faGoogle}>
                            <GoogleLogout
                                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
                                onLogoutSuccess={logout}
                                render={renderProps => <ButtonNavItem title="Log out" {...renderProps} />}
                            />
                        </NavItemContainer>
                        <NavItemContainer variant="LINK" icon={faHome}>
                            <LinkNavItem to="/dashboard" title="Dashboard" />
                        </NavItemContainer>
                        <NavItemContainer variant="LINK" icon={faCalendarAlt}>
                            <LinkNavItem to="/calendar" title="Calendar" />
                        </NavItemContainer>
                        {authScope === 'ADMIN' && (
                            <NavItemContainer variant="LINK" icon={faUserCog}>
                                <LinkNavItem to="/admin" title="Admin site" />
                            </NavItemContainer>
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
