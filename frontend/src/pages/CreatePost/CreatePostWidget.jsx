import styles from "./CreatePostWidget.module.css";

import CommunityCardSmall from '../../components/CommuntiyCardSmall/CommunityCardSmall';
import { useState } from "react";

// React Icons - 
import { IoFolderOpenOutline } from "react-icons/io5";
import { BsGlobe2 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

function CreatePostWidget({community}) {

  const [openRule, setOpenRule] = useState(null);
  
  return (
    <div className={`${styles.mainContainer}`}>

      <div className={styles.profileWidget}>
        
        <div className={styles.info}>

          <div className={styles.communityDescription}>
            <span>
              {community.title}
            </span>
            <span>{community.description}</span>
          </div>

          <div className={styles.communityType}>
            <span><BsGlobe2 /></span>
            <span>Public</span>
          </div>

        </div>

        <div className={styles.tabGroup}>
          
          <div className={styles.tab}>
            <span>{community.genre}</span>
            <span>Genre</span>
          </div>
          
        </div>
      </div>
      
      {community.rules && (
        <div className={styles.profileWidget}>

          <div className={styles.communityRules}>
            <div className={styles.heading}>
              <span>R/COMMUNITYNAME</span>
              <span> RULES</span>
            </div>
            
            <div className={styles.rules}>
              {community.rules.map((rule, index) => (
                <div className={styles.ruleTab} key={index}>
                  <div
                    className={`${styles.ruleHead} ${openRule === index ? styles.open : ""}`}
                    onClick={() => setOpenRule(openRule === index ? null : index)}
                    
                  >
                    <span>{index + 1}</span>
                    <span>{rule.title}</span>
                    <span className={styles.arrow}>
                      <IoIosArrowDown />
                    </span>
                  </div>

                  {/* {openRule === index && (
                    <div className={styles.ruleDescription}>
                      {rule.description}
                    </div>
                  )} */}
                  
                  <div
                    className={`${styles.ruleDescription} ${openRule === index ? styles.descriptionOpen : ""}`}
                  >
                    <div className={styles.descriptionContent}>
                      {rule.description}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {community.tags && (
        <div className={styles.profileWidget}>

          <div className={styles.tagGroup}>
            <div className={styles.heading}>
              <span>COMMUNITY</span>
              <span> TAGS</span>
            </div>

            <div className={styles.tags}>
              {community.tags.map((tag, index) => (
                <div className={styles.tag} key={index}>
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
      </div>
      )}



    </div>
  );
}

export default CreatePostWidget;
