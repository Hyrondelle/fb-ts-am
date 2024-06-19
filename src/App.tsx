import {Routes,Route,useNavigate} from "react-router-dom";
import Connection from "./pages/Connection";
import Home from "./pages/Home";
import { useState,useEffect} from "react";
import { UserType, getUser } from "./Store";
import Profil from "./pages/Profil";

function App() {
  const navigate = useNavigate();
  const [Uid,setUid] = useState<string>('');
  const {checkUser}:UserType = getUser()

  const sendUserToStore = async () => {
    const checkId = localStorage.getItem('userId');
    if(checkId!==null){
      const idValue:string = checkId
      setUid(idValue)
      await checkUser(Uid)
      navigate('/home')
  }
  else{
    navigate('/')
  }
}
  
  useEffect(()=>{
    
      
        sendUserToStore()
        
      
    
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[Uid,navigate])
 
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
