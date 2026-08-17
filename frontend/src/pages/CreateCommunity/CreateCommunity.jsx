import styles from './CreateCommunity.module.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Local Module
import {addCommunity} from '../../services/communityService.js';

function CreatePost () {

  const navigate = useNavigate();

  const [showGenreError, setShowGenreError] = useState(false);
  const [showRulesError, setShowRulesError] = useState(false);
  

  const genreList = ["Anime & Cosplay","Art","Business & Finance","Collectibles & Other Hobbies","Education & Career","Fashion & Beauty","Food & Drinks","Games","Health","Home & Garden","Humanities & Law","Identity & Relationships","Internet Culture","Movies & TV","Music","Nature & Outdoors","News & Politics","Places & Travel","Celebrities & Fandoms","Q&As & Stories","Reading & Writing","Sciences","Horror & creepy","Sports","Technology","Vehicles","Wellness","Adult Content","Mature Topics","Memes"]
  const [communityName, setCommunityName] = useState("");
  const [communityTitle, setCommunityTitle] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [adminId, setAdminId] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [genre, setGenre] = useState("");
  let [rules, setRules] = useState([{
    title: "",
    description: "",
  }]);

  const addRule = () => {
    setRules((prevRules) => [
      ...prevRules,
      {
        title: "",
        description: "",
      },
    ]);
  };
  
  const handleRuleChange = (index, field, value) => {
    setRules((prevRules) =>
      prevRules.map((rule, i) =>
        i === index
          ? { ...rule, [field]: value }
          : rule
      )
    );
  };

  const handleOnSubmit = async (e) => {  //////////////// Handle Form Submission /////////////////////
    e.preventDefault();

    if(genre === "") {
      setShowGenreError(true);
      return;
    }

    const cleanedRules = rules.filter(
      rule => rule.title.trim() !== "" && rule.description.trim() !== ""
    );    
    if(cleanedRules.length <3){
      setShowRulesError(true);
      return;
    }
    

    let communityObj = {
      name: communityName,
      title: communityTitle,
      avatar: avatarUrl,
      poster: posterUrl,
      admin: adminId,
      description: description,
      tags: tags.split(' '),
      genre: genre,
      rules: cleanedRules,
    }

    console.log(communityObj);

    try{
      const response = await addCommunity(communityObj);
      console.log(response);
      navigate('/');

    } catch (error) {
      console.log(error.message);
    }
    
  }

  // name, avatar, poster, admin, genre, _id

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleOnSubmit}>

        <h1 className={styles.title}>Create a Community</h1>

        <p className={styles.subtitle}>
          Share something with your community.
        </p>

        <input
          type="text"
          placeholder="Community Name"
          value={communityName}
          onChange={(e) => setCommunityName(e.target.value)}
        />

        <input
          type="text"
          placeholder="A small title"
          value={communityTitle}
          onChange={(e) => setCommunityTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Avatar Url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />

        <input
          type="text"
          placeholder="Poster Url"
          value={posterUrl}
          onChange={(e) => setPosterUrl(e.target.value)}
        />

        <input
          type="text"
          placeholder="Admin Id"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />

        <textarea
          placeholder="Brief Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tags here, space separated words"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* ================================  Genre  ================================ */}

        <div className={styles.genre}>

          <div className={styles.genreLabel}>
            <h3>What will your community be about?</h3>
            <p className={styles.subtitle}>
              Choose a topic to help redditors discover your community
            </p>
          </div>

          <div className={styles.genreOptions}>
            {genreList.map(genre => (
              <label className={styles.genreOption} key={genre}>
                <input
                  type="radio"
                  name="genre"
                  value={genre.toLowerCase()}
                  onChange={(e) => {
                    setGenre(e.target.value);
                    setShowGenreError(false);
                  }}
                />

                <span className={styles.genreCapsule}>
                  <span className={styles.genreIcon}>
                    🎬
                  </span>
                  {genre}
                </span>
              </label>
            ))}
          </div>

        </div>
        
        {showGenreError && (
          <div className={styles.genreSelectWarning}>
            Choose a 'Genre' to help people discover your community
          </div>
        )}

        {/* ================================  Rules  ================================ */}

        <div className={styles.genreLabel}>
          <h3>Community Rules</h3>
          <p className={styles.subtitle}>
            Define rules to help make the community focused
          </p>
        </div>

        <div className={styles.rules}>
          {rules.map((rule, index) => (
            <div className={styles.rule} key={index}>

              <input
                type="text"
                placeholder={`Rule ${index + 1} title`}
                value={rule.title}
                onChange={(e) =>
                  handleRuleChange(index, "title", e.target.value)
                }
              />

              <textarea
                placeholder="Rule description"
                value={rule.description}
                onChange={(e) =>
                  handleRuleChange(index, "description", e.target.value)
                }
              />

            </div>
          ))}
        </div>
        
        {showRulesError && (
          <div className={styles.genreSelectWarning}>
            Please add atleast 3 proper rules
          </div>
        )}

        <button
          type="button"
          className={styles.addRuleButton}
          onClick={() => {
            addRule();
            setShowRulesError(false);
          }}
        >
          + Add Rule
        </button>

        <button className={styles.submitButton} type="submit">
          Contribute a Community
        </button>

      </form>
    </div>
  )
}

export default CreatePost;