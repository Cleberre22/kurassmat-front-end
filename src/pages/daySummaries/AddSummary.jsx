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

// import MenuAppBar from "../../components/auth/MenuAppBar";
// import Fox from "../../components//Fox";
// import Prince from "../../components/Prince";

// const AddSummary = () => {
//   const navigate = useNavigate();

//   const [contentDaySummary, setContentDaySummary] = useState("");
//   const [childs_id, setChilds_id] = useState(13);
//   const [users_id, setUsers_id] = useState("");

//   const [validationError, setValidationError] = useState({});

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
//   }, []); // Sans les crochets ça tourne en boucle

//   //Fonction d'ajout d'une fiche enfant
//   const AddDaySummary = async (e) => {
//     // console.log(birthDate);

//     e.preventDefault();
//     const users_id = [];
//     users_id.push(user.id);

//     // const childs_id = [];
//     // childs_id.push(child.id);

//     const formData = new FormData();

//     formData.append("contentDaySummary", contentDaySummary);
//     formData.append("childs_id", childs_id);
//     formData.append("users_id", users_id);

//     //Bout de code pour récupérer les données du formulaire
//     // for (var pair of formData.entries()) {
//     //         console.log(pair[0]+ ', ' + pair[1]);
//     //     }

//     await axios
//       .post(`http://localhost:8000/api/daysummary`, formData)
//       .then(navigate("/home"))
//       .catch(({ response }) => {
//         if (response.status === 422) {
//           setValidationError(response.data.errors);
//         }
//       });
//   };

//   return (
//     <div>
//       <MenuAppBar />
//       <Box className="main">
//         <CssBaseline />
//         <Container className="containerProfil">
//           <h1 className="titleProfil">Ajouter un message</h1>

//           <Box className="boxProfil" component="form" onSubmit={AddDaySummary}>
//             <Box className="containerAddChild">
//               <Container className="containerAddChild">
//                 <Grid className="infoAddChild" container spacing={2}>
//                   <Grid item xs={12} sm={12}>
//                     {/* <TextField
//                       id="contentDaySummary"
//                       label="Message"
//                       fullWidth
//                       multiline
//                       value={contentDaySummary}
//                       onChange={(event) => {
//                         setContentDaySummary(event.target.value);
//                       }}
//                       rows={4}
                     
//                     /> */}
//                     <TextField
//                       fullWidth
//                       value={contentDaySummary}
//                       onChange={(event) => {
//                         setContentDaySummary(event.target.value);
//                       }}
//                       id="contentDaySummary"
//                       label="Message"
//                       autoFocus
//                     />
//                   </Grid>

//                   {/* <Grid item xs={12} sm={12}>
//                     <TextField
//                       fullWidth
//                       value={lastnameChild}
//                       onChange={(event) => {
//                         setLastnameChild(event.target.value);
//                       }}
//                       id="lastnameChild"
//                       label="Nom"
//                       autoFocus
//                     />
//                   </Grid> */}

//                   <Grid item xs={12} sm={12}></Grid>
//                 </Grid>
//               </Container>
//             </Box>

//             <Grid
//               container
//               justifyContent="center"
//               sx={{ mt: 4 }}
//               className="buttonAddChild"
//             >
//               <button type="submit" className="button-87" role="button">
//                 Envoyer le message
//               </button>
//             </Grid>
//           </Box>
//         </Container>
//       </Box>
//       <Fox />
//       <Prince />
//     </div>
//   );
// };

// export default AddSummary;
