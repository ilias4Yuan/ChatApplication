import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { loginRoute } from "../utils/APIRoutes";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";



export default function Login() {
  const navigate = useNavigate();
  const[ values , setValues] = useState({
    username: "",
    password:"",
   });
    const toastOptions={
      position:"bottom-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
    // useEffect(() =>{
    //   if(localStorage.getItem("chat-app-user")) {
    //     navigate("/");
    //   }
    // },[])

    const handleSubmit = async (event) => {
      event.preventDefault();
         if(handleValidation()){
          const { password , username } = values;
          const { data } = await axios.post( loginRoute, {
            username,
            password,
         });
         if(data.status === false){
            toast.error(data.msg, toastOptions);
         }
         if(data.status === true){
            localStorage.setItem('chat-app-user',JSON.stringify(data.user));
            navigate("/");
         }
        }
     };
    
   const handleValidation =() => { 
    const { password , username} = values;
    if(password === ""){
      toast.error("Mot de passe est obligatoire",
      toastOptions 
      );
      return false;
    }else if(username.length === ""){
      toast.error("Nom d'utilisateur est obligatoire",
      toastOptions );
      return false;
    }
    return true;
    };


    const handleChange = (event)=> {
      setValues({...values,[event.target.name]:event.target.value});
    };
   
  return (
    <>
 <FormContainer>
     <form action="" onSubmit={(event) => handleSubmit(event)} >
        <div className="brand">
            
            <h1>CHAT SHAT</h1>
        </div>
        <input 
         type="text"
         placeholder="Nom d'utilisateur" 
         name="username"
         onChange={(e)=>handleChange(e)}
         min="3"
           />
            <input 
         type="password"
         placeholder="Mot de passe" 
         name="password"
         onChange={(e)=>handleChange(e)}
           />
           <button type="submit">Se connecter</button>
           <span>Vous n'êtes pas inscrit? <a href="/Register">Créer un compte</a>
           </span>

     </form>
    
    </FormContainer>
     <ToastContainer/>
    </>
  );
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: black;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
    font-family:Black Ops One ;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #131324;
  border-radius: 2rem;
  padding: 3rem 5rem;
  text-align: center;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #318bae;
  border-radius: 0.4rem;
  color: white;
  width: 110%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #2dba8d;
    outline: none;
  }
}
button {
  display: block;
  margin: auto;
  background-color: #318bae;
  color: white;
  padding: 1rem ;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: transparent;
  }
}
span {
  color: white;
  text-transform: uppercase;
  a {
    color: #318bae;
    text-decoration: none;
    font-weight: bold;
    &:hover{
      text-decoration: underline;
    }
  }
}
`;

//  export default Register;
