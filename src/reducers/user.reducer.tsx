const initialState ={};
import { GET_USER } from "../actions/user.actions";

export default function userReducer(state= initialState, action:any){
    switch(action.type){
        case GET_USER:
            return action.payload;
        default : 
            return state;
    }
}