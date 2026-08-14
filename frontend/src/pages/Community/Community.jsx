import styles from "./Community.module.css";
import Feed from '../../components/Feed/Feed.jsx';
import CommunitiesWidget from "../../components/CommunitiesWidget/CommunitiesWidget.jsx";

// local Modules
import {getPosts} from '../../services/postService.js';

////
import {useState, useEffect} from 'react';

// icons
import { FaRegSquarePlus } from "react-icons/fa6";
import { AiOutlineApartment } from "react-icons/ai";

function Home() {

  const imageUrl = "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJhYmJpdHxlbnwwfHwwfHx8MA%3D%3D";

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

      <section className={styles.profileContainer}>

        <div className={styles.info}>
          <div
            className={styles.avatar}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={`${imageUrl}`} alt="" />
          </div>

          <div className={styles.infoName}>

            <div
              className={styles.profileName}
              onClick={(e) => e.stopPropagation()}
            >
              Medical-Medicine6686
            </div>

            <div
              className={styles.userName}
              onClick={(e) => e.stopPropagation()}
            >
              u/Medical-Medicine6686
            </div>
          </div>

        </div>

        <div className={styles.tabGroup}>
          <div className={styles.tabs}>
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
          className={styles.feedbox} 
          postList={posts} 
        />
      </section>
      
      <aside className={styles.widgetSection}>
        <CommunitiesWidget communityList={[]}/>
      </aside>

    </div>
  );
}

export default Home;
