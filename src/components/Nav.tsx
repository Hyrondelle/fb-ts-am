import {Link} from 'react-router-dom'
import {ImExit} from 'react-icons/im'
import { getUser } from '../Store';
import Logout from './Logout';

const Nav = () => {

  const {pseudo}:any = getUser();
    return (
        <nav>
          {(window.location.pathname=='/home')?<Link aria-label='go profil page' to="/profil">profil</Link>:<Link to="/home">home</Link>}
          {(pseudo?
          <div className="pseudo-exit">
            <h1>Bonjour {pseudo}</h1>
            <button onClick={Logout}><ImExit aria-label='deconnexion' className='exit'/></button>
          </div>:<></>
          )}
        </nav>
    );
};

export default Nav;