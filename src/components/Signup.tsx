import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc,setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../Store';


const Signup = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [pseudo,setPseudo] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [verif,setVerif] = useState<string>('');
    const {checkUser}:any = getUser();
    // eslint-disable-next-line no-useless-escape
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const pseudoError:HTMLElement =document.querySelector('.pseudoError') as HTMLElement;
    const emailError:HTMLElement =document.querySelector('.emailError') as HTMLElement;
    const passwordError:HTMLElement =document.querySelector('.passwordError') as HTMLElement;
    const verifError:HTMLElement =document.querySelector('.verifError') as HTMLElement;

    const SubmitSignup = async(e:React.MouseEvent<HTMLInputElement>) =>{
        e.preventDefault();
        if(pseudo.length< 6){
            pseudoError.innerHTML='6 caractères min';
        }
        else{
            pseudoError.innerHTML='';
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
                    if(password===verif){
                        await createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            try{
                                const user = userCredential.user;
                                const userRef = doc(db,'users',user.uid);
                                setDoc(userRef,{email:user.email,
                                    pseudo:pseudo,
                                    bio:'',
                                    userId:user.uid
                                });
                                console.log(user);
                                localStorage.setItem('userId',user.uid)
                                checkUser(user.uid)
                                navigate('/home');
                            }catch(e){
                                console.log(e)
                            }
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }     
                    else{
                        verifError.innerHTML='password incorrect';
                    } 
                }
            }
        }
        
        
    }
    return (
        
                <div className='signup'>
                    
                    <form >  
                        <label htmlFor="pseudo">Pseudo:</label>
                        <input onChange={(e)=>setPseudo(e.target.value)} type="text" autoComplete='off' name="pseudo" id="pseudo" /> 
                        <div className="pseudoError red"></div>

                        <label htmlFor="emailUp">Email:</label>
                        <input onChange={(e)=>setEmail(e.target.value)} type="text" autoComplete='off' name="email" id="emailUp" />
                        <div className="emailError red"></div>

                        <label htmlFor="mdpUp">Mot de passe:</label>
                        <input onChange={(e)=>setPassword(e.target.value)} type="text" autoComplete='off' name="mdp" id="mdpUp" />
                        <div className="passwordError red"></div>

                        <label htmlFor="confirm">confirmer:</label>
                        <input onChange={(e)=>setVerif(e.target.value)} type="text" autoComplete='off' name="confirm" id="confirm" />
                        <div className="verifError red"></div>
                        
                        <input onClick={SubmitSignup} className='envoyer' type="button" value="Valider" />
                    </form>
                </div>
            
        
       );
    };


export default Signup;