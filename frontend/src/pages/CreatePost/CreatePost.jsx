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
import { IoLinkSharp } from "react-icons/io5";
import { TbPhoto } from "react-icons/tb";
import { LuSquarePlay } from "react-icons/lu";
import { IoTabletLandscape } from "react-icons/io5";
import { IoTabletPortrait } from "react-icons/io5";
import { FaRegSquare } from "react-icons/fa";


function CreatePost () {

  const navigate = useNavigate();
  
  const [selectedCommunity, setSelectedCommunity] = useState();
  const [showCommunities, setShowCommunities] = useState(false);

// FORM DATA STATES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [mediaDimension, setMediaDimension] = useState('square');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
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
  }, [selectedCommunity]);

  const handleTitleChange = (e) => {
    const textarea = e.target;

    textarea.style.height = "48px";
    textarea.style.height = `${textarea.scrollHeight}px`;

    setTitle(textarea.value);
  };

  const handleTagsChange = (e) => {
    const textarea = e.target;

    textarea.style.height = "24px";
    textarea.style.height = `${textarea.scrollHeight}px`;

    setTags(textarea.value);
  };


  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let postObj = {
      communityName: selectedCommunity.name,
      communityId: selectedCommunity._id,
      title: title,
      description: description,
      genre: selectedCommunity.genre,
      tags: tags.split(' '),
      mediaDimension: mediaDimension,
      images: images,
      video: video,
    }

    console.log(postObj);

    try{
      const response = await addPost(postObj);
      navigate('/');

    } catch (error) {
      console.log(error.message);
    }
    
  }

  return (
    <div className={styles.mainContainer}>
      
      <form className={styles.form} onSubmit={handleOnSubmit}>

        <div className={styles.communitySelector}>

          <button
            className={`${styles.communitySelectorButton} ${selectedCommunity ? styles.communitySelectorButtonActive: ''}`}
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

            <span className={`${styles.selectorIcon} ${selectedCommunity ? styles.selectorIconActive: ''}`}>
              <CgArrowsExchangeAltV />
            </span>

          </button>

          {showCommunities && (
            <div className={styles.communityList}>
              {communities.map((community) => (
                <div
                  key={community._id}
                  className={styles.communityWrapper}
                  onClick={() => {
                    setSelectedCommunity(community);
                    setShowCommunities(false);
                  }}
                >
                  <span className={styles.communityWrapperSpan}>joined</span>
                  <CommunityCardSmall community={community} />
                </div>
              ))}
            </div>
          )}

        </div>

        <textarea
          className={styles.titleText}
          placeholder="Title *"
          maxLength='300'
          required
          value={title}
          onChange={handleTitleChange}
        />

        <textarea
          className={styles.descriptionText}
          placeholder="Body text (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          className={styles.tagsText}
          placeholder="Tags  #𝘔𝘰𝘶𝘯𝘵𝘢𝘪𝘯𝘛𝘳𝘦𝘬"
          value={tags}
          onChange={handleTagsChange}
        />

{/* Image Input field and its preview */}
        <input
          id='imageInput'
          className={`${styles.imageInput}`}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages([...e.target.files])}
        />

        {images.length > 0 && (
          <div className={styles.imagePreviewContainer}>
            {images.map((image, index) => (
              <img 
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Selected ${index + 1}`}
                className={styles.imagePreview}
              />
            ))}
          </div>
        )}

{/* Video Input field and its preview */}

        <input
          id='videoInput'
          className={`${styles.videoInput}`}
          type="file" 
          accept="video/mp4, video/webm, video/quicktime"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        {video && (
          <div className={`${styles.videoPreviewContainer}`}>
            <video
              src={URL.createObjectURL(video)}
              controls
              muted
              className={styles.videoPreview}
            />
          </div>
        )}
        

        <div className={styles.iconGroup}>
          <span className={`${styles.icon} ${styles.linkIcon}`}>
            <IoLinkSharp />
          </span>

          <label 
            htmlFor='imageInput'
            className={`${styles.icon} ${styles.photoIcon}`}
          >
            <TbPhoto />
          </label>

          <label
            htmlFor='videoInput'
            className={`${styles.icon} ${styles.videoIcon}`}
          >
            <LuSquarePlay  />
          </label>

          <span className={styles.dividerIcon}></span>

          <span
            onClick={() => setMediaDimension('landscape')}
            className={`
              ${styles.icon} 
              ${styles.landscapeIcon} 
              ${mediaDimension ==='landscape' ? styles.mediaDimensionActive:''}
            `}
          >
            <IoTabletLandscape />
            {mediaDimension ==='landscape' && (
              <span>Landscape</span>
            )}
          </span>

          <span
            onClick={() => setMediaDimension('square')}
            className={`
              ${styles.icon} 
              ${styles.squareIcon}
              ${mediaDimension ==='square' ? styles.mediaDimensionActive:''}
            `}
          >
            <FaRegSquare />
            {mediaDimension ==='square' && (
              <span>Square</span>
            )}
          </span>

          <span
            onClick={() => setMediaDimension('portrait')}
            className={`
              ${styles.icon}
              ${styles.portraitIcon}
              ${mediaDimension ==='portrait' ? styles.mediaDimensionActive:''}
            `}
          >
            <IoTabletPortrait />
            {mediaDimension ==='portrait' && (
              <span>Portrait</span>
            )}
          </span>

        </div>
        
        <div className={styles.submitButtonContainer}>
        <button className={styles.submitButton} type="submit">
          Post
        </button>
        </div>

      </form>


        <aside className={styles.widgetSection}>
          
          {selectedCommunity && (
            <div className={styles.widget}>
              <CreatePostWidget community={selectedCommunity}/>
            </div>
          )}
          
        </aside>


      
    </div>
  )
}

export default CreatePost;