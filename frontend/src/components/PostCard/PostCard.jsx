import styles from './PostCard.module.css';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

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

function PostCard ({post}) {

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

  return (
    <>
      <hr className={styles.horizontalRule}/>
      
      <div className={styles.container}>

        <article 
          className={styles.postCard}
          onClick={() => navigate(`/posts/${post._id}`)}
        >
          
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

            <Link
              to={`/posts/${post._id}`}
              className={styles.description}
              onClick={(e) => e.stopPropagation()}
            >
              {post.description}
              <div className={styles.descriptionContentHide}></div>
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
        
      </div>
    </>
  )
}

export default PostCard;