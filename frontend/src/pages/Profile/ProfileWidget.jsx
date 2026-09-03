import styles from "./ProfileWidget.module.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { BsThreeDots } from "react-icons/bs";

import CommunityCardSmall from '../../components/CommuntiyCardSmall/CommunityCardSmall';
import { getCommunitiesSummaries } from "../../services/communityService";

function ProfileWidget({profileUser}) {

  const navigate = useNavigate();
  
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const dropdownMenuRef = useRef(null);

  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [ownedCommunities, setOwnedCommunities] = useState([]);

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

  useEffect(() => {
    const loadJoinedCommunities = async () => {
      try {
        const jCommunities = await getCommunitiesSummaries()
        setJoinedCommunities(jCommunities);

      } catch (error){
        console.log(error.message);
      }
    }

    loadJoinedCommunities();
  }, [])

  useEffect(() => {
    const loadOwnedCommunities = async () => {
      try {
        const oCommunities = await getCommunitiesSummaries()
        setOwnedCommunities(oCommunities);

      } catch (error){
        console.log(error.message);
      }
    }

    loadOwnedCommunities()
  }, [])

  function getTimeAgo(createdAt) {
    const seconds = Math.floor(
        (Date.now() - new Date(createdAt).getTime()) / 1000
    );

    if (seconds < 60) {
        return `${seconds} seconds`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} minutes`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hours`;
    }

    const days = Math.floor(hours / 24);

    if (days < 30) {
        return `${days} days`;
    }

    const months = Math.floor(days / 30);

    if (months < 12) {
        return `${months} months`;
    }

    const years = Math.floor(months / 12);

    return `${years} years`;
  }
  
  return (
    <>
      <div className={`${styles.mainContainer}`}>

        <div className={styles.poster}>
          <img src={`${profileUser.poster}?auto=format&fit=max&h=200&q=75`} alt="" />
        </div>

        <div className={styles.profileWidget}>
          
          <div className={styles.info}>
            
            <div className={styles.name}>
              <span>{profileUser.name}</span>
            </div>

            <div className={styles.moreMenuArea} ref={dropdownMenuRef} >            
              <button 
                type='button'
                className={styles.moreMenu}
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
                      <button to="" className={styles.dropdownButton}>
                        {/* <PiBellLight className={`${styles.dropdownIcon} ${styles.bellIcon}`}/> */}
                        <span>Follow post</span>

                        {/* <PiBellFill className={`${styles.dropdownIcon} ${styles.bellIcon}`}/>
                        <span>Following</span> */}
                      </button>
                    </li>

                    <li>
                      <button to="" className={styles.dropdownButton}>
                        {/* <IoBookmarkOutline  className={styles.dropdownIcon}/> */}
                        <span>Save</span>

                        {/* <IoBookmark className={styles.dropdownIcon}/>
                        <span>Saved</span> */}
                      </button>
                    </li>

                    <li>
                      <button to="" className={styles.dropdownButton}>
                        {/* <BiHide className={styles.dropdownIcon}/> */}
                        <span>Hide</span>

                        {/* <BiSolidHide className={styles.dropdownIcon}/>
                        <span>Hidden</span> */}
                      </button>
                    </li>

                    <li>
                      <button to="" className={styles.dropdownButton}>
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


          <div className={styles.tabGroup}>
            <div className={styles.tab}>
              <span>{getTimeAgo(profileUser.createdAt)}</span>
              <span>Threadly Age</span>
            </div>

            <div className={styles.tab}>
              <span>0</span>
              <span>Contributions</span>
            </div>

            <div className={styles.tab}>
              <span>0</span>
              <span>Posts</span>
            </div>

            <div className={styles.tab}>
              <span>0</span>
              <span>communities</span>
            </div>
          </div>

          {profileUser.genres.length !== 0 && (
          <>
            <hr className={styles.horizontalRule}/>    {/* ///////////////////////////////// */}
            
            <div className={styles.genreGroup}>
              <div className={styles.heading}>
                <span>FAVOURITE GENRES</span>
                <span></span>
              </div>

              <div className={styles.genres}>
                {profileUser.genres.map((genre, index) => (
                  <div className={styles.genre} key={index}>
                    <span>{genre}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
          )}

          {ownedCommunities.length !== 0 && (
          <>
            <hr className={styles.horizontalRule}/>

            <div className={styles.ownedCommunities}>
              <div className={styles.heading}>
                OWNER OF THESE COMMUNITITES
              </div>
              <div className={styles.communityList}>
                {ownedCommunities.map(community => (
                  <div 
                    className={styles.communityWrapper}
                    key={community._id}
                    onClick={() => navigate(`/communities/${community._id}`)}
                  >
                    <CommunityCardSmall community={community}/>
                  </div>
                ))}
              </div>
            </div>
          </>
          )}


          {joinedCommunities.length !== 0 && (
          <>
            <hr className={styles.horizontalRule}/>
            
            <div className={styles.joinedCommunities}>
              <div className={styles.heading}>
                MEMBER Of THESE COMMUNITIES
              </div>
              <div className={styles.communityList}>
                {joinedCommunities.map(community => (
                  <div 
                    className={styles.communityWrapper}
                    key={community._id}
                    onClick={() => navigate(`/communities/${community._id}`)}
                  >
                    <CommunityCardSmall community={community}/>
                  </div>
                ))}
              </div>
            </div>
          </>
          )}
          

        </div>

      </div>
    </>
  );
}

export default ProfileWidget;
