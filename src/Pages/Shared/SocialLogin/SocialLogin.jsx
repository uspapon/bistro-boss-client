import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const newUser = result.user;
                console.log(newUser);

                // save user info to database
                const saveUser = { name: newUser.displayName, email: newUser.email }
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                .then(result => result.json())
                .then(data => { 
                    console.log("social signin page ",from)
                    navigate(from, { replace: true })
                   
                })
                
            })
            .catch(error => console.log(error))
    }
    return (
        <div>
            <div className="divider"></div>
            <div className='text-center my-4'>
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;