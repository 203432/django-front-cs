import "./Register.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import React, { Component } from "react";
function App() {
  const navigate = useNavigate();


  const redirectLogin = () =>{
    navigate("/")
  }
  const consumir_crear = () => {
    var postData = {
      username: document.getElementById('usua').value,
      password: document.getElementById('pass').value,
      password2: document.getElementById('pass2').value,
      email: document.getElementById('correo').value,
      first_name: document.getElementById('nombre').value,
      last_name: document.getElementById('apellido').value
  
    }
    if(postData.username === "" ||postData.password === "" || postData.password2 === "" ||
     postData.email === "" || postData.first_name === "" || postData.last_name === "" ){
       alert("Todos los campos son requeridos")
     }
     else{
      axios
      .post("http://localhost:8000/api/v1/registro/crear_user/", postData, {
        Headers: { 'Content-Type': 'application/json', },
      })
      .then(response => {
        console.log(response.data);
        alert("Se ha agregado exitosamente el usuario");
        // redirectLogin();
      }).catch(
        (error) => {
         console.log(error.response.data)
        }
      )
     }
    // alert("Hola login");
  }


  return (

    <div>
      <header className="App-header">
      <div className="Container-register">
      <div className="Container-login-header">
      <h2>Registro</h2>
      </div>
      <div>
        <div>
          <form>
            <label>Nombre de usuario:
            <input className="Input-Register-long" placeholder="usuario123"  type="text" id = 'usua' required />
            </label> <br/>
            <label>Contraseña:
            <input className="Input-Register-1" placeholder="r123Rwa#" type="text" id = 'pass' required />
            </label>
            <br/>
            <label>Repita la contraseña:
            <input className="Input-Register"  type="tect" id = 'pass2' required />
            </label>
            <br/>
            <label>Correo Electronico:
            <input className="Input-Register-long" placeholder="Coreo electronico" type="text" id = 'correo' required />
            </label>
            <br/>
            <label>Nombre:
            <input className="Input-Register-2" placeholder="Carlitos" type="text" id = 'nombre' required />
            </label>
            <br/>
            <label>Apellido:
            <input className="Input-Register-2" placeholder="Diaz" type="text" id = 'apellido' required />
            </label>
          </form>
        </div>
      </div>
      <div className="container-btns">
        <button className="btn-redirect" onClick={redirectLogin}>Regresar</button>
        <button className="btn-enviar" onClick={consumir_crear}>Enviar datos</button>
      </div>

        
      </div>
      </header>
    </div>
  );
}

export default App
