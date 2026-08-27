import styles from "./CommunityWidget.module.css";

import CommunityCardSmall from '../CommuntiyCardSmall/CommunityCardSmall';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCommunitiesSummaries } from "../../services/communityService";

// React Icons - 
import { IoFolderOpenOutline } from "react-icons/io5";
import { BsGlobe2 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

function PostWidget({community, currentPage}) {

  const [openRule, setOpenRule] = useState(null);
  const [relatedCommunities, setRelatedCommunities] = useState([]);

  const navigate = useNavigate();

  const date = new Date(community.createdAt);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  
  useEffect(() => {
    const loadCommunities = async () => {
      try{
        const data = await getCommunitiesSummaries();
        setRelatedCommunities(data);

      } catch (error){
        console.log(error.message);
      }
    }

    loadCommunities();
  }, []);


  // return (
  //   <>
  //     <div>loading...</div>
  //   </>
  // )

  return (
    <>
      <div className={`${styles.mainContainer} ${currentPage === 'community' && styles.mainContainerCommunity}`}>

        <div className={styles.profileWidget}>
          
          <div className={styles.info}>
            
            {currentPage !== 'community' && (

            <div className={styles.communityName}>
              <span>t/{community.name}</span>

              <div className={styles.buttonGroup}>
                <button 
                  className={styles.joinButton}
                  onClick={(e) => e.stopPropagation()}
                >
                  Join
                </button>

                {/* <button
                  className={styles.joinedButton}
                  onClick={(e) => e.stopPropagation()}
                >
                  Joined
                </button> */}
              </div>
              
            </div>
            )}

            <div className={styles.communityDescription}>
              <span>
                {community.title}
              </span>
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nesciunt delectus perspiciatis harum provident ipsam sunt ab, odio quae atque non quo?</span>
            </div>

            <div className={styles.createdDate}>
              <span><IoFolderOpenOutline /></span>
              <span>Created {formattedDate}</span>
            </div>

            <div className={styles.communityType}>
              <span><BsGlobe2 /></span>
              <span>Public</span>
            </div>

          </div>

          <div className={styles.tabGroup}>
            <div className={styles.tab}>
              <span>298K</span>
              <span>Weekly visitors</span>
            </div>

            <div className={styles.tab}>
              <span>328</span>
              <span>Weekly contributions</span>
            </div>

            <div className={styles.tab}>
              <span>328</span>
              <span>Posts</span>
            </div>
          </div>

          <hr className={styles.horizontalRule}/>    {/* ///////////////////////////////// */}

          <div className={styles.communityRules}>
            <div className={styles.heading}>
              <span>T/{community.name}</span>
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
              {community.tags.map((tag, index) => (
                <div className={styles.tag} key={index}>
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
              {relatedCommunities.map((community, index) => (
                <div 
                  className={styles.communityWrapper}
                  onClick={() => navigate(`/communities/${community._id}`)}
                  key={community._id}
                >
                  <CommunityCardSmall community={community} />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default PostWidget;
