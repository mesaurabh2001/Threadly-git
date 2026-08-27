import styles from "./PopularCommunitiesWidget.module.css";
import CommunityCardSmall from '../CommuntiyCardSmall/CommunityCardSmall.jsx';

function CommunitiesWidget({communityList, heading}) {
  
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.heading}>
          {heading.toUpperCase()}
        </div>
        <div className={styles.communityList}>
          {communityList.map(community => (
            <div 
              className={styles.communityWrapper}
              key={community._id}
              onClick={() => navigate(`/communities/${community._id}`)}
            >
              <CommunityCardSmall community={community}/>
            </div>
          ))}
        </div>

        <span className={styles.button}>see more</span>
      </div>
    </>
  );
}

export default CommunitiesWidget;
