import styles from './Explore.module.css';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {getCommunitiesSummaries} from '../../services/communityService.js';

import CommunityCardSmall from '../../components/CommuntiyCardSmall/CommunityCardSmall';


function Explore () {

  const navigate = useNavigate();

  const [communities, setCommunities] = useState();

  useEffect(() => {
    const loadCommunities = async () => {
      try{
        const communitiesSummaries = await getCommunitiesSummaries();
        setCommunities(communitiesSummaries);

      } catch (error) {
        console.log(error.message);
      }
    }

    loadCommunities();

  },[])

  if(!communities){
    return <div> Loading... </div>
  }
  
  return (
    <>
      <div>
        <h2 style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>Explore Communities</h2>
      </div>

      <div className={styles.communityList}>
        {communities.map((community, index) => (
          <div 
            className={styles.communityWrapper}
            onClick={() => navigate(`/communities/${community._id}`)}
          >
            <CommunityCardSmall community={community} key={community._id}/>
          </div>
        ))}
    </div>
    </>
  );
}

export default Explore;