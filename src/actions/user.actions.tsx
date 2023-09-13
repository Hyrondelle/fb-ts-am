import axios from "axios";

export const GET_USER = "GET_USER";

export const getUser = (uid:any) =>{
    return (dispatch:any) =>{
        return axios
        .get(`${import.meta.env.VITE_APP_URL_CLIENT}api/user/${uid}`)
        .then((res)=>{
            dispatch({type:GET_USER,payload:res.data})
        })
        .catch(err=>console.log(err))
    }
}