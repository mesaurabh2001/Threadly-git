import styles from "./CommunityCardSmall.module.css";

function CommunityCardSmall ({community}) {
  return (
    <>
      <div className={styles.communityCardSmall} >
        
        <div
          className={styles.avatar}
        >
          <img src={`${community.avatar}?w=40&auto=format&fit=crop&q=60`} alt="" />
        </div>

        <div className={styles.infoName}>

          <div
            className={styles.communityName}
          >
            t/{community.name}
          </div>

          <div
            className={styles.communityMembers}
          >
            <span>12,4{community.memberCount},321 Members ⟿</span> 
            <span> {community.title}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityCardSmall;