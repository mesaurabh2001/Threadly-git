import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import {useState, useRef, useEffect} from 'react';
import { useAuth } from "../../context/AuthContext";

import ThreadlyLogo from '../../assets/ThreadlyLogo.png';
import ThreadlyBrand from '../../assets/ThreadlyBrand.png';
import { BsThreeDots } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

// Logged Out Button Group Icons 
import { FiHelpCircle } from "react-icons/fi";
import { BiAtom } from "react-icons/bi";
import { RiLoginCircleLine } from "react-icons/ri";

// Logged In Button Group Icons
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";


function Navbar({onAuthClick, onSidebarToggle, setIsSidebarOpen}) {

  const {user, logout} = useAuth();

  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const dropdownMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {

      // Close profile dropdown when clicking outside
      if (
          dropdownMenuRef.current &&
          !dropdownMenuRef.current.contains(event.target)
      ) {
          setShowDropdownMenu(false);
      }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (
    <div className={styles.container}>

      <nav
        className={`${styles.navbar}`}
        onClick={() => setIsSidebarOpen(false)}
      >

        {/* Sidebar Toggle Hamburger============================ */}
        <div
          className={styles.sidebarToggle}
          onClick={(e) => {
            e.stopPropagation();
            onSidebarToggle();
          }}
        >
          <RxHamburgerMenu />
        </div>

        <div className={styles.brand}>
          <img 
            src={ThreadlyBrand}
            alt="brand" 
          />
        </div>

        <div className={styles.searchbarContainer}>
          <div className={styles.searchbar}>
            <div className={styles.searchbarLogo}>
              <img src={ThreadlyLogo} alt="BrandLogo" />
            </div>
            <input type="text" placeholder="Find Anything" />
          </div>
        </div>
        
        {!user && (

        <div className={styles.loggedOutbuttonGroup}>
          <button 
            className={`${styles.authButton} ${styles.signupButton}`}
            onClick={() => onAuthClick('signup')}>
            Sign Up
          </button>

          <button
            className={`${styles.authButton} ${styles.loginButton}`}
            onClick={() => onAuthClick('login')}>
            Log In
          </button>

          <div className={styles.moreMenuArea} ref={dropdownMenuRef} >

            <div
              className={styles.moreButton}
              onClick={() => setShowDropdownMenu(prev => !prev)}
            >
              <BsThreeDots />
            </div>

            {showDropdownMenu && (
              <div className={styles.buttonMenu}>
                <ul>
                  <li onClick={() => onAuthClick('login')}>
                    <button className={styles.dropdownLink}>
                      <RiLoginCircleLine className={styles.dropdownIcon}/>
                      <span>Log In / Sign Up</span>
                    </button>
                  </li>

                  <li>
                    <button type="button" className={styles.dropdownLink}>
                      <BiAtom className={styles.dropdownIcon}/>
                      <span>Help</span>
                    </button>
                  </li>

                  <li>
                    <button type="button" className={styles.dropdownLink}>
                      <FiHelpCircle className={styles.dropdownIcon}/>
                      <span>About Threadly</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

        </div>

        )}

        {user && (

        <div className={styles.loggedInbuttonGroup}>

          <Link 
            to='/create-post'
            className={`${styles.createButton}`} 
          >
            <FaRegSquarePlus  className={`${styles.createButtonIcon}`}/> {/*========= createPost Icon =========*/}
          </Link>

          <button className={`${styles.notificationButton}`} >
            <IoIosNotificationsOutline className={`${styles.notificationButtonIcon}`}/> {/*========= Notification Icon =========*/}
          </button>

          <div className={styles.profileMenuArea} ref={dropdownMenuRef} >

            <button
              className={styles.profileButton}
              onClick={() => setShowDropdownMenu(prev => !prev)}
            >
              <img src={`${user.avatar}?auto=format&fit=max&w=40&q=75`} alt="" />
            </button>

            {showDropdownMenu && (
              <div className={styles.buttonMenu}>
                <ul>
                  <li>
                    <NavLink to="/profile" onClick={() => setShowDropdownMenu(false)} className={styles.dropdownLink}>
                      <RiLoginCircleLine className={styles.dropdownIcon}/>
                      <span>Profile</span>
                    </NavLink>
                  </li>

                  <li>
                    <button type='button' className={styles.dropdownLink}>
                      <BiAtom className={styles.dropdownIcon}/>
                      <span>Settings</span>
                    </button>
                  </li>

                  <li  onClick={() => onAuthClick('logout')}>
                    <button type='button' className={styles.dropdownLink}>
                      <FiHelpCircle className={styles.dropdownIcon}/>
                      <span>Log out</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

        </div>
        )}


      </nav>
    </div>
  );
}

export default Navbar;
