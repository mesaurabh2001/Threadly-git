import styles from "./PostWidget.module.css";

import CommunityCardSmall from '../../components/CommuntiyCardSmall/CommunityCardSmall';
import { useState } from "react";

// React Icons - 
import { IoFolderOpenOutline } from "react-icons/io5";
import { BsGlobe2 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

function PostWidget({communityList}) {

  const [openRule, setOpenRule] = useState(null);

  const rules = [
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
  ];

  const tags = [
    "Discussion", "Question", "Help", "News", "Announcement", "Meme", "Guide", "Tutorial", "Review", "Recommendation", "Advice", "Poll", "Showcase", "Achievement", "Event", "Resources", "Feedback", "Off-Topic", "Meta", "Debate", "Theory", "Opinion", "Story", "Update", "Important", ];
  
  return (
    <>
      <div className={`${styles.mainContainer}`}>

        <div className={styles.profileWidget}>
          
          <div className={styles.info}>
            
            <div className={styles.communityName}>
              <span>Community Name</span>
            </div>

            <div className={styles.communityDescription}>
              <span>
                Community Description title
              </span>
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nesciunt delectus perspiciatis harum provident ipsam sunt ab, odio quae atque non quo?</span>
            </div>

            <div className={styles.createdDate}>
              <span><IoFolderOpenOutline /></span>
              <span>Created Feb 28, 2012</span>
            </div>

            <div className={styles.communityType}>
              <span><BsGlobe2 /></span>
              <span>Public</span>
            </div>

          </div>

          <div className={styles.tabGroup}>
            <div className={styles.tab}>
              <span>298K</span>
              <span>Foodies</span>
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

          <hr className={styles.horizontalRule}/>    {/* ///////////////////////////////// */}

          <div className={styles.communityRules}>
            <div className={styles.heading}>
              <span>R/COMMUNITYNAME</span>
              <span> RULES</span>
            </div>
            
            <div className={styles.rules}>

              {rules.map((rule, index) => (
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

          <div className={styles.tagGroup}>
            <div className={styles.heading}>
              <span>COMMUNITY</span>
              <span> TAGS</span>
            </div>

            <div className={styles.tags}>
              {tags.map(tag => (
                <div className={styles.tag}>
                  <span>{tag}</span>
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

export default PostWidget;
