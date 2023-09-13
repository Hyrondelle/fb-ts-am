import axios from 'axios';
import React, { useState } from 'react';

const Signup = () => {
    const [pseudo,setPseudo] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [verif,setVerif] = useState<string>('');
    const pseudoError:HTMLElement =document.querySelector('.emailError') as HTMLElement;
    const emailError:HTMLElement =document.querySelector('.emailError') as HTMLElement;
    const passwordError:HTMLElement =document.querySelector('.passwordError') as HTMLElement;

    const SubmitSignup = async(e:any) =>{
        e.preventDefault();
        if(password===verif){
            
            await axios({
                method:'post',
                url:`${import.meta.env.VITE_APP_URL_CLIENT}api/user/register`,
                withCredentials:true,
                data:{
                    pseudo,
                    email,
                    password
                },})
            .then((res:any)=>{
                if(res.data.errors){
                    console.log(res);
                    pseudoError.innerHTML=res.data.errors.pseudo;
                    emailError.innerHTML=res.data.errors.email;
                    passwordError.innerHTML=res.data.errors.password;
                }
                else{
                    console.log(res)
                    localStorage.setItem('userId',res.data.user)
                }
                
            })
            .catch((e:any)=>console.log(e))            
        }
        else{return console.log('verifiction password incorrecte');
        }
    }
    return (
        
                <div className='signup'>
                    
                    <form >  
                        <label htmlFor="pseudo">Pseudo:</label>
                        <input onChange={(e)=>setPseudo(e.target.value)} type="text" name="pseudo" id="pseudo" /> 
                        <div className="pseudoError red"></div>

                        <label htmlFor="emailUp">Email:</label>
                        <input onChange={(e)=>setEmail(e.target.value)} type="text" name="email" id="emailUp" />
                        <div className="emailError red"></div>

                        <label htmlFor="mdpUp">Mot de passe:</label>
                        <input onChange={(e)=>setPassword(e.target.value)} type="text" name="mdp" id="mdpUp" />
                        <div className="passwordError red"></div>

                        <label htmlFor="confirm">confirmer:</label>
                        <input onChange={(e)=>setVerif(e.target.value)} type="text" name="confirm" id="confirm" />
                        
                        <input onClick={SubmitSignup} className='envoyer' type="button" value="Valider" />
                    </form>
                </div>
            
        
       );
    };


export default Signup;