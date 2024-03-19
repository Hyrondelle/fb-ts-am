import { useState } from 'react';
import { getStorage, ref,uploadBytes } from "firebase/storage";

const Profil = () => {
  const storage = getStorage();
  const imagesRef = ref(storage, 'images/img.jpg');
  const [photo,setPhoto] = useState<any>();

  const sendPhoto = (e:any) =>{
    e.preventDefault()
      uploadBytes(imagesRef, photo)
      .then((snapshot) => {
      console.log('Uploaded a blob or file!');
      console.log(snapshot);
      })
      .catch((e)=>console.log('pb upload'+e)
      );
    }
    
      const handleChange =(e:any) =>{
        setPhoto(e.target.files[0])
      }
    return (
        <div>
          <form onSubmit={sendPhoto}>
            <input onChange={handleChange} type="file" name="photoProfil" id="photoProfil" />
            <button  type="submit">envoyer</button>
            </form>
        </div>
    );
};

export default Profil;