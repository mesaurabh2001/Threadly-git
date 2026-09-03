import styles from './PostCard.module.css';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

// Icons import
import { BsThreeDots } from "react-icons/bs";
import { IoArrowRedoOutline } from "react-icons/io5";
import { TbArrowBigDown, TbArrowBigUp  } from "react-icons/tb";
import { BsChat } from "react-icons/bs";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { LuFullscreen } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { FaRedoAlt } from "react-icons/fa";

// dropdown menu icons
import { PiBellFill, PiBellLight } from "react-icons/pi";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { BiHide, BiSolidHide } from "react-icons/bi";
import { RiFlagLine, RiFlagFill } from "react-icons/ri";

function PostCard ({post, currentPage}) {

  const navigate = useNavigate();

  const mediaRef = useRef(null);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(1);
  
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const dropdownMenuRef = useRef(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mediaDimension = post.mediaDimension;
  const images = post.images || [];
  const currentImage = images[currentImageIndex];


  useEffect(() => {
    function handleClickOutside(event) {

      // Close profile dropdown when clicking outside
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

  useEffect(() => {
    document.documentElement.style.overflowY = isImageExpanded ? 'hidden' : 'scroll';

    return () => {
      document.documentElement.style.overflowY = 'scroll';
    };
  }, [isImageExpanded]);

  const togglePlay = () => {
    const video = videoRef.current;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      requestAnimationFrame(updateProgress);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  const updateProgress = () => {
    const video = videoRef.current;

    if (!video) return;

    setCurrentTime(video.currentTime);

    if (video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }

    if (!video.paused) {
      requestAnimationFrame(updateProgress);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const progressBar = e.currentTarget;

    const rect = progressBar.getBoundingClientRect();
    const position = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, position / rect.width));

    video.currentTime = percentage * video.duration;
    setProgress(percentage * 100);
  };

  const handlePointerDown = (e) => {
    setIsSeeking(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleSeek(e);
  };
  const handlePointerMove = (e) => {
    if (isSeeking) {
      handleSeek(e);
    }
  };
  const handlePointerUp = () => {
    setIsSeeking(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      if (isSeeking) {
        const progressBar = document.querySelector(`.${styles.progressBar}`);

        if (progressBar) {
          const rect = progressBar.getBoundingClientRect();
          const position = e.clientX - rect.left;
          const percentage = Math.max(0, Math.min(1, position / rect.width));

          videoRef.current.currentTime =
            percentage * videoRef.current.duration;

          setProgress(percentage * 100);
        }
      }
    };

    const handleWindowMouseUp = () => {
      setIsSeeking(false);
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [isSeeking]);

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleVideoFullscreen = () => {
    const media = mediaRef.current;

    if (!media) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      media.requestFullscreen();
    }
  };

  const handleVolumeChange = (e) => {
    const value = Number(e.target.value);

    setVolume(value);

    if (videoRef.current) {
      videoRef.current.volume = value;
    }
  };

  function getTimeAgo(createdAt) {
    const seconds = Math.floor(
        (Date.now() - new Date(createdAt).getTime()) / 1000
    );

    if (seconds < 60) {
        return `${seconds} sec. ago`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} min. ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hr. ago`;
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
                to={currentPage==='community' ? `/users/${post.user._id}`:`/communities/${post.community._id}`}
                className={styles.communityPicture}
                onClick={(e) => e.stopPropagation()}
              >
                {currentPage === 'community' ? (
                  <img src={`${post.user.avatar}?fm=jpg&fit=max&w=40&q=75`} alt="" />
                  ) : (
                  <img src={`${post.community.avatar}?fm=jpg&fit=max&w=40&q=75`} alt="" />
                  )
                }
                  
              </Link>

              <div className={styles.infoName}>
                <Link
                  to={currentPage==='community' ? `/users/${post.user._id}`:`/communities/${post.community._id}`}
                  className={styles.communityName}
                  onClick={(e) => e.stopPropagation()}
                >
                  {currentPage === 'community' ? (
                    <span>u/{post.user.username}</span>
                    ) : (
                      <span>t/{post.community.name}</span>
                    )
                  }
                  
                </Link>
                
                {currentPage !== 'community' && (
                  <Link 
                    to={`/users/${post.user._id}`}
                    className={styles.userName}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {post.user.username}
                  </Link>
                )}

              </div>

              <div className={`${styles.time} ${currentPage === 'community' ? '': styles.shiftTime}`}>
                • {getTimeAgo(post.createdAt)}
              </div>
            </div>
            
            <div className={styles.buttonGroup}>

              {currentPage !== 'community' && (
                <>
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
                </>
              )}

              <div className={styles.moreMenuArea} ref={dropdownMenuRef} >
              
                <button 
                  type='button'
                  className={styles.moreMenu}
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

                          {/* <PiBellFill className={`${styles.dropdownIcon} ${styles.bellIcon}`}/>
                          <span>Following</span> */}
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="" className={styles.dropdownLink}>
                          <IoBookmarkOutline  className={styles.dropdownIcon}/>
                          <span>Save</span>

                          {/* <IoBookmark className={styles.dropdownIcon}/>
                          <span>Saved</span> */}
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="" className={styles.dropdownLink}>
                          <BiHide className={styles.dropdownIcon}/>
                          <span>Hide</span>

                          {/* <BiSolidHide className={styles.dropdownIcon}/>
                          <span>Hidden</span> */}
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="" className={styles.dropdownLink}>
                          <RiFlagLine className={styles.dropdownIcon}/>
                          <span>Report</span>

                          {/* <RiFlagFill  className={styles.dropdownIcon}/>
                          <span>Reported</span> */}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
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

            {post.description && (
              <Link
                to={`/posts/${post._id}`}
                className={styles.description}
                onClick={(e) => e.stopPropagation()}
              >
                {post.description}
              </Link>
            )}

            {(images.length > 0 || post.video) && (

              <div 
                ref={mediaRef}
                className={`
                  ${styles.media} 
                  ${mediaDimension === 'landscape' ? styles.landscapeDimension: ''}
                  ${mediaDimension === 'square' ? styles.squareDimension: ''}
                  ${mediaDimension === 'portrait' ? styles.portraitDimension : ''}
                  ${isImageExpanded ? styles.imageExpanded : ''}
                `}
                onClick={(e) => e.stopPropagation()}
              >
                
                {images.length > 0 && (
                  <>
                    <img
                      className={styles.backgroundImage}
                      src={`${currentImage}?fm=jpg&fit=max&w=20&q=40`}
                      loading="lazy"
                      alt=""
                    />

                    <img
                      onClick={() => setIsImageExpanded(true)}
                      className={styles.foregroundImage}
                      src={`${currentImage}?fm=jpg&fit=max&w=600&h=600&q=75`}
                      alt={post.title}
                      loading="lazy"
                    />

                    {isImageExpanded && (
                      <button
                        className={styles.closeExpandedImageButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsImageExpanded(false);
                        }}
                      >
                        <IoClose />
                      </button>
                    )}

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
                  </>
                )}

                {post.video && (
                  <>
                    <video
                      onClick={togglePlay}
                      onDoubleClick={toggleVideoFullscreen}
                      ref={videoRef}
                      className={styles.video}
                      src={post.video}
                      preload='metadata'
                      onLoadedMetadata={handleLoadedMetadata}
                    />

                    <div className={styles.videoControlContainer}>

                      <button
                        className={styles.playButton}
                        onClick={togglePlay}
                        >
                          {progress === 100 ?
                          (<FaRedoAlt />) : isPlaying ? 
                          (<FaPause />) : (<FaPlay />)}
                      </button>
                      
                      <div
                        className={styles.progressBar}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                      >
                        <div className={styles.progressContainer}>
                          <div
                            className={styles.progress}
                            style={{ width: `${progress}%` }}
                          >
                            <span></span>
                          </div>
                        </div>
                      </div>

                      <span className={styles.videoTime}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>

                      <button
                        className={styles.fullscreenButton}
                        onClick={toggleVideoFullscreen}
                      >
                        <LuFullscreen />
                      </button>

                      <div className={styles.volumeContainer}>
                        {showVolume && (
                          <input
                            className={styles.volumeSlider}
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                          />
                        )}

                        <button
                          className={styles.volumeButton}
                          onClick={() => setShowVolume(prev => !prev)}
                        >
                          {volume !== 0 ? <FaVolumeHigh /> : <FaVolumeXmark /> }
                        </button>
                      </div>

                    </div>
                  </>
                )}

              </div>
            )}

          </section>
          
          <footer className={styles.footer}>
            
            <div 
              className={ `${styles.voteArea} ${styles.footerButton}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={`${styles.voteButton}`}>
                <TbArrowBigUp className={styles.voteButtonIcon}/>
              </button>

              <span className={`${styles.voteCount} `}>
                532
              </span>

              <button className={ `${styles.voteButton}`}>
                <TbArrowBigDown className={styles.voteButtonIcon}/>
              </button>
            </div>

            <div 
              className={ `${styles.commentCount} ${styles.footerButton}`}
              onClick={(e) => e.stopPropagation()}
            >
              <BsChat className={styles.commentIcon}/> 127
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