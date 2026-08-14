// css
import styles from "./LoginSignupForgot.module.css";
// icons
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
//

function Signup({setAuthPage}) {
  return (
    <div className={styles.container}>
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
      <div className={styles.form}>
        <input type="email" placeholder="Email *" />
        {/* <input type="password" placeholder="Password *" /> */}
        {/* <button>Continue</button> */}
      </div>

      <div className={styles.footer}>
        <p>
          Already a Threadly? 
          <span onClick={()=> setAuthPage('login')}> Log in</span>
        </p>
      </div>

      <button className={styles.formButton}>Continue</button>
    </div>
  );
}

export default Signup;