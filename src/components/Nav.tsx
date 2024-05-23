import {Link} from 'react-router-dom'
import {ImExit} from 'react-icons/im'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getUser } from '../Store';
import Logout from './Logout';

const Nav = () => {
  const storage = getStorage(); 
  const {pseudo,id}:any = getUser();
  if(pseudo){
    try{
      getDownloadURL(ref(storage, 'profil/'+id+'/'+id+'.jpg'))
      .then((url) => {
      const img = document.getElementById('profilNav');
      img?.setAttribute('src', url);
      })
      .catch((err) =>console.log(err))
    }
    catch(err){
      console.log(err);
    }
  }
  

    return (
        <nav>
          {(window.location.pathname=='/home')?<Link aria-label='go profil page' to="/profil">profil</Link>:<Link to="/home">home</Link>}
          {(pseudo?
          <div className="pseudo-exit">
            <img id='profilNav' src='src\assets\defautProfil.png' alt='profil picture'></img>
            <h1>{pseudo}</h1>
            <button onClick={Logout}><ImExit aria-label='deconnexion' className='exit'/></button>
          </div>:<></>
          )}
        </nav>
    );
};

export default Nav;