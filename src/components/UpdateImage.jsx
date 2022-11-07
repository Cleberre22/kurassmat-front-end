// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useForm, Controller } from "react-hook-form";
// import axios from "axios";
// import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Avatar from "@mui/material/Avatar";
// import TextField from "@mui/material/TextField";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import Button from "@mui/material/Button";
// import Backdrop from '@mui/material/Backdrop';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import Typography from '@mui/material/Typography';

// const UpdateImage = () => {
//   const { child } = useParams();
//   const navigate = useNavigate();

//   const [imageChild, setImageChild] = useState("");

//   const [users_id, setUsers_id] = useState([]);

//   const [validationError, setValidationError] = useState({});

//   const changeHandler = (event) => {
//     setImageChild(event.target.files[0]);
//   };

//   // On récupère l'id du user pour remplir la table pivot
//   const [user, setUser] = useState([]);
//   const [role, setRole] = useState([]);

//   const displayUsers = async () => {
//     await axios
//       .get("http://localhost:8000/api/current-user", {
//         headers: {
//           Authorization: "Bearer" + localStorage.getItem("access_token"),
//         },
//       })
//       .then((res) => {
//         setUser(res.data);
//         setRole(res.data.role);
//         // console.log(res.data);
//       });
//   };
//   // console.log(role);

//   useEffect(() => {
//     displayUsers();
//     getChild();
//   }, []); // Sans les crochets ça tourne en boucle

//   // GET - Récupère les valeurs de la fiche avec l'API
//   const getChild = async () => {
//     await axios
//       .get(`http://localhost:8000/api/childs/${child}`)
//       .then((res) => {
//         // console.log(res.data.data[0].firstnameChild);
//         setImageChild(res.data.imageChild);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   // console.log(child);

//   //Fonction de modification d'une fiche enfant
//   const UpdateImage = async (e) => {
//     // console.log(birthDate);

//     e.preventDefault();
//     const users_id = [];
//     users_id.push(user.id);

//     const formData = new FormData();
//     formData.append("_method", "PATCH");
//     // formData.append("imageChild", imageChild);
//     formData.append("users_id", users_id);

//     // Bout de code pour récupérer les données du formulaire
//     for (var pair of formData.entries()) {
//             console.log(pair[0]+ ', ' + pair[1]);
//         }

//     await axios
//       .post(`http://localhost:8000/api/childs/${child}`, formData)
//       .then(navigate("/children"))
//       .catch(({ response }) => {
//         if (response.status === 422) {
//           setValidationError(response.data.errors);
//         }
//       });
//   };

// // Modal Update Image
//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

//   return (
//     <div className="updateImage">
    
//           <Box className="boxProfil" component="form" onSubmit={UpdateImage}>
//               <Box className="addChildCard" sx={{ mb: 4 }}>
//                 <p>Ajouter une page ou une modal pour le form edition photo + function dans controller api</p>
//                 <Avatar sx={{ width: 100, height: 100 }} src="avatar.png" />
//                 <Button
//                   className="button-87"
//                   variant="contained"
//                   component="label"
//                 >
//                   Ajouter une photo
//                   <input
//                     hidden
//                     accept="image/*"
//                     type="file"
//                     onChange={changeHandler}
//                     // value={imageChild}
//                     //   onChange={(event) => {
//                     //     setImageChild(event.target.value);
//                     //   }}
//                     id="imageChild"
//                   />
//                   <PhotoCamera 
//                   sx={{ width: 16, height: 16, mb: 0.33, ml: 0.7 }}/>
//                 </Button>
//             </Box>
//           </Box>
//     </div>
//   );
// };
// export default UpdateImage;
