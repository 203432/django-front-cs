import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function App() {
  var token = localStorage.getItem("tokenLocal");
  var id_user = localStorage.getItem("user_id");
  var image_profile = "";
  const params = useParams();
  const navigate = useNavigate();

  
  axios
  .get("http://localhost:8000/api/v1/user/profile/" + id_user, {
    headers: {
      'Authorization': "Token " + token,
    },
  })
  .then((response) => {
    console.log(response.data);
    image_profile = "http://localhost:8000" + response.data.url_image;
    document.getElementById("imagen").src = image_profile;
  })
  .catch((error) => {
    console.log(image_profile);
    console.error("Error al obtener la imagen");
  });

  const Updateimg = () =>{
    let putData = new FormData();;
    putData.append('url_image', document.getElementById('img').files[0]);
    axios.put("http://localhost:8000/api/v1/user/profile/"+id_user, putData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Token ' + token,
        }
    }).then((response) => {
            console.log(response.data);
            image_profile = "http://localhost:8000" + response.data.url_image;
            console.log(image_profile);
            document.getElementById('img').src = image_profile;
            alert("Imagen de perfil actualizada")
            window.location.reload();
        }).catch((error) => {
            console.log(error.response.data);
        })
  }

  const upload_image = () => {
    let postData = new FormData();
    postData.append('id_user', id_user);
    postData.append('url_image', document.getElementById('img').files[0]);

    axios.post("http://localhost:8000/api/v1/user/profile/", postData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Token ' + token,
        }
    }).then((response) => {
            console.log(response.data);
            image_profile = "http://localhost:8000" + response.data.url_img;
            console.log(image_profile);
            document.getElementById('img').src = image_profile;
            window.location.reload();
        }).catch((error) => {
            console.log(error.response.data);
            if (error.response.data === "Este usuario ya tiene un perfil") {
                console.log("Este usuario ya tiene un perfil");
            }
        })
}



  const consumir_update_user = () =>{
    var putData = new FormData();
    var usernamePut = document.getElementById("usuario").value;
    var lastNamePut = document.getElementById("ultNombre").value;
    var firstNamePut = document.getElementById("primNombre").value;
    var emailPut = document.getElementById("correo").value;
    putData.append("first_name",firstNamePut);
    putData.append("last_name",lastNamePut);
    putData.append("username",usernamePut);
    putData.append("email",emailPut);
    
    console.log(token)
    axios.put("http://localhost:8000/api/v1/user/data/"+id_user+"/",putData,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
          alert("se actualizaron los datos");
          navigate('/user/${id_user}')
        }).catch((error)=>{
            alert("No se pudieron actualizar los datos");
            console.log(error.response.data);
        })

  }

  const redirectLogin = () =>{
    navigate('/user/${id_user}')
  }
  return (
    <div>
      <header className="App-header">
        <div className="Container-profile">
          <br />
          <br />
          <img className="fotito" id="imagen" />
          <br/>
          <input accept="image/*" type="file" id="img"/>
          <button onClick={upload_image}>Subir imagen</button>
          <button onClick={Updateimg}>Cambiar imagen</button>
          <br />
          <label>Username:</label>
          <input id="usuario"/> <br/>
          <label>Primer Nombre:</label>
            <input id="primNombre"/> <br/>
            <label>Ultimo Nombre:</label>
            <input id="ultNombre"/> <br/>
          <label>Correo:</label>
            <input id="correo"/> <br/>
          <button onClick={redirectLogin}>Cancelar</button>
          <button onClick={consumir_update_user}>Enviar</button>
        </div>
      </header>
    </div>
  );
}

export default App;
