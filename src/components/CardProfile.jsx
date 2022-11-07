import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useForm, Controller } from "react-hook-form";
// import axios from "axios";



// const { child } = useParams();
// const navigate = useNavigate();

// const [imageChild, setImageChild] = useState("");

// const [validationError, setValidationError] = useState({});

// const changeHandler = (event) => {
//   setImageChild(event.target.files[0]);
// };

// console.log(child);

// useEffect(() => {
//   getChild();
// }, []); // Sans les crochets ça tourne en boucle

// // GET - Récupère les valeurs de la fiche avec l'API
// const getChild = async () => {
//   await axios
//     .get(`http://localhost:8000/api/childs/${child}`)
//     .then((res) => {
//       console.log(res.data);
//       setImageChild(res.data.imageChild);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
// // console.log(child);

// //Fonction de modification d'une fiche enfant
// const EditChild = async (e) => {
//   // console.log(birthDate);

//   const formData = new FormData();
//   formData.append("_method", "PATCH");
//   formData.append("imageChild", imageChild);
  

//   // Bout de code pour récupérer les données du formulaire
//   for (var pair of formData.entries()) {
//     console.log(pair[0] + ", " + pair[1]);
//   }

//   await axios
//     .post(`http://localhost:8000/api/childUpadteImage/${child}`, formData)
//     .then(navigate("/children"))
//     .catch(({ response }) => {
//       if (response.status === 422) {
//         setValidationError(response.data.errors);
//       }
//     });
// };







const ImgUpload =({
    onChange,
    src
  })=>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img className='imgPreview' for="photo-upload" src={src}/>
      </div>
      <input id="photo-upload" type="file" onChange={onChange}/> 
    </label>
  
  const Profile =({
    onSubmit,
    src,
  })=>
    <div className="cardPreview">
      <form onSubmit={onSubmit}>
        <h1>Profile Card</h1>
        <label className="custom-file-upload fas">
          <div className="img-wrap" >
            <img className='imgPreview' for="photo-upload" src={src}/>
          </div>
        </label>
      
        <button type="submit" className="edit">Edit Profile </button>
      </form>
    </div>
       
        
  const Edit =({
    onSubmit,
    children,
  })=>
    <div className="cardPreview">
      <form onSubmit={onSubmit}>
        <h2>Modifier photo de profil</h2>
          {children}
        <button type="submit" className="button-87">Enregistrer </button>
      </form>
    </div>
  
  class CardProfile extends React.Component {
    state = {
      file: '',
      imagePreviewUrl: 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
      active: 'edit'
    }
  
    photoUpload = e =>{
      e.preventDefault();
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file);
    }

    handleSubmit= e =>{
      e.preventDefault();
      let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
      this.setState({
        active: activeP,
      })
    }
    
    render() {
      const {imagePreviewUrl, 
             active} = this.state;
      return (
        <div>
          {(active === 'edit')?(
            <Edit onSubmit={this.handleSubmit}>
              <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/>
            </Edit>
          ):(
            <Profile 
              onSubmit={this.handleSubmit} 
              src={imagePreviewUrl} 
    />)}
        </div>
      )
    }
  }
  
  export default CardProfile;