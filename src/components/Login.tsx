import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const navigate = useNavigate();
    const emailError:HTMLElement =document.querySelector('.emailError') as HTMLElement;
    const passwordError:HTMLElement =document.querySelector('.passwordError') as HTMLElement;

    const SubmitLogin = async(e:any) =>{
        e.preventDefault();
        
        await axios({
            method:'post',
            url:`${import.meta.env.VITE_APP_URL_CLIENT}api/user/login`,
            withCredentials:true,
            data:{
                email,
                password
            },})
        .then((res:any)=>{
            if(res.data.errors){
                console.log(res);
                emailError.innerHTML=res.data.errors.email;
                passwordError.innerHTML=res.data.errors.password;
            }
            else{
                console.log(res)
                navigate("/home")
                localStorage.setItem('userId',res.data.user)
            }
            
        })
        .catch((err:any)=>console.log(err))
    }
    return (
        
            <div className='login'>
                    
                    <form >
                        <label htmlFor="email">Email:</label>
                        <input onChange={(e)=>setEmail(e.target.value)} type="text" name="email" id="email" />
                        <div className="emailError red"></div>
                        <label htmlFor="mdp">Mot de passe:</label>
                        <input onChange={(e)=>setPassword(e.target.value)} type="text" name="mdp" id="mdp" />
                        <div className="passwordError red"></div>
                        <input onClick={SubmitLogin} className='envoyer' type="button" value="Valider" />
                    </form>
                </div>
        
    );
};

export default Login;