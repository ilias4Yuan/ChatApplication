import React from "react";
import styled from "styled-components";
import Robot from "../assets/giphy.gif"

export default function Welcome({currentUser}){
    return (
        <Container>
            <img src={Robot} alt="Robot" />
            <h1>
                Bienvenue au Chat Shat <span>{currentUser.username}!</span>
            </h1>
            <h2>  Amusez-vous </h2>
        </Container>

    )
    
}

const Container =styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column ;
color: white ;
img{
    height: 13rem;   
}
h1{
    margin-top: 2rem;
    font-family: "Montserrat Alternates",sans-serif;

}
span{
  color:  #1af1c3;
}



`;