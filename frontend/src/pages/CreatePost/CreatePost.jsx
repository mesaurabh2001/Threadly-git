import styles from './CreatePost.module.css';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// Local Module
import {addPost} from '../../services/postService.js';
import {getCommunitiesSummaries} from '../../services/communityService.js';
import CommunityCardSmall from '../../components/CommuntiyCardSmall/CommunityCardSmall.jsx';
import CreatePostWidget from './CreatePostWidget.jsx';

// React Icons
import { CgArrowsExchangeAltV } from "react-icons/cg";



function CreatePost () {

  const navigate = useNavigate();
  
  const [selectedCommunity, setSelectedCommunity] = useState();
  const [showCommunities, setShowCommunities] = useState(false);

// FORM DATA STATES
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const communities = await getCommunitiesSummaries();
        setCommunities(communities);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCommunities();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let postObj = {
      communityName: selectedCommunity.name,
      communityId: selectedCommunity._id,
      userId: userId,
      title: title,
      description: description,
      genre: selectedCommunity.genre,
      tags: tags.split(' '),
      images: {
        dimension: 'portrait',
        images: [image]
      }
    }

    console.log(postObj);

    // try{
    //   const response = await addPost(postObj);
    //   navigate('/');

    // } catch (error) {
    //   console.log(error.message);
    // }
    
  }

  return (
    <div className={styles.mainContainer}>
      
      <form className={styles.form} onSubmit={handleOnSubmit}>

        <h1 className={styles.title}>Create a post</h1>
        <p className={styles.subtitle}>
          Share something with your community.
        </p>


        <div className={styles.communitySelector}>

          <button
            className={styles.communitySelectorButton}
            type="button"
            onClick={() => setShowCommunities(prev => !prev)}
          >
            {selectedCommunity ? (
              <div className={styles.selectedCommunity}>
                <span className={styles.communityAvatar}>
                  <img
                    src={`${selectedCommunity.avatar}?w=40&auto=format&fit=crop&q=60`}
                    alt=''
                  />
                </span>

                <span className={styles.communityName}>
                  t/{selectedCommunity.name}
                </span>
              </div>
            ) : (
              <span className={styles.placeholder}>
                Select a Community
              </span>
            )}

            <span className={styles.selectorIcon}>
              <CgArrowsExchangeAltV />
            </span>
          </button>

          {showCommunities && (
            <div className={styles.communityList}>
              {communities.map((community) => (
                <div
                  key={community._id}
                  className={styles.communityOption}
                  onClick={() => {
                    setSelectedCommunity(community);
                    setShowCommunities(false);
                  }}
                >
                  <CommunityCardSmall community={community} />
                </div>
              ))}
            </div>
          )}

        </div>

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
          placeholder="Tasgs here, space separated values"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        

        <button className={styles.submitButton} type="submit">
          Create Post
        </button>

      </form>

      <aside className={styles.widgetSection}>
      {selectedCommunity && (
          <CreatePostWidget community={selectedCommunity}/>
      )}
      </aside>

      
    </div>
  )
}

export default CreatePost;