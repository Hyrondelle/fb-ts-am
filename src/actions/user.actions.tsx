//import axios from "axios";
import { getDoc,doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {db} from '../firebase.config'
//import { getAuth} from "firebase/auth";


export const GET_USER = "GET_USER";


export const  GetUser = (uid:any) =>{
    const userRef = doc(db,'users',uid)
    const dispatch:any = useDispatch();
    //const auth:any = getAuth();
    return async(dispatch:any) =>{
        return  
            await getDoc(userRef)
                .then((res:any)=>{
                    console.log(res)
                    dispatch({type:GET_USER,payload:res})
                })
                .catch((error:any) => {
                     console.log('Error fetching user data:', error);
                     });
          //  getAuth()
          //  .getUser(uid)
          //  .then((userRecord:any) => {
          //  // See the UserRecord reference doc for the contents of userRecord.
          //  console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
          //  dispatch({type:GET_USER,payload:userRecord.data})
          //  })
          //  .catch((error:any) => {
          //  console.log('Error fetching user data:', error);
          //  });
    }
    //return (dispatch:any) =>{
    //    return axios
    //    .get(`${import.meta.env.VITE_APP_URL_CLIENT}api/user/${uid}`)
    //    .then((res)=>{
    //        dispatch({type:GET_USER,payload:res.data})
    //    })
    //    .catch(err=>console.log(err))
    //}
}