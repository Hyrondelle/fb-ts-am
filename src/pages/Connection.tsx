import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';

const Connection = () => {
    const [signup,setSignup] = useState<boolean>(true);
    const NodalBtn = () =>{
        setSignup(!signup)
    }
    return (
        <div className='connection'>
            <div className="nodal">
                <div className="nodal-btns">
                    <div className={signup?'signup-btn border':'signup-btn'} 
                    onClick={NodalBtn}>Inscription</div>
                    <div className={signup?'login-btn':'login-btn border'}
                    onClick={NodalBtn}>Connection</div>
                </div>
                {signup?<Signup/>:<Login/>}
            </div>
        </div>
    );
};

export default Connection;