import styles from "./Home.module.css";
import Feed from '../../components/Feed/Feed.jsx';
import CommunitiesWidget from "../../components/CommunitiesWidget/CommunitiesWidget.jsx";

// local Modules
import {getPosts} from '../../services/postService.js';

////
import {useState, useEffect} from 'react';

function Home() {

  const [posts, setPosts] = useState([]);

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
  
  return (
    <div className={styles.homeContainer}>

      <section className={styles.feedSection}>
        <h1>Threadly</h1>
        <p>All discussions will appear here</p>

        <Feed
          postList={posts} 
        />
      </section>
      
      <aside className={styles.widgetSection}>
        <CommunitiesWidget communityList={[]}/>
      </aside>

    </div>
  );
}

export default Home;
