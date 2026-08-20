import styles from "./Profile.module.css";
import Feed from '../../components/Feed/Feed.jsx';
import ProfileWidget from "./ProfileWidget.jsx";

// local Modules
import {getPosts} from '../../services/postService.js';
import { getUser } from "../../services/userService.js";

////
import {useState, useEffect} from 'react';
import { useAuth } from "../../context/AuthContext.jsx";

// icons
import { FaRegSquarePlus } from "react-icons/fa6";
import { AiOutlineApartment } from "react-icons/ai";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

function Home() {

  const {userId} = useAuth();

  const [user, setUser] = useState(null);

  useEffect(() => {
      const loadUser = async () => {
        try {
          const data = await getUser(userId);
          setUser(data)

        } catch (error) {
          console.log(error.message);
        }
      }

      loadUser();

  }, []);

  const [posts, setPosts] = useState([]);

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

  if(!user) {
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
            <img src={`${user.avatar}?auto=format&fit=max&w=600&h=600&q=75`} alt="" />
          </div>

          <div className={styles.infoName}>

            <div
              className={styles.profileName}
              onClick={(e) => e.stopPropagation()}
            >
              {user.name}
            </div>

            <div
              className={styles.userName}
              onClick={(e) => e.stopPropagation()}
            >
              u/{user.username}
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

      {user && (

      <aside className={styles.widgetSection}>
        <div className={styles.widget}>
          <ProfileWidget user={user}/>
        </div>
      </aside> 

      )}

    </div>
  );
}

export default Home;
