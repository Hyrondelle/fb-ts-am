//import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { db,auth } from '../firebase.config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getUser } from '../Store';
import { FirebaseError } from 'firebase/app';

const Login = () => {
    const auth = getAuth();
    const {checkUser}:any = getUser();
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const navigate = useNavigate();
    // eslint-disable-next-line no-useless-escape
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const emailError:HTMLElement =document.querySelector('.emailError') as HTMLElement;
    const passwordError:HTMLElement =document.querySelector('.passwordError') as HTMLElement;
    const dbError:HTMLElement =document.querySelector('.passwordError') as HTMLElement;

    const SubmitLogin = async(e:React.MouseEvent<HTMLInputElement>) =>{
        e.preventDefault();
        dbError.innerHTML='';
        if(!emailRegex.test(email)){
            emailError.innerHTML='email incorrect';
        }
        else{
            emailError.innerHTML='';
            dbError.innerHTML='';
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
                checkUser(user.uid)
                navigate("/home")
                // ...
                })
                .catch((error:FirebaseError) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage);
                dbError.innerHTML='Email ou mdp incorrect';
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
                        <div className="dbError red"></div>
                    </form>
                </div>
        
    );
};

export default Login;