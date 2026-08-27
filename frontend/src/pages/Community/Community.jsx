import styles from "./Community.module.css";
import Feed from '../../components/Feed/Feed.jsx';
import CommunityWidget from "../../components/CommunityWidget/CommunityWidget.jsx";

// local Modules
import {getCommunityPosts} from '../../services/communityService.js'
import {getPosts} from '../../services/postService.js';
import {getCommunityById} from '../../services/communityService.js';

////
import {useState, useEffect, useRef} from 'react';
import { NavLink, useParams } from "react-router-dom";

// icons
import { BsThreeDots } from "react-icons/bs";
import { FaRegSquarePlus } from "react-icons/fa6";
import { AiOutlineApartment } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

function Community() {


  const {id} = useParams();
  const [community, setCommunity] = useState(null);

  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const dropdownMenuRef = useRef(null);

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

            <button className={`${styles.button} ${styles.joinButton}`}>
              Join
            </button>

            <div className={styles.moreMenuArea} ref={dropdownMenuRef} >
              
              <button 
                type='button'
                className={`${styles.button} ${styles.moreMenu}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdownMenu(prev => !prev);
                }}
              > 
                <BsThreeDots />
              </button>

              {showDropdownMenu && (
                <div 
                  className={styles.ButtonMenu}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ul>
                    <li>
                      <button className={styles.dropdownButton}>
                        {/* <PiBellLight className={`${styles.dropdownIcon} ${styles.bellIcon}`}/> */}
                        <span>Follow post</span>

                        {/* <PiBellFill className={`${styles.dropdownIcon} ${styles.bellIcon}`}/>
                        <span>Following</span> */}
                      </button>
                    </li>

                    <li>
                      <button className={styles.dropdownButton}>
                        {/* <IoBookmarkOutline  className={styles.dropdownIcon}/> */}
                        <span>Save</span>

                        {/* <IoBookmark className={styles.dropdownIcon}/>
                        <span>Saved</span> */}
                      </button>
                    </li>

                    <li>
                      <button className={styles.dropdownButton}>
                        {/* <BiHide className={styles.dropdownIcon}/> */}
                        <span>Hide</span>

                        {/* <BiSolidHide className={styles.dropdownIcon}/>
                        <span>Hidden</span> */}
                      </button>
                    </li>

                    <li>
                      <button className={styles.dropdownButton}>
                        {/* <RiFlagLine className={styles.dropdownIcon}/> */}
                        <span>Report</span>

                        {/* <RiFlagFill  className={styles.dropdownIcon}/>
                        <span>Reported</span> */}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

{/* //////////////////////////////////////////////////////////////////////////////////////////// */}

      <div className={styles.community}>

        <section className={styles.postSection}>

          <div className={styles.postSectionButtonGroup}>

            <div className={styles.navigationButtons}>
              <button className={`${styles.button}`}>
                Feed
              </button>

              <button className={styles.button}>
                About
              </button>
            </div>
          
            <div className={styles.sortButtons}>
              <button className={`${styles.sortButton}`}>
                Best <IoIosArrowDown className={styles.sortButtonIcon}/>
              </button>

              <button className={styles.filterButton}>
                <AiOutlineApartment /> <IoIosArrowDown className={styles.sortButtonIcon}/>
              </button>
            </div>
          </div>

          <Feed
            postList={posts}
            currentPage={'community'}
          />
          
        </section>
        
        {community && (

        <aside className={styles.widgetSection}>
          <div className={styles.widget}>
            <CommunityWidget 
              community={community}
              currentPage={'community'}
            />
          </div>
        </aside>

        )}

      </div>


    </div>
  );
}

export default Community;
