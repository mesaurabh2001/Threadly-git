import styles from "./Profile.module.css";
import Feed from '../../components/Feed/Feed.jsx';
import ProfileWidget from "./ProfileWidget.jsx";

// local Modules
import {getPosts} from '../../services/postService.js';
import { getUser } from "../../services/userService.js";

////
import {useState, useEffect} from 'react';
import { useAuth } from "../../context/AuthContext.jsx";
import { useParams } from "react-router-dom";


// icons
import { FaRegSquarePlus } from "react-icons/fa6";
import { AiOutlineApartment } from "react-icons/ai";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

function Home() {

  const {id} = useParams();
  const {user} = useAuth();

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadProfileUser = async () => {
      try {
        if (id) {
          // /users/:id
          const data = await getUser(id);
          setProfileUser(data);
        } else {
          // /profile
          setProfileUser(user);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    loadProfileUser();
  }, [id, user]);

  const isAuthUser = user?._id === profileUser?._id;

  useEffect(() => {
      const loadPosts = async () => {
        try {
          const data = await getPosts();
          setPosts(data)

        } catch (error) {
          console.log(error.message);
        }
      }

      loadPosts();

  }, []);

  if(!profileUser) {
    return <div>Loading...</div>
  }
  
  return (
    <div className={styles.mainContainer}>

      <section className={styles.profileContainer}>

        <div className={styles.info}>
          <div
            className={styles.avatar}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={`${profileUser.avatar}?auto=format&fit=max&w=150&h=150&q=75`} alt="" />
          </div>

          <div className={styles.infoName}>

            <div
              className={styles.profileName}
              onClick={(e) => e.stopPropagation()}
            >
              {profileUser.name}
            </div>

            <div
              className={styles.userName}
              onClick={(e) => e.stopPropagation()}
            >
              u/{profileUser.username}
            </div>
          </div>

        </div>

        <div className={styles.tabGroup}>
          <div className={styles.tabs}>
            
            {/* <div className={styles.scrollIndicatorLeft}><IoIosArrowDropleftCircle /></div> */}

            <button className={`${styles.tab}`}>
              Posts
            </button>

            <button className={`${styles.tab}`}>
              Channels
            </button>
            
            <button className={`${styles.tab}`}>
              Saved
            </button>

            <button className={`${styles.tab}`}>
              Followed
            </button>

            <button className={`${styles.tab}`}>
              Hidden
            </button>

            <button className={`${styles.tab}`}>
              Upvoted
            </button>

            <button className={`${styles.tab}`}>
              Downvoted
            </button>

            {/* <div className={styles.scrollIndicatorRight}><IoIosArrowDroprightCircle /></div> */}

          </div>
        </div>

        {/* <div className={styles.buttonGroup}>
          <button className={`${styles.createButton}`}>
            <FaRegSquarePlus className={styles.plusIcon}/>Create
          </button>

          <button className={styles.filterButton}>
            <AiOutlineApartment />
          </button>
        </div> */}

        <Feed
          postList={posts} 
        />

      </section>

      {profileUser && (

      <aside className={styles.widgetSection}>
        <div className={styles.widget}>
          <ProfileWidget profileUser={profileUser}/>
        </div>
      </aside> 

      )}

    </div>
  );
}

export default Home;
