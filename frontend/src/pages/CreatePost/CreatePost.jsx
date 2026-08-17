import styles from './CreatePost.module.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Local Module
import {addPost} from '../../services/postService.js';

function CreatePost () {

  const navigate = useNavigate();

  const [communityId, setCommunityId] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let postObj = {
      communityId: communityId,
      userId: userId,
      title: title,
      description: description,
      images: {
        dimension: 'portrait',
        images: [image]
      }
    }

    try{
      const response = await addPost(postObj);
      navigate('/');

    } catch (error) {
      console.log(error.message);
    }
    
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleOnSubmit}>

        <h1 className={styles.title}>Create a post</h1>

        <p className={styles.subtitle}>
          Share something with your community.
        </p>

        <input
          type="text"
          placeholder="Community ID"
          value={communityId}
          onChange={(e) => setCommunityId(e.target.value)}
        />

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label htmlFor="genre">Choose a Genre</label>
        <select name="genre" id="genre">
          <option value="movies">movies</option>
          <option value="gaming">gaming</option>
          <option value="songs">songs</option>
          <option value="tv-series">TV Series</option>
        </select>
        

        <button type="submit">
          Create Post
        </button>

      </form>
    </div>
  )
}

export default CreatePost;