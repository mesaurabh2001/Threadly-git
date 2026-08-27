import styles from "./Home.module.css";
import Feed from '../../components/Feed/Feed.jsx';
import PopularCommunitiesWidget from "../../components/PopularCommunitiesWidget/PopularCommunitiesWidget.jsx";
import {getCommunitiesSummaries} from '../../services/communityService.js';

// local Modules
import {getPosts} from '../../services/postService.js';

////
import {useState, useEffect} from 'react';

function Home() {

  const [posts, setPosts] = useState([]);
  const [popularCommunities, setPopularCommunities] = useState([]);

  useEffect(() => {
      const getHomePosts = async () => {
        try {
          const data = await getPosts();
          setPosts(data)

        } catch (error) {
          console.log(error.message);
        }
      }

      getHomePosts();

  }, []);

  useEffect(() => {
    const loadPopularCommunities = async () => {
      try {
        const pCommunities = await getCommunitiesSummaries()
        setPopularCommunities(pCommunities);

      } catch (error){
        console.log(error.message);
      }
    }

    loadPopularCommunities();
  }, [])
  
  return (
    <div className={styles.homeContainer}>

      <section className={styles.feedSection}>

        <Feed
          postList={posts} 
        />
      </section>
      
      <aside className={styles.widgetSection}>
        <div className={styles.widget}>
          <PopularCommunitiesWidget
            communityList={popularCommunities} 
            heading={'popular communities'} 
          />
        </div>
      </aside>

    </div>
  );
}

export default Home;
