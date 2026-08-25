import styles from "./Community.module.css";
import Feed from '../../components/Feed/Feed.jsx';
import CommunityWidget from "./CommunityWidget.jsx";

// local Modules
import {getCommunityPosts} from '../../services/communityService.js'
import {getPosts} from '../../services/postService.js';
import {getCommunityById} from '../../services/communityService.js';

////
import {useState, useEffect} from 'react';

// icons
import { FaRegSquarePlus } from "react-icons/fa6";
import { AiOutlineApartment } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router-dom";

function Community() {


  const {id} = useParams();
  const [community, setCommunity] = useState(null);

  useEffect( () => {
    const getCommunityPage = async () => {
      try {
        const community = await getCommunityById(id);
        setCommunity(community);

      } catch (error) {
        console.log(error.message);
      }
    }

    getCommunityPage();
  }, [id])

  const [posts, setPosts] = useState([]);

  useEffect( () => {
    const loadCommunityPosts = async () => {
      try {
        const posts = await getCommunityPosts(id);
        // const posts = await getPosts();
        setPosts(posts);

      } catch (error) {
        console.log(error.message);
      }
    }

    loadCommunityPosts();
  }, [id]);

  if(!community) {
    return (
      <div> Loading... </div>
    );
  }
  
  return (
    <div className={styles.mainContainer}>



      <div className={styles.header}>

        <div className={styles.communityPoster}>
          <img src={`${community.poster}?auto=format&fit=max&w=1072&q=40`} alt="poster" />
        </div>

        <div className={styles.headerContent}>

          <div className={styles.info}>

            <div className={styles.communityAvatarframe}>
              <div
                className={styles.communityAvatar}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={`${community.avatar}?auto=format&fit=max&w=100&h=100&q=40`} alt='' />
              </div>
            </div>

            <div className={styles.communityName} >
              t/{community.name}
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

{/* //////////////////////////////////////////////////////////////////////////////////////////// */}

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
        
        {community && (

        <aside className={styles.widgetSection}>
          <CommunityWidget community={community}/>
        </aside>

        )}

      </div>


    </div>
  );
}

export default Community;
