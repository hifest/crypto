import {Converter} from "../components/Converter";
import {onAuthStateChanged,  signOut  } from "firebase/auth";
import {auth} from "../firebase"
import {useEffect} from "react";

export const MainPage = () => {
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                    console.log(user.uid)
            } else {
                console.log('dont registered')
            }
        });
    },[])
    const Exit = () =>{
        signOut(auth).then(() => {
            window.location.replace('/register')
        }).catch((error) => {
            // An error happened.
        });
    }
    return (

        <>
            <Converter/>
            {/*забий то для мене*/}
            <button onClick={Exit}>Вийти</button>
            {/*забий то для мене*/}
        </>
    )
}