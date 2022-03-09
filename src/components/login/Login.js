import axios from "axios";
import {useNavigate} from 'react-router-dom'
import "./Login.css";

function App() {
  const navigate = useNavigate();

  const redirectRegister = () =>{
    navigate("/register")
  }
  const consumir_login = () => {
    var postData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    if (postData.username === "" || postData.password === "") {
      alert("Porfavor ingrese un usuario y una contraseña");
    } else {
      axios
        .post("http://localhost:8000/api/v1/login", postData, {
          Headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          alert("Login exitoso");
          console.log(response.data.token);
          localStorage.setItem("tokenLocal", response.data.token);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('first_name', response.data.first_name);
          localStorage.setItem('last_name', response.data.last_name)
          localStorage.setItem('email', response.data.email)
          
          navigate('/user/${response.data.user_id}')
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  return (
    <div>
      <header className="App-header">
        <div className="Container-login">
          <div className="Container-login-header">
            <h2 className="Login-text-h2">LOGIN</h2>
          </div>
          <br/>
          <form>
            <input className="Input-lgn"
              placeholder="Ingrese su usuario"
              type="text"
              id="username"
              required
            />
            <br/>
            <input className="Input-lgn"
              placeholder="Ingrese su contraseña"
              type="password"
              id="password"
              required
            />
          </form>
          <br/><br/>
          <button className="btn-register" onClick={redirectRegister}> Registrarse</button>
          <button className="btn-login" onClick={consumir_login}> Login </button>
        </div>
      </header>
    </div>
  );
}

export default App;
