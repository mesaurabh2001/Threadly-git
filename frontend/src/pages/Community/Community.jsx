import styles from "./Community.module.css";
import Feed from '../../components/Feed/Feed.jsx';
import CommunityWidget from "./CommunityWidget.jsx";

// local Modules
import {getPosts} from '../../services/postService.js';

////
import {useState, useEffect} from 'react';

// icons
import { FaRegSquarePlus } from "react-icons/fa6";
import { AiOutlineApartment } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

function Home() {

  const avatarUrl = "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJhYmJpdHxlbnwwfHwwfHx8MA%3D%3D";

  const [posts, setPosts] = useState([]);

  useEffect(() => {
      const getHomePosts = async () => {
        try {
          const data = await getPosts();
          setPosts(data)

        } catch (error) {
          console.log(error.message);
        }
      }

      getHomePosts();

  }, []);
  
  return (
    <div className={styles.mainContainer}>

      <div className={styles.header}>

        <div className={styles.communityPoster}>
          <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="billa" />
        </div>

        <div className={styles.headerContent}>

          <div className={styles.info}>

            <div className={styles.communityAvatarframe}>
              <div
                className={styles.communityAvatar}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={`${avatarUrl}`} alt="" />
              </div>
            </div>

            <div className={styles.communityName} >
              Medical-Medicine6686
            </div>

          </div>

          <div className={styles.headerButtonGroup}>

            <button className={`${styles.button}`}>
              <FaRegSquarePlus className={styles.plusIcon}/>Create Post
            </button>

            <button className={styles.button}>
              Join
            </button>

            <button className={styles.filterButton}>
              <AiOutlineApartment />
            </button>

            {/* <button 
              className={styles.joinButton}
              onClick={(e) => e.stopPropagation()}
            >
              Join
            </button> */}

          </div>

        </div>

      </div>

{/* ////////////////////////////////////////////////////////////////////////////////// */}

      <div className={styles.community}>

        <section className={styles.postSection}>

          <div className={styles.postSectionButtonGroup}>

            <button className={`${styles.button}`}>
              Feed
            </button>

            <button className={styles.button}>
              About
            </button>

            <div className={styles.gapButton}>
            </div>
          
            <button className={`${styles.sortButton}`}>
              Best <IoIosArrowDown className={styles.sortButtonIcon}/>
            </button>

            <button className={styles.filterButton}>
              <AiOutlineApartment /> <IoIosArrowDown className={styles.sortButtonIcon}/>
            </button>
          </div>

          <Feed
            postList={posts} 
          />
        </section>
        
        <aside className={styles.widgetSection}>
          <CommunityWidget />
        </aside>

      </div>
    </div>
  );
}

export default Home;
