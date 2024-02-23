//import axios from 'axios';
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc,getDocs, collection,doc,setDoc } from 'firebase/firestore';
import {db } from '../firebase.config';


const Signup = () => {
    const usersCollectionRef = collection(db,"users");
    const auth = getAuth();
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
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                try{
                    const user = userCredential.user;
                    const userRef = doc(db,'users',user.uid)
                    //addDoc(usersCollectionRef,{email})
                    const sendDoc =  setDoc(userRef,{email:user.email,userId:user.uid})
                    console.log(user)
                }catch(e){
                    console.log(e)
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        }     
        else{
            return console.log('verifiction password incorrecte'); 
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