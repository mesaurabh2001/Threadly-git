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

function Community() {

  const community = {
    "name": "IndianGaming",
    "title": "Ah!! here we go again",
    "avatar": "https://images.unsplash.com/photo-1519456264917-42d0aa2e0625?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "poster": "https://images.unsplash.com/photo-1683041133704-1de1c55d050c?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "admin": "34324324324324234324234",
    "description": "This community is dedicated to the Indians and there gaming passion.",
    "genre": "games",
    "type": "public",
    "members": [],
    "posts": [],
    "reportedPosts": [],
    "markedDeletePosts": [],
    "_id": "6a834932ed4c8498bf44fe55",
    "rules": [
      {
        title: "Rule Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quod.",
      },
      {
        title: "Rule Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quod.",
      },
      {
        title: "Rule Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quod.",
      },
      {
        title: "Rule Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quod.",
      },
    ],
    "tags": [
      "PC Gaming","Console Gaming","Mobile Gaming","Nintendo","PlayStation","Xbox","Steam","RPG","Action","Adventure","Strategy","Simulation","Sports Games","Racing","Fighting","Puzzle","Horror Games","Survival","Open World","FPS","MMO","Indie Games","Multiplayer","Single Player","Retro Games","Game Development","Esports"
    ],
    "createdAt": "2026-08-17T17:47:30.916+00:00",
    "updatedAt": "2026-08-17T17:47:30.916+00:00",
  }
  

  // const [community, setCommunity] = useState([]);

  // useEffect( () => {
  //   const getCommunityPage = async () => {
  //     try {
  //       const community = await getCommunityById(id);
  //       setCommunity(community);

  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }

  //   getCommunityPage();
  // }, [])

    const [posts, setPosts] = useState([]);

  useEffect( () => {
    const getCommunityPosts = async () => {
      try {
        const community = await getPosts();
        setPosts(community);

      } catch (error) {
        console.log(error.message);
      }
    }

    getCommunityPosts();
  }, [])
  
  return (
    <div className={styles.mainContainer}>

      <div className={styles.header}>

        <div className={styles.communityPoster}>
          <img src={`${community.poster}?fm=jpg&fit=max&w=1072&q=40`} alt="poster" />
        </div>

        <div className={styles.headerContent}>

          <div className={styles.info}>

            <div className={styles.communityAvatarframe}>
              <div
                className={styles.communityAvatar}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={`${community.avatar}?fm=jpg&fit=max&w=1072&q=40`} alt={community.name.charAt(0).toUpperCase()} />
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
          <CommunityWidget community={community}/>
        </aside>

      </div>
    </div>
  );
}

export default Community;
