import React,{useContext} from 'react';
import {Link} from 'react-router-dom'
import {ImExit} from 'react-icons/im'
import { UidContext } from './UidContext';
import { useSelector } from 'react-redux';

const Nav = () => {
  const uid =useContext(UidContext)
  const userData = useSelector((state:any)=>state.userReducer)
    return (
        <nav>
          <Link to="/home">Home</Link>
          {(uid?
          <div className="pseudo-exit">
            <h1>Bonjour {userData.pseudo}</h1>
            <ImExit/>
          </div>:<></>
          )}
        </nav>
    );
};

export default Nav;