import { useState } from 'react'
import React from 'react';

import { useNavigate } from 'react-router-dom';

function Homepage() {

    const navigate = useNavigate();

    const handleRedirectLogin = () => {
        navigate('/login');
    };
    const handleRedirectRegister = () => {
        navigate('/register');
    };

    return (
        <>
            <div className="body_homepage">
                <h1>MyOS</h1>
                <h2>Welcome to my app</h2>

                <div className="button">
                    <button className="buttons" onClick={handleRedirectLogin}>Login</button>
                </div>

                <button className="buttons" onClick={handleRedirectRegister}>Register</button>
            </div>
        </>
    )
}

export default Homepage
