import {create} from 'zustand';
import { DocumentData, doc ,getDoc } from 'firebase/firestore';
import { db } from '../src/firebase.config';

export const getUser = create((set)=>({
    email:'email@mail.fr',
    id:'',
    async checkUser(userId:any){
        const userRef = doc(db,'users',userId);
        await getDoc(userRef)
        .then((rep:DocumentData)=>{
          const repObj = rep.data()
          //const repJson = JSON.stringify(repObj)
          set({email:repObj.email,id:rep.id})
        })
        .catch((e)=>console.log(e)
        )
    }
})
)