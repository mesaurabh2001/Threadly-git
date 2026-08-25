// css
import styles from "./LoginSignupForgot.module.css";

import { useState } from "react";

// icons
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
//

function ForgotPassword( {setAuthPage} ) {

  const [email, setEmail] = useState("");

  return (
    <div className={`${styles.container} ${styles.forgotPasswordContainer}`}>

      <div className={styles.header}>
        <h2>Reset your password</h2>
        <p>
          Enter your email address and we'll send you a link to
          reset your password.
        </p>
      </div>

      {/* Inputs */}
      <div className={styles.form}>
        
        <div className={styles.inputContainer}>
          <input 
            type="username" 
            placeholder="Email *" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <p>
          Get back to
          <span onClick={() => setAuthPage('login')}> Login?</span>
        </p>
      </div>

      <button className={styles.formButton}>Reset password</button>

    </div>
  );
}

export default ForgotPassword;
