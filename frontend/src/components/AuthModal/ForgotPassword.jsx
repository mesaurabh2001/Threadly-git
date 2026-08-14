// css
import styles from "./LoginSignupForgot.module.css";
// icons
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
//

function ForgotPassword( {setAuthPage} ) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Reset your password</h2>
        <p>
          Enter your email address or username and we’ll send you a link to
          reset your password.
        </p>
      </div>

      {/* Inputs */}
      <div className={styles.form}>
        <input type="email" placeholder="Email or username *" />
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
