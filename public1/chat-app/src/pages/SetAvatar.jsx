
import React, {  useState , useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loading.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";



export default function SetAvatar(){
    // <div>avatar</div>
    const api ="https://api.multiavatar.com/45678945";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions={
        position:"bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      useEffect(() => {
        function checkUser() {
          if (!localStorage.getItem("chat-app-user")) 
            navigate("/login"); 
          
        }
      
        checkUser();
      }, [navigate]);
      
    // useEffect( async ()=> {
    //     if(!localStorage.getItem("chat-app-user")){
    //         navigate("/");
    //     }
    // },[]);

    const setProfilePicture = async () => {
        if(selectedAvatar === undefined){
            toast.error("Vous n'avez pas choisit un avatar",toastOptions);
        } else {
const user = await JSON.parse(localStorage.getItem("chat-app-user"));
const { data }  = await axios.post(`${setAvatarRoute}/${user._id}`,{
 image: avatars[selectedAvatar],
 });
     if (data.isSet) {
    user.isAvatarImageSet = true;
    user.avatarImage = data.image;
    localStorage.setItem("chat-app-user",JSON.stringify(user)
    );
    navigate("/");
  } else {
    toast.error("Erreur. Veillez ressayer", toastOptions);
  }
        }
    };

    useEffect(() => {
        async function fetchData() {
          const data = [];
          for (let i = 0; i < 4; i++) {
            const image = await axios.get(
              `${api}/${Math.round(Math.random() * 1000)}` //generer diff images
            );
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
          }
          setAvatars(data);
          setIsLoading(false);
        }
      
        fetchData();
      }, []);

    // useEffect(async () => {
    //     const data = [];
    //     for (let i = 0; i < 4; i++) {
    //       const image = await axios.get(
    //         `${api}/${Math.round(Math.random() * 1000)}` //generer diff images
    //       );
    //       const buffer = new Buffer(image.data);
    //       data.push(buffer.toString("base64"));
    //     }
    //     setAvatars(data);
    //     setIsLoading(false);
    //   }, []);
    return (
    <>
    {
        isLoading ? <Container>
            <img src={loader} alt="loader" className="loader" />
        </Container>: (
  
    <Container>
        <div className="title-container">
              <h1>Veuillez choisir un avatar pour votre photo de profil</h1>
        </div>

        <div className="avatars">
        {
         avatars.map((avatar , index) => {
            return (
            <div
            key={index}
            className={`avatar ${
              selectedAvatar === index ? "selected" : ""
            }`}
            >
                 <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    // key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />      
            </div>
            );
         })
        }</div>
          <button onClick={setProfilePicture} className="submit-btn">
            Choisir comme photo de profil
          </button>
     </Container> 
        )}

     <ToastContainer />
    </>
    );
}

const Container = styled.div`
display: flex;
justify-content:center;
flex-direction: column;
align-items: center;
gap:3rem;
background-color: black;
height: 100vh;
width: 100vw;
.loader{
    max-inline-size: 100%;
}
.title-container{
    h1{
        font-family: "Montserrat Alternates",sans-serif;
        color: white;
    }
}
.avatars{
    display: flex;
    gap: 2rem;
    .avatar{
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img{
            height: 6rem;
        }
    }
    .selected{
        border: 0.3rem solid #2dba8d;
    }   
}
.submit-btn {
  display: block;
  /* margin: auto; */
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
`;