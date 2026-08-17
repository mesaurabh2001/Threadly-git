import styles from "./App.module.css";
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx';
import AuthModal from './components/AuthModal/AuthModal.jsx';

function App() {

  const [showAuth, setShowAuth] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  }
  
  return (
    <div className={styles.appContainer}>

      {/* Navbar ==================================== */}
      <div className={`${styles.navbarContainer}`}>
        
        <Navbar
          onAuthClick={()=> setShowAuth(true)}
          onSidebarToggle={toggleSidebar} 
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      
      {/* Main container ================================== */}
      <div className={`${styles.mainContainer}`}>
        
        <div
          className={`
            ${styles.sidebarContainer} 
            ${isSidebarOpen ? styles.sidebarOpen : ""}
          `}
        >
          <Sidebar setIsSidebarOpen={setIsSidebarOpen}/>
        </div>

        {isSidebarOpen && (
            <div 
              className={styles.backdrop}
              onClick={toggleSidebar}
            >
            </div>
        )}
        
        <div className={`${styles.outletContainer}`}>
          <Outlet></Outlet>
        </div>
        
      </div>

      <AuthModal showAuth={showAuth} hideAuth={()=> setShowAuth(false)} />
    </div>
  );
}

export default App;
