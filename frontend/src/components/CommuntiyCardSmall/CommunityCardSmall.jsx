import styles from "./CommunityCardSmall.module.css";

function CommunityCardSmall () {
  
  return (
    <>
      <div className={styles.communityCardSmall}>
        <div
          className={styles.avatar}
          onClick={(e) => e.stopPropagation()}
        >
          <img src='https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJhYmJpdHxlbnwwfHwwfHx8MA%3D%3D' alt="" />
        </div>

        <div className={styles.infoName}>

          <div
            className={styles.communityName}
            onClick={(e) => e.stopPropagation()}
          >
            Medical-Medicine6686 Medicine6686
          </div>

          <div
            className={styles.communityMembers}
            onClick={(e) => e.stopPropagation()}
          >
            17.1K Members
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityCardSmall;