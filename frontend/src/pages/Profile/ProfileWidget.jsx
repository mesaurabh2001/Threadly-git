import styles from "./ProfileWidget.module.css";

import CommunityCardSmall from '../../components/CommuntiyCardSmall/CommunityCardSmall';
import { useEffect, useState } from "react";
import { getCommunitiesSummaries } from "../../services/communityService";
import { useNavigate } from "react-router-dom";

function ProfileWidget({user}) {

  const navigate = useNavigate();

  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [ownedCommunities, setOwnedCommunities] = useState([]);

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
          <img src={`${user.poster}?auto=format&fit=max&h=200&q=75`} alt="" />
        </div>

        <div className={styles.profileWidget}>
          
          <div className={styles.info}>
            
            <div className={styles.name}>
              <span>{user.name}</span>
            </div>

          </div>

          <hr className={styles.horizontalRule}/>

          <div className={styles.tabGroup}>
            <div className={styles.tab}>
              <span>{getTimeAgo(user.createdAt)}</span>
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
