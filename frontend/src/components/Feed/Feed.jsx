import styles from './Feed.module.css';
import PostCard from '../PostCard/PostCard.jsx';

function Feed({postList, currentPage}) {
  return (
    <>
    <div className={`${styles.feedContainer}`}>

      {postList.map((post) => (
        <PostCard 
          key={post._id}
          post={post}
          currentPage={currentPage}
        />
        
      ))}
    </div>
    </>
  );
}

export default Feed;
