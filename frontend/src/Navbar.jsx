import React from 'react';
import { useNavigate } from 'react-router-dom';

import ReactLogo from './pictures/react.svg';

function Navbar() {

    const navigate = useNavigate();

    const handleRedirectLogin = () => {
        navigate('/login');
    };

    return (

        <nav className="navbar">
            <img src={ReactLogo} alt="Logo" className="logo-image" />

            <div className="button">
                <button className="buttons" onClick={handleRedirectLogin}>Login</button>
            </div>
        </nav>
    );
};

export default Navbar;