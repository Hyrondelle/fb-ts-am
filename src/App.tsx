import {Routes,Route,useNavigate} from "react-router-dom";
import Connection from "./pages/Connection";
import Home from "./pages/Home";
import { useState,useEffect} from "react";
import { getUser } from "./Store";
import Profil from "./pages/Profil";

function App() {
  const navigate = useNavigate();
  const [Uid,setUid] = useState<any>('');
  const {checkUser}:any = getUser()
  
  useEffect(()=>{
    if(localStorage.getItem('userId')){
      const checkId = localStorage.getItem('userId');
      setUid(checkId)
      checkUser(Uid)
      navigate('/home')
    }
    else{
      navigate('/')
    }
  },[Uid, checkUser])
 
  return (
      <div>
          <Routes>
            <Route path="/" element={<Connection/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/profil" element={<Profil/>}/>  
          </Routes>
      </div>
  )
}

export default App
