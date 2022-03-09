import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function App() {
  var token = localStorage.getItem("tokenLocal");
  var id_user = localStorage.getItem("user_id");
  var image_profile = "assets/imgProfile/llorando_swEwymM.png";
  var first_name = "";
  var last_name = "";
  var username = "a";
  var email = "";
  const navigate = useNavigate();

  
  console.log(image_profile)
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

    axios.get("http://localhost:8000/api/v1/user/data/"+ id_user +"/",{
      headers:{
          'Authorization': 'Token ' + token,
      },
  }).then((response) =>{
      username = response.data.username;
      first_name = response.data.first_name;
      last_name = response.data.last_name;
      email = response.data.email;
      document.getElementById("first_name").value = first_name;
      document.getElementById("last_name").value = last_name;
      document.getElementById("correo").value = email;
      document.getElementById("user").value = username;
  }).catch((error)=>{
      console.log(error.response.data);
  })


  const redirectLogin = () => {
    navigate("/");
  };
  const redirectUpdate = () => {
    navigate("/user/${id_user}/update");
  };
  return (
    <div>
      <header className="App-header">
        <div className="Container-profile">
          <br />
          <br />
          <img className="fotito" id="imagen" />
          <br />
          <input id="user" readOnly/>
          <h3>
            <input id="first_name" readOnly className="inp-info" />
            <input id="last_name" readOnly className="inp-info"/>
          </h3>
          <h3>
            <input id="correo" readOnly className="inp-info-long"/>
          </h3>
          <button onClick={redirectLogin}>Salir</button>
          <button onClick={redirectUpdate}>Actualizar</button>
        </div>
      </header>
    </div>
  );
}

export default App;
