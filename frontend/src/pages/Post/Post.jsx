import styles from './Post.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// Local Module
import {getPostById} from '../../services/postService.js';
import PostWidget from './PostWidget.jsx';

// Icons import
import { BsThreeDots } from "react-icons/bs";
import { IoArrowRedoOutline } from "react-icons/io5";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

// dropdown menu icons
import { PiBellFill, PiBellLight } from "react-icons/pi";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { BiHide, BiSolidHide } from "react-icons/bi";
import { RiFlagLine, RiFlagFill } from "react-icons/ri";

const Post = () => {
  
  // const {id} = useParams();
  // const [post, setPost] = useState(null);

  // useEffect(() => {
  //   const getPost = async () => {
  //     try{
  //       const data = await getPostById(id);
  //       console.log("Received post:", data);
  //       setPost(data);

  //     } catch (error) {
  //       console.log("Error: ", error.message);
  //     }
  //   }

  //   getPost();
  // }, [id])

  const post = {
    _id: '6a7d883a31d301225596c51d',
    communityId: '1',
    userId: '101',
    title: 'Exploring the Mountains',
    description: `Mountains are among the most powerful subjects a writer can tackle. They carry weight on the page in ways few other landscapes can — they suggest permanence, danger, solitude, and grandeur all at once. Yet when it comes to putting that feeling into words, many writers reach for “big” or “tall” and stop there.

In this guide, you’ll find over 100 carefully selected words to describe mountains, sorted into 10 categories that cover everything from visual appearance and terrain to atmosphere, emotion, and figurative language. Each word includes a clear definition and a sentence about mountain scenery you can adapt to your own writing.

Whether you’re drafting a novel, polishing a poem, or searching for the perfect adjective for a travel piece, these words will sharpen your mountain vocabulary. Bookmark this page — you’ll want it close the next time a mountain scene demands better language.`,
    images: {
      dimension: 'portrait',
      images: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
        'https://images.unsplash.com/photo-1464278533981-50106e6176b1',
        'https://images.unsplash.com/photo-1486911278844-a81c5267e227',
        'https://images.unsplash.com/photo-1464278533981-50106e6176b1',
        'https://images.unsplash.com/photo-1500534623283-312aade485b7'
      ]
    },
    genre: null,
    followedBy: [],
    upvotes: [],
    downvotes: [],
    comments: [],
    createdAt: '2026-08-13T09:02:50.600Z',
    updatedAt: '2026-08-13T09:02:50.600Z',
  }

  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageDimension = post.images.dimension;
  const images = post.images.images || [];
  const currentImage = images[currentImageIndex];

  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const dropdownMenuRef = useRef(null);

  useEffect(() => {
      function handleClickOutside(event) {
          if (
              dropdownMenuRef.current &&
              !dropdownMenuRef.current.contains(event.target)
          ) {
              setShowDropdownMenu(false);
          }

      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };

  }, []);

  function getTimeAgo(createdAt) {
    const seconds = Math.floor(
        (Date.now() - new Date(createdAt).getTime()) / 1000
    );

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} minutes ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hours ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 30) {
        return `${days} days ago`;
    }

    const months = Math.floor(days / 30);

    if (months < 12) {
        return `${months} months ago`;
    }

    const years = Math.floor(months / 12);

    return `${years} years ago`;
  }

  // ////////////////////////////////////////////////////////////
  return (
    <>
      <div className={styles.postContainer}>
        
        <section className={styles.postSection}>

          <article className={styles.post}>
            
            <header className={styles.header}>

              <div className={styles.info}>
                <Link
                  to={`/communities/${post.communityId}`}
                  className={styles.communityPicture}
                  onClick={(e) => e.stopPropagation()}
                >
                  ss
                </Link>

                <div className={styles.infoName}>
                  <Link
                    to={`/communities/${post.communityId}`}
                    className={styles.communityName}
                    onClick={(e) => e.stopPropagation()}
                  >
                    t/hiking
                    community-{post.communityId}
                  </Link>

                  <Link 
                    to={`/users/${post.userId}`}
                    className={styles.userName}
                    onClick={(e) => e.stopPropagation()}
                  >
                    deep_seek_guy
                    user-{post.userId}
                  </Link>
                </div>

                <div className={styles.time}>
                  • {getTimeAgo(post.createdAt)}
                </div>
              </div>
              
              <div className={styles.buttonGroup}>

                <button 
                  className={styles.joinButton}
                  onClick={(e) => e.stopPropagation()}
                >
                  Join
                </button>

                <button
                  className={styles.joinedButton}
                  onClick={(e) => e.stopPropagation()}
                >
                  Joined
                </button>

                <button 
                  type='button'
                  className={styles.moreOptions} ref={dropdownMenuRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdownMenu(prev => !prev);
                  }}
                > 
                  <BsThreeDots />
                </button>

                {showDropdownMenu && (
                  <div 
                    className={styles.ButtonMenu}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ul>
                      <li>
                        <NavLink to="" className={styles.dropdownLink}>
                          <PiBellLight className={`${styles.dropdownIcon} ${styles.bellIcon}`}/>
                          <span>Follow post</span>

                          <PiBellFill className={`${styles.dropdownIcon} ${styles.bellIcon}`}/>
                          <span>Following</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="" className={styles.dropdownLink}>
                          <IoBookmarkOutline  className={styles.dropdownIcon}/>
                          <span>Save</span>

                          <IoBookmark className={styles.dropdownIcon}/>
                          <span>Saved</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="" className={styles.dropdownLink}>
                          <BiHide className={styles.dropdownIcon}/>
                          <span>Hide</span>

                          <BiSolidHide className={styles.dropdownIcon}/>
                          <span>Hidden</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="" className={styles.dropdownLink}>
                          <RiFlagLine className={styles.dropdownIcon}/>
                          <span>Report</span>

                          <RiFlagFill  className={styles.dropdownIcon}/>
                          <span>Reported</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

            </header>
            
            <section className={styles.content}>

              <Link
                to={`/posts/${post._id}`} 
                className={styles.title}
                onClick={(e) => e.stopPropagation()}
              >
                  {post.title}
              </Link>

              <div 
                className={`${styles.media} ${imageDimension === 'portrait' ? styles.portrait : ''}`}
                onClick={(e) => e.stopPropagation()}
              >

                <img
                  className={styles.backgroundImage}
                  src={`${currentImage}?fm=jpg&fit=max&w=20&q=40`}
                  loading="lazy"
                  alt=""
                />

                <a href={`${currentImage}?fm=jpg&fit=max&w=1200&q=75`} target="_blank" rel="noopener noreferrer">
                  <img
                    className={styles.foregroundImage}
                    src={`${currentImage}?fm=jpg&fit=max&w=800&q=75`}
                    alt={post.title}
                    loading="lazy"
                  />
                </a>

                { images.length > 1 && (
                  <button
                    className={`${styles.previousButton}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => prev - 1);
                    }}
                    disabled={currentImageIndex === 0}
                  >
                    <IoChevronBack />
                  </button>
                )}
                
                { images.length > 1 && (
                  <button
                    className={`${styles.nextButton}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => prev + 1);
                    }}
                    disabled={currentImageIndex === images.length - 1}
                  >
                    <IoChevronForward />
                  </button>
                )}

                { images.length > 1 && (
                  <div className={styles.imageIndicators}>
                    <div
                      className={styles.activeDot}
                      style={{
                        transform: `translateX(${currentImageIndex * 9}px)`
                      }}
                    />

                    {images.map((_, index) => (
                      <span
                        key={index}
                        className={styles.dot}
                      />
                    ))}
                  </div>
                )}

              </div>

              <div className={styles.description}>
                {post.description}
              </div>

            </section>
            
            <footer className={styles.footer}>
              
              <div 
                className={ `${styles.voteArea} ${styles.footerButton}`}
                onClick={(e) => e.stopPropagation()}
              >
                <button className={`${styles.voteButton}`}>
                  <FaLongArrowAltUp className={styles.voteButtonIcon}/>
                </button>

                <span className={`${styles.voteCount} `}>
                  {post.upvotes.length - post.downvotes.length}
                </span>

                <button className={ `${styles.voteButton}`}>
                  <FaLongArrowAltDown className={styles.voteButtonIcon}/>
                </button>
              </div>

              <div 
                className={ `${styles.commentCount} ${styles.footerButton}`}
                onClick={(e) => e.stopPropagation()}
              >
                <BsChat className={styles.commentIcon}/>{post.comments.length}
              </div>

              <div 
                className={ `${styles.shareButton} ${styles.footerButton}`}
                onClick={(e) => e.stopPropagation()}
              >
                <IoArrowRedoOutline className={styles.shareIcon}/> Share
              </div>

            </footer>

          </article>

          <div className={styles.comments}>
            
            <div className={styles.inputSection}>

              <div className={styles.commentInput}>
                <input
                  className={styles.inputBox}
                  type="text"
                  placeholder="Join the conversation"
                  />
              </div>
              
            </div>


            <div className={styles.comment}>

              <div className={styles.commentInfo}>
                <Link
                  to={`/communities/${post.communityId}`}
                  className={styles.userAvatar}
                  onClick={(e) => e.stopPropagation()}
                >
                  ss
                </Link>

                <div className={styles.infoName}>
                  
                  <Link
                    to={`/communities/${post.communityId}`}
                    className={styles.userName}
                    onClick={(e) => e.stopPropagation()}
                  >
                    deep_seek_guy

                    <div className={styles.time}>
                      • {getTimeAgo(post.createdAt)}
                    </div>

                  </Link>

                  {/* <div
                    className={styles.userNameSpace}
                    onClick={(e) => e.stopPropagation()}
                  >
                    &nbsp;
                  </div> */}

                </div>
                
              </div>

              <div className={styles.commentContent}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam cupiditate ipsam inventore fuga sunt. Sunt odio ullam animi laborum dolor a doloribus?f
              </div>

            </div>
          </div>

        </section>

        <aside className={styles.widgetSection}>
          <PostWidget />
        </aside>

      </div>
    </>
  );
}

export default Post;