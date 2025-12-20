import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function Loginpage() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRedirectHomepage = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert('You need to give your username AND your password!');
            return;
        }

        try {
            const response = await fetch('http://localhost:3100/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Login successful: ${data.username}`);
                navigate('/');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
        }
    };


    return (
        <>
            <div>
                <h1>Loginpage</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <label>
                    Enter your username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <p></p>
                <label>
                    Enter your password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <p></p>
                <button type="submit">Login</button>
            </form>


            <button onClick={handleRedirectHomepage}>Back to Homepage</button>

        </>
    );
}

export default Loginpage;