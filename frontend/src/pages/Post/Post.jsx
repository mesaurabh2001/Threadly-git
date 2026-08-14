import { useParams } from 'react-router-dom';
import styles from './Post.module.css';
import { useEffect, useState } from 'react';

// Local Module
import {getPostById} from '../../services/postService.js';

const Post = () => {
  
  const {id} = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try{
        const data = await getPostById(id);
        console.log("Received post:", data);
        setPost(data);

      } catch (error) {
        console.log("Error: ", error.message);
      }
    }

    getPost();
  }, [id])

  return (
    <>
      {/* <div className={styles.container}>
        communityId : {post.communityId}
        <br />
        userId : {post.userId}
        <br />
        title : {post.title}
        <br />
        description : {post.description}
        <br />
      </div> */}
    </>
  );
}

export default Post;