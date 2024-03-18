import {Link} from 'react-router-dom'
import {ImExit} from 'react-icons/im'
import { getUser } from '../Store';

const Nav = () => {
  const {pseudo}:any = getUser();
    return (
        <nav>
          <Link to="/profil">profil</Link>
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