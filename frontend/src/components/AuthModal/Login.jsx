// css
import styles from "./LoginSignupForgot.module.css";
// icons
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
//

function Login({setAuthPage, hideAuth}) {

  const {login} = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showWarning, setShowWarning] = useState(false);


  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
      hideAuth();

    } catch (error) {
      console.log(error.message);
      setShowWarning(true);
    }   

  }
    

  return (
    <div className={`${styles.container} ${styles.loginContainer}`}>
      <div className={styles.header}>
        <h2>Log In</h2>
        <p>
          By continuing, you agree to our <span>User Agreement</span> and
          acknowledge that you understand the <span>Privacy Policy</span>.
        </p>
      </div>

      {/* Social Buttons */}
      <div className={styles.socialButton}>
        {/* <img src={smartphonePNG} alt="phone" /> */}
        <HiOutlineDevicePhoneMobile className={styles.socialButtonIcon}/>
        <span>Continue with Phone Number</span>
      </div>

      <div className={styles.socialButton}>
        {/* <img src={googlePNG} alt="google" /> */}
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
        onSubmit={loginSubmitHandler}
        className={styles.form}
      >
        
        <div className={styles.inputContainer}>
          <input 
            type="username" 
            placeholder="Email or username *" 
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input 
            type="password" 
            placeholder="Password *" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
        </div>

        {showWarning && (
          <div className={styles.warning}>
            Incorrect Username or Password
          </div>
        )}

        <div className={styles.footer}>
          <span onClick={()=> setAuthPage('forgot-password')}>Forgot Password?</span>
          <p>
            New to Threadly? 
            <span onClick={()=> setAuthPage('signup')}> Sign Up</span>
          </p>
        </div>

        <button className={styles.formButton}> Log In </button>

      </form>
    </div>
  );
}

export default Login;