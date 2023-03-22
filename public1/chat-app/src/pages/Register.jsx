import React, {useState,  } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Logo from "../assets/logo.png"
import { registerRoute } from "../utils/APIRoutes";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";



export default function Register() {
  const navigate = useNavigate();
  const[ values , setValues] = useState({
    username: "",
    email:"" ,
    password:"",
    confirmPassword:"",
   });
    const toastOptions={
      position:"bottom-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
         if(handleValidation()){
          console.log("in Validation", registerRoute);
          const { password , username, email  } = values;
          const { data } = await axios.post(registerRoute, {
            username,
            email,
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
    const { password , confirmPassword , username ,email} = values;
    if(password !== confirmPassword){
      toast.error("Confirmer le mot de passe et le mot de passe doivent être identiques.",
      toastOptions 
      );
      return false;
    }else if(username.length<3){
      toast.error("Nom d'utilisateur doit être au moins de 3 caractères",
      toastOptions );
      return false;
    }else if(password.length<6){
      toast.error("Mot de passe doit être au moins de 6 caractères",
      toastOptions );
      return false;
    }else if(email ===""){
    toast.error("Email est obligatoire", toastOptions );
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
            {/* <img src={Logo} alt="Logo" /> */}
            <h1>CHAT SHAT</h1>
        </div>
        <input 
         type="text"
         placeholder="Nom d'utilisateur" 
         name="username"
         onChange={(e)=>handleChange(e)}
           />
            <input 
         type="email"
         placeholder="Email" 
         name="email"
         onChange={(e)=>handleChange(e)}
           />
            <input 
         type="password"
         placeholder="Mot de passe" 
         name="password"
         onChange={(e)=>handleChange(e)}
           />
            <input 
         type="password"
         placeholder="Confirmation du mot de passe" 
         name="confirmPassword"
         onChange={(e)=>handleChange(e)}
           />
           <button type="submit">Créer un utilisateur</button>
           <span>Déjà inscrit? <a href="/Login">Se connecter</a>
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
    font-family: Black Ops One;
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
