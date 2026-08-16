import styles from './Post.module.css';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
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
    comments: [
      {
        _id: 'comment1',
        userId: '101',
        content: 'This is a really interesting post.',
        createdAt: '2026-08-13T10:30:00.000Z',
        upvotes: [],
        downvotes: []
      },
      {
        _id: 'comment2',
        userId: '102',
        content: 'I completely agree with this.',
        createdAt: '2026-08-13T11:15:00.000Z',
        upvotes: [],
        downvotes: []
      }
    ],
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
                  img
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
            
            {post.comments.map(comment => (

              <div className={styles.comment} key={comment._id}>

                <div className={styles.commentInfo}>
                  <Link
                    to={`/users/${comment.userId}`}
                    className={styles.userAvatar}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src="data:image/webp;base64,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" alt="" />
                  </Link>

                  <div className={styles.infoName}>
                    
                    <Link
                      to={`/communities/${post.communityId}`}
                      className={styles.userName}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {comment.userId}

                      <div className={styles.time}>
                        • {getTimeAgo(comment.createdAt)}
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
                  {comment.content}
                </div>

              </div>
            ))}
            
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