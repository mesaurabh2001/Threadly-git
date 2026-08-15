import styles from "./ProfileWidget.module.css";

import CommunityCardSmall from '../../components/CommuntiyCardSmall/CommunityCardSmall';

function ProfileWidget({communityList}) {
  return (
    <>
      <div className={`${styles.mainContainer}`}>

        <div className={styles.poster}>
          <img src="https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJhYmJpdHxlbnwwfDB8MHx8fDA%3D" alt="billa" />
        </div>

        <div className={styles.profileWidget}>
          
          <div className={styles.info}>
            
            <div className={styles.name}>
              <span>Name Here</span>
            </div>

          </div>

          <hr className={styles.horizontalRule}/>

          <div className={styles.tabGroup}>
            <div className={styles.tab}>
              <span>1m</span>
              <span>Threadly Age</span>
            </div>

            <div className={styles.tab}>
              <span>328</span>
              <span>Contributions</span>
            </div>

            <div className={styles.tab}>
              <span>328</span>
              <span>Posts</span>
            </div>

            <div className={styles.tab}>
              <span>328</span>
              <span>communities</span>
            </div>
          </div>

          <hr className={styles.horizontalRule}/>

          <div className={styles.ownedCommunities}>
            <div className={styles.heading}>
              OWNER OF THESE COMMUNITITES
            </div>
            <div className={styles.communityList}>
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
            </div>
          </div>

          <hr className={styles.horizontalRule}/>

          <div className={styles.joinedCommunities}>
            <div className={styles.heading}>
              MEMBER Of THESE COMMUNITIES
            </div>
            <div className={styles.communityList}>
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
              <CommunityCardSmall />
            </div>
          </div>
          

        </div>

      </div>
    </>
  );
}

export default ProfileWidget;
