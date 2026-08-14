// css
import styles from "./LoginSignupForgot.module.css";
// icons
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
//

function Login({setAuthPage}) {
  return (
    <div className={styles.container}>
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
      <div className={styles.form}>
        <input type="email" placeholder="Email or username *" />
        <input type="password" placeholder="Password *" />
        
      </div>

      <div className={styles.footer}>
        <span onClick={()=> setAuthPage('forgot-password')}>Forgot Password?</span>
        <br /><br />
        <p>
          New to Threadly? 
          <span onClick={()=> setAuthPage('signup')}> Sign Up</span>
        </p>
      </div>

      <button className={styles.formButton}>Log In</button>
    </div>
  );
}

export default Login;