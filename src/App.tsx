import {Routes,Route,useNavigate} from "react-router-dom";
import Connection from "./pages/Connection";
import Home from "./pages/Home";
//import {UidContext} from './components/UidContext'
import { useState,useEffect} from "react";
import Nav from "./components/Nav";
import { useDispatch } from "react-redux";
import { GetUser } from "./actions/user.actions";

function App() {
  const navigate = useNavigate();
  const dispatch:any = useDispatch()
  const [Uid,setUid] = useState<any>('');
  
  useEffect(()=>{
    if(localStorage.getItem('userId')){
      const checkId = localStorage.getItem('userId');
      setUid(checkId)
      //dispatch(GetUser(Uid))
      navigate('/home')
    }
  },[Uid])
  //const dispatch:any = useDispatch()

 /* useEffect(()=>{
    const CheckToken = async ()=>{
      await axios({
        method:'get',
        url:`${import.meta.env.VITE_APP_URL_CLIENT}jwtid`,
        withCredentials:true,
      })
      .then((res)=>{
        console.log(res);
        setUid(res.data)
      })
      .catch((err)=>console.log('no token'))
    }
    CheckToken();

    if(Uid) dispatch(getUser(Uid))
  },[Uid]) */

  return (
    //<UidContext.Provider value={Uid}>
      <div>
        <Nav/>
        <Routes>
          <Route path="/" element={<Connection/>}/>
          <Route path="/home" element={<Home/>}/>
          
        </Routes>
        </div>
    //</UidContext.Provider>
  )
}

export default App
