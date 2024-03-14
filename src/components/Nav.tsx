import {Link} from 'react-router-dom'
import {ImExit} from 'react-icons/im'

const Nav = () => {
  //const uid =useContext(UidContext)
  const uid = 'nico'
  //const userData = useSelector((state:any)=>state.userReducer)
    return (
        <nav>
          <Link to="/home">Home</Link>
          {(uid?
          <div className="pseudo-exit">
            <h1>Bonjour {}</h1>
            <ImExit/>
          </div>:<></>
          )}
        </nav>
    );
};

export default Nav;