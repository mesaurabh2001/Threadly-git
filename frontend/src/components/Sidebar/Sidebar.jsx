import styles from "./Sidebar.module.css";

// React Icons -----------------------------
import { CgHomeAlt } from "react-icons/cg";
import { TbChartBarPopular } from "react-icons/tb";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiNodeTree } from "react-icons/ri";
import { BiAtom } from "react-icons/bi";
import { FaBullhorn, FaHandsHelping } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { RxRocket } from "react-icons/rx";
import { BsGlobeAmericas } from "react-icons/bs";
import { PiBookOpenTextLight } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";

import { NavLink } from "react-router-dom";

function Sidebar({setIsSidebarOpen}) {


  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>

        {/* Main */}
        <div className={styles.section}>

          {/* item------------------ */}
          <NavLink
            to="/"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <CgHomeAlt className={styles.icon} />
            <span>Home</span>
          </NavLink>

          {/* item------------------ */}
          <NavLink
            to="/popular"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <TbChartBarPopular className={styles.icon} />
            <span>Popular</span>
          </NavLink>

          {/* item------------------ */}
          <NavLink
            to="/news"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <IoNewspaperOutline className={styles.icon} />
            <span>News</span>
          </NavLink>

          {/* item------------------ */}
          <NavLink
            to="/explore"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <RiNodeTree className={styles.icon} />
            <span>Explore</span>
          </NavLink>

          {/* item------------------ */}
          <NavLink
            to="/create-community"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <FiPlus className={styles.icon} />
            <span>Start a community</span>
          </NavLink>

        </div>

        <hr />

        {/* Resources */}
        <div className={styles.section}>
          <p className={styles.heading}>RESOURCES</p>

          {/* item------------------ */}
          <NavLink
            to="/about-threadly"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <BiAtom className={styles.icon} />
            <span>About Threadly</span>
          </NavLink>

          {/* item------------------ */}
          <NavLink
            to="/advertise"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <FaBullhorn className={styles.icon} />
            <span>Advertise</span>
          </NavLink>

          {/* item------------------ */}
          <NavLink
            to="/help"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <FiHelpCircle className={styles.icon} />
            <span>Help</span>
          </NavLink>

          {/* item------------------ */}
          <NavLink
            to="/support-us"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <FaHandsHelping className={styles.icon} />
            <span>Support us</span>
          </NavLink>
        </div>

        <hr />

        {/* Best of */}
        <div className={styles.section}>

          {/* item------------------ */}
          <NavLink
            to="/#"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <RxRocket className={styles.icon} />
            <span>Best of Threadly</span>
          </NavLink>

          {/* item------------------ */}
          <NavLink
            to="/#"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <BsGlobeAmericas className={styles.icon} />
            <span>Best of Threadly in Delhi</span>
          </NavLink>

          {/* item------------------ */}
          <NavLink
            to="/#"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <BsGlobeAmericas className={styles.icon} />
            <span>Best of Threadly in Uttar Pradesh</span>
          </NavLink>

        </div>

        <hr />

        {/* Policies */}
        <div className={styles.section}>

          {/* item------------------ */}
          <NavLink
            to="/#"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <PiBookOpenTextLight className={styles.icon} />
            <span>Threadly Rules</span>
          </NavLink>

          {/* item------------------ */}
          <NavLink
            to="/#"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <PiBookOpenTextLight className={styles.icon} />
            <span>Privacy Policy</span>
          </NavLink>

          {/* item------------------ */}
          <NavLink
            to="/#"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <PiBookOpenTextLight className={styles.icon} />
            <span>User Agreement</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
