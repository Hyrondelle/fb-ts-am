import {Routes,Route} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import Connection from "./pages/Connection";
import Home from "./pages/Home";
import { useState,useEffect} from "react";
import { UserType, getUser } from "./Store";
import Profil from "./pages/Profil";

function App() {
  
  const [Uid,setUid] = useState<string>('');
  const {checkUser}:UserType = getUser()

  const sendUserToStore = async () => {
    const checkId = localStorage.getItem('userId');
    if(checkId!==null){
      const idValue:string = checkId
      setUid(idValue)
      await checkUser(Uid)
      window.location.pathname=='/home'
  }
  else{
    window.location.pathname=='/'
  }
}
  
  useEffect(()=>{
        sendUserToStore()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[Uid])
 
  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Connection/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/profil" element={<Profil/>}/>  
          </Routes>
          </Router>
      </div>
  )
}

export default App
