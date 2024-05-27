import {create} from 'zustand';
import { DocumentData, doc ,getDoc } from 'firebase/firestore';
import { db } from '../src/firebase.config';

export type UserType={
  email:string;
  id:string;
  pseudo:string;
  checkUser:(userId:string)=>void
}
export const getUser = create<UserType>((set)=>({
    email:'email@mail.fr',
    id:'',
    pseudo:'',
    checkUser(userId:string){
        if(!userId){
          console.log('vérifiez que vous êtes connecté');
        }
        else{
          const userRef = doc(db,'users',userId);
        getDoc(userRef)
        .then((rep:DocumentData)=>{
          const repObj = rep.data()
          set({email:repObj.email,pseudo:repObj.pseudo,id:rep.id})
          console.log('vous êtes connecté')
        })
        .catch((e)=>console.log(e)
        )
        }
        
    }
})
)
export const btnUpdate = create((set)=>({
  click:false,
  toggleBtn(click:boolean){
    set({click:!click})
  },
  
}))


