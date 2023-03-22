import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {BiPowerOff} from "react-icons/bi";

export default function Logout(){
 const navigate = useNavigate();
 const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
 };
 return (
 <Button onClick={handleClick}>
    <BiPowerOff />
 </Button>
);
}

const Button = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius:0.5rem ;
background-color: transparent;
&:hover{
   background-color: #d25e5e;

}
border: none;
cursor: pointer;
svg{
    font-size: 1.2rem;
    color: #ebe7ff;

}

`;