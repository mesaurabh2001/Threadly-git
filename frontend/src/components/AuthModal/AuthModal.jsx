import styles from './AuthModal.module.css';
import { useState } from "react";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";
import ForgotPassword from './ForgotPassword.jsx';

function AuthModal({ showAuth, authPage, setAuthPage, hideAuth }) {

  if (!showAuth) return null;

  return (
    <div className={styles.overlay} onClick={hideAuth}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {authPage == 'login' && <Login setAuthPage={setAuthPage} hideAuth={hideAuth}/>}
        {authPage == 'logout' && <Logout hideAuth={hideAuth}/>}
        {authPage == 'signup' && <Signup setAuthPage={setAuthPage} hideAuth={hideAuth} />}
        {authPage == 'forgot-password' && <ForgotPassword setAuthPage={setAuthPage}/>}

        <span className={styles.close} onClick={hideAuth}>
          ✖
        </span>
      </div>
    </div>
  );
}

export default AuthModal;
