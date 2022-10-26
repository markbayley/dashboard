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

  const navitage = useNavigate()

  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navitage("/")
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
       <span>Login</span>
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
        <button type="submit">Login</button>
        {error && <span>Wrong email or password!</span>}
        <br />
        <p className="log">Don't have an account?<Link to="/register" className="log"> Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
