import styles from './AuthModal.module.css';
import { useState } from "react";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import ForgotPassword from './ForgotPassword.jsx';

function AuthModal({ showAuth, hideAuth }) {
  const [authPage, setAuthPage] = useState('login');

  if (!showAuth) return null;

  return (
    <div className={styles.overlay} onClick={hideAuth}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {authPage == 'login' && <Login setAuthPage={setAuthPage}/>}
        {authPage == 'signup' && <Signup setAuthPage={setAuthPage}/>}
        {authPage == 'forgot-password' && <ForgotPassword setAuthPage={setAuthPage}/>}
        {/* {isLogin ? (<Login setIsLogin={setIsLogin} />) : (<Signup setIsLogin={setIsLogin} />) } */}

        <span className={styles.close} onClick={hideAuth}>
          ✖
        </span>
      </div>
    </div>
  );
}

export default AuthModal;
