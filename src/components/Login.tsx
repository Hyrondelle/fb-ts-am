//import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { db,auth } from '../firebase.config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const auth = getAuth();
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const navigate = useNavigate();
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const emailError:HTMLElement =document.querySelector('.emailError') as HTMLElement;
    const passwordError:HTMLElement =document.querySelector('.passwordError') as HTMLElement;

    const SubmitLogin = async(e:any) =>{
        e.preventDefault();
        if(!emailRegex.test(email)){
            emailError.innerHTML='email incorrect';
        }
        else{
            emailError.innerHTML='';
            if(password.length < 6){
                passwordError.innerHTML='6 caractères min';
            }
            else{
                passwordError.innerHTML='';
                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                localStorage.setItem('userId',user.uid)
                navigate("/home")
                // ...
                })
                .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                });
            }
        }
        
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