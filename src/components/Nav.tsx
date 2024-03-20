import {Link} from 'react-router-dom'
import {ImExit} from 'react-icons/im'
import { getUser } from '../Store';

const Nav = () => {
  const {pseudo}:any = getUser();
    return (
        <nav>
          {(window.location.pathname=='/home')?<Link to="/profil">profil</Link>:<Link to="/home">home</Link>}
          {(pseudo?
          <div className="pseudo-exit">
            <h1>Bonjour {pseudo}</h1>
            <ImExit/>
          </div>:<></>
          )}
        </nav>
    );
};

export default Nav;