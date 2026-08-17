import styles from "./CommunityWidget.module.css";

import CommunityCardSmall from '../../components/CommuntiyCardSmall/CommunityCardSmall';
import { useState } from "react";

// React Icons - 
import { IoFolderOpenOutline } from "react-icons/io5";
import { BsGlobe2 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

function CommunityWidget({community}) {

  const [openRule, setOpenRule] = useState(null);

  const date = new Date(community.createdAt);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  
  return (
    <>
      <div className={`${styles.mainContainer}`}>

        <div className={styles.profileWidget}>
          
          <div className={styles.info}>

            <div className={styles.communityDescription}>
              <span>
                {community.title}
              </span>
              <span>{community.description}</span>
            </div>

            <div className={styles.createdDate}>
              <span><IoFolderOpenOutline /></span>
              <span>Created {formattedDate}</span>
            </div>

            <div className={styles.communityType}>
              <span><BsGlobe2 /></span>
              <span>{community.type}</span>
            </div>

          </div>

          <div className={styles.tabGroup}>
            <div className={styles.tab}>
              <span>{community.members.length}</span>
              <span>Foodies</span>
            </div>

            <div className={styles.tab}>
              <span>{community.posts.length}</span>
              <span>Posts</span>
            </div>

            <div className={styles.tab}>
              <span>{community.genre}</span>
              <span>Genre</span>
            </div>
          </div>

          <hr className={styles.horizontalRule}/>    {/* ///////////////////////////////// */}

          <div className={styles.tagGroup}>
            <div className={styles.heading}>
              <span>COMMUNITY</span>
              <span> TAGS</span>
            </div>

            <div className={styles.tags}>
              {community.tags.map(tag => (
                <div className={styles.tag}>
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className={styles.horizontalRule}/>    {/* ///////////////////////////////// */}

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

          <hr className={styles.horizontalRule}/>    {/* ///////////////////////////////// */}

          <div className={styles.relatedCommunities}>
            <div className={styles.heading}>
              RELATED COMMUNITIES
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

          <hr className={styles.horizontalRule}/>    {/* ///////////////////////////////// */}

        </div>

      </div>
    </>
  );
}

export default CommunityWidget;
