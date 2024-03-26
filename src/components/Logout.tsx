import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    signOut(auth).then(() => {
    // Sign-out successful.
    navigate('/')
    }).catch((error) => {
    // An error happened.
    console.log(error);
    });

    return (
        <div>
            
        </div>
    );
};

export default Logout;