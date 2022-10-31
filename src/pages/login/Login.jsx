import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
import { Close } from "@mui/icons-material";

const Login = ({setModal}) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setName] = useState("");

  const navigate = useNavigate()

  const [ register , setRegister ] = useState(false)

  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navigate("/home")
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="login">
   
      <form onSubmit={handleLogin}>

    <div className="close"><div onClick={() => setModal(false)}><Close /></div></div>
       <h2>Marc Balieu</h2>
       {register ? <span>Register</span> : <span>Login</span> }
{ register &&
       <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
}
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
       
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
       
        <br />
        <button type="submit">  {register ? "REGISTER" : "LOGIN" }</button>
        {error && <span>Wrong email or password!</span>}
        <br />
        { !register ? 
        <p className="log">Don't have an account? <div onClick={() => setRegister(true)} className="log">&nbsp; Register</div></p>

        :
        <p className="log">Already have an account? <div onClick={() => setRegister(false)} className="log">&nbsp; Login</div></p>
}
      </form>
    </div>
  );
};

export default Login;
