import styles from "./LoginSignupForgot.module.css";

import { useState } from "react";

import {useAuth} from '../../context/AuthContext.jsx';

// icons
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
//

function Signup({setAuthPage, hideAuth}) {
  
  const {signup} = useAuth();

  const [serverErrors, setServerErrors] = useState([]);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [poster, setPoster] = useState("");
  const [genres, setGenres] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signupSubmitHandler = async (e) => {
    e.preventDefault();

    const signupObj = {
      name: name,
      avatar: avatar,
      poster: poster,
      genres: genres.split(' '),
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword
    }

    console.log(signupObj);

    try {
      await signup(signupObj);
      hideAuth();

    } catch (error) {
      setServerErrors(error.errorMessages);
      console.log(error);
    }
  }
  return (

    <div className={`${styles.container} ${styles.signupContainer}`}>
      <div className={styles.header}>
        <h2>Sign Up</h2>
        <p>
          By continuing, you agree to our <span>User Agreement</span> and
          acknowledge that you understand the <span>Privacy Policy</span>.
        </p>
      </div>

      {/* Social Buttons */}
      <div className={styles.socialButton}>
        <HiOutlineDevicePhoneMobile className={styles.socialButtonIcon}/>
        <span>Continue with Phone Number</span>
      </div>

      <div className={styles.socialButton}>
        <FcGoogle className={styles.socialButtonIcon}/>
        <span>Continue with Google</span>
      </div>

      {/* Divider */}
      <div className={styles.divider}>
        <hr />
        <span>OR</span>
        <hr />
      </div>

      {/* Inputs */}
      <form
        onSubmit={signupSubmitHandler}
        className={styles.form}
      >
        <div className={styles.inputContainer}>

        {serverErrors === undefined && (
          <div className={styles.warning}> Something went wrong. Try logging into the account or try again later.</div>
        )}

        {(serverErrors !== undefined && serverErrors.length !== 0) && (
          <ul className={styles.serverErrors}>
            {serverErrors.map(err => (
              <li key={err}> {err} </li>
            ))}
          </ul>
        )}
          
          <input 
            type="text" 
            placeholder="name" 
            // required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input 
            type="text" 
            placeholder="Avatar Url" 
            // required
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          <input 
            type="username" 
            placeholder="Poster Url" 
            // required
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />

          <input 
            type="text" 
            placeholder="Genres" 
            // required
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
          />

          <input 
            type="text" 
            placeholder="Email " 
            // required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type="text" 
            placeholder="username" 
            // required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input 
            type="password" 
            placeholder="Password *" 
            // required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input 
            type="password" 
            placeholder="Confirm password *" 
            // required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
        </div>

        <div className={styles.footer}>
          <p>
            Already a Threadly? 
            <span onClick={()=> setAuthPage('login')}> Log in</span>
          </p>
        </div>

        <button className={styles.formButton}>Continue</button>

      </form>
    </div>
  );
}

export default Signup;