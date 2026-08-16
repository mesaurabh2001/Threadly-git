import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import {useState, useRef, useEffect} from 'react';
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


function Navbar({onAuthClick, onSidebarToggle}) {

  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const dropdownMenuRef = useRef(null);

  useEffect(() => {
      function handleClickOutside(event) {
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

      <nav className={`${styles.navbar}`}>

        {/* Sidebar Toggle Hamburger============================ */}
        <div
          className={styles.sidebarToggle}
          onClick={onSidebarToggle}
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

        {/* <div className={styles.loggedOutbuttonGroup}>
          <button 
            className={`${styles.authButton} ${styles.signupButton}`}
            onClick={onAuthClick}>
            Sign Up
          </button>

          <button
            className={`${styles.authButton} ${styles.loginButton}`}
            onClick={onAuthClick}>
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
              <div className={styles.ButtonMenu}>
                <ul>
                  <li onClick={onAuthClick}>
                    <NavLink to="" className={styles.dropdownLink}>
                      <RiLoginCircleLine className={styles.dropdownIcon}/>
                      <span>Log In / Sign Up</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="" className={styles.dropdownLink}>
                      <BiAtom className={styles.dropdownIcon}/>
                      <span>Help</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="" className={styles.dropdownLink}>
                      <FiHelpCircle className={styles.dropdownIcon}/>
                      <span>About Threadly</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

        </div> */}

        <div className={styles.loggedInbuttonGroup}>

          <Link 
            to='/create-post'
            className={`${styles.createButton}`} 
          >
            <FaRegSquarePlus  className={`${styles.createButtonIcon}`}/>
          </Link>

          <button className={`${styles.notificationButton}`} >
            <IoIosNotificationsOutline className={`${styles.notificationButtonIcon}`}/> {/*========= Notification Icon =========*/}
          </button>

          <div className={styles.profileMenuArea} ref={dropdownMenuRef} >

            <div
              className={styles.profileButton}
              onClick={() => setShowDropdownMenu(prev => !prev)}
            >
              S
            </div>

            {showDropdownMenu && (
              <div className={styles.ButtonMenu}>
                <ul>
                  <li>
                    <NavLink to="" className={styles.dropdownLink}>
                      <RiLoginCircleLine className={styles.dropdownIcon}/>
                      <span>Profile</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="" className={styles.dropdownLink}>
                      <BiAtom className={styles.dropdownIcon}/>
                      <span>Settings</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="" className={styles.dropdownLink}>
                      <FiHelpCircle className={styles.dropdownIcon}/>
                      <span>Log out</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

        </div>

        


      </nav>
    </div>
  );
}

export default Navbar;
