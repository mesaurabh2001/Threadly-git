// css
import styles from "./LoginSignupForgot.module.css";
// icons
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
//

function Login({ hideAuth}) {

  const {logout} = useAuth();

  const [showWarning, setShowWarning] = useState(false);


  const logoutHandler = async (e) => {
    try {
      await logout();
      hideAuth();

    } catch (error) {
      console.log(error.message);
      setShowWarning(true);
    }   

  }
    

  return (
    <div className={`${styles.container} ${styles.logoutContainer}`}>

      <div className={styles.header}>
        <h2>Logging Out? </h2>
        <p>
          Goodbye! Come back soon.
        </p>
      </div>

      {showWarning && (
        <div className={styles.warning}>
          Something went wrong!
        </div>
      )}

      <div className={`${styles.logoutButtonGroup}`}>

        <button 
          className={styles.cancelButton}
          onClick={hideAuth}
        > 
          Cancel 
        </button>

        <button 
          className={styles.logoutButton}
          onClick={logoutHandler}
        > 
          Logout 
        </button>

      </div>

    </div>
  );
}

export default Login;