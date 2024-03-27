import { getAuth, signOut } from "firebase/auth";

const Logout = () => {
   
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        localStorage.removeItem('userId')
        window.location.pathname ="/"
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