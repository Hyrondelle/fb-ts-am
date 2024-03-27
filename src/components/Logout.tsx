import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const LoGout = async() =>{
    const auth = getAuth();
    const navigate = useNavigate();
    await signOut(auth).then(() => {
    // Sign-out successful.
    localStorage.removeItem('userId')
    navigate('/')
    }).catch((error) => {
    // An error happened.
    console.log(error);
    });
}

const Logout = () => {

    return (
        <div>
            
        </div>
    );
};

export default Logout;