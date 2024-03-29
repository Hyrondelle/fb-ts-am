import {create} from 'zustand';
import { DocumentData, doc ,getDoc } from 'firebase/firestore';
import { db } from '../src/firebase.config';

export const getUser = create((set)=>({
    email:'email@mail.fr',
    id:'',
    pseudo:'',
    async checkUser(userId:any){
        const userRef = doc(db,'users',userId);
        await getDoc(userRef)
        .then((rep:DocumentData)=>{
          const repObj = rep.data()
          set({email:repObj.email,pseudo:repObj.pseudo,id:rep.id})
        })
        .catch((e)=>console.log(e)
        )
    }
})
)
export const btnUpdate = create((set)=>({
  click:false,
  toggleBtn(click:boolean){
    set({click:!click})
  },
  
}))


