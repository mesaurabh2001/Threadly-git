import styles from './Post.module.css';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// Local Module
import {getPostById} from '../../services/postService.js';
import { getCommunityById } from '../../services/communityService.js';
import CommunityWidget from '../../components/CommunityWidget/CommunityWidget.jsx';

// Icons import
import { BsThreeDots } from "react-icons/bs";
import { IoArrowRedoOutline } from "react-icons/io5";
import { TbArrowBigDown, TbArrowBigUp  } from "react-icons/tb";
import { BsChat } from "react-icons/bs";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

// dropdown menu icons
import { PiBellFill, PiBellLight } from "react-icons/pi";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { BiHide, BiSolidHide } from "react-icons/bi";
import { RiFlagLine, RiFlagFill } from "react-icons/ri";

const Post = () => {
  
  const {id} = useParams();
  const [post, setPost] = useState(null);
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try{
        const data = await getPostById(id);
        setPost(data);

      } catch (error) {
        console.log("Error getting post: ", error.message);
      }
    }

    loadPost();
  }, [id]);

  useEffect(() => {
    const communityId = post?.community?._id;

    if (!communityId) return;
  
    const loadCommunity = async () => {
      try {
        const data = await getCommunityById(post.community._id);
        console.log(data);
        setCommunity(data);

      } catch (error) {
        console.log("Error getting community: ", error.message);
      }
    }

    loadCommunity();
  }, [post?.community?._id])

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  if (!post) {
    return <div>Loading...</div>;
  }
  
  const mediaDimension = post.mediaDimension;
  const images = post.images || [];
  const currentImage = images[currentImageIndex];

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
      <div className={styles.mainContainer}>
        
        <section className={styles.postSection}>

          <article className={styles.post}>
            
            <header className={styles.header}>

              <div className={styles.info}>
                <Link
                  to={`/communities/${post.community._id}`}
                  className={styles.communityPicture}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={`${post.community.avatar}?fm=jpg&fit=max&w=40&q=75`} alt={post.community.name.charAt(0)} />
                </Link>

                <div className={styles.infoName}>
                  <Link
                    to={`/communities/${post.community._id}`}
                    className={styles.communityName}
                    onClick={(e) => e.stopPropagation()}
                  >
                    t/{post.community.name}
                  </Link>

                  <Link 
                    to={`/users/${post.user._id}`}
                    className={styles.userName}
                    onClick={(e) => e.stopPropagation()}
                  >
                    u/{post.user.username}
                  </Link>
                </div>

                <div className={styles.time}>
                  • {getTimeAgo(post.createdAt)}
                </div>
              </div>
              
              <div className={styles.buttonGroup}>

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

              <div
                className={styles.title}
                onClick={(e) => e.stopPropagation()}
              >
                  {post.title}
              </div>

              {(images.length > 0 || post.video) && (
              
                <div 
                  className={`
                    ${styles.media} 
                    ${mediaDimension === 'landscape' ? styles.landscapeDimension: ''}
                    ${mediaDimension === 'square' ? styles.squareDimension: ''}
                    ${mediaDimension === 'portrait' ? styles.portraitDimension : ''}
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
  
                      <a href={`${currentImage}?fm=jpg&fit=max&w=600&h=600&q=75`} target="_blank" rel="noopener noreferrer">
                        <img
                          className={styles.foregroundImage}
                          src={`${currentImage}?fm=jpg&fit=max&w=600&h=600&q=75`}
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
                    </>
                  )}
  
                  {post.video && (
                    <video
                      className={styles.video}
                      src={post.video}
                      controls
                      muted
                      preload='metadata'
                    />
                  )}
  
                </div>
              )}

              <div className={styles.description}>
                {post.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Id maxime ratione autem. Quam quaerat quod saepe, iste accusantium laborum molestiae consequatur itaque pariatur perferendis explicabo fuga nulla minus nihil a nesciunt quia officia consequuntur eveniet veniam culpa vero maiores soluta. Eaque asperiores quos commodi maxime delectus eum et illo rem? Mollitia ab voluptate sapiente vero. Vel hic nulla deserunt est ut odit rem reprehenderit magni alias officia, ipsum debitis aliquid, eveniet numquam aperiam ullam illo. Est rerum similique quae aliquid, odit eum veniam provident magnam, odio laborum in molestiae obcaecati non quaerat voluptates tempore distinctio dolor nobis sunt repellat. Nobis nulla non assumenda voluptatum dolore aut asperiores inventore illum, mollitia dignissimos ex natus labore officiis repellendus quis, minus ullam voluptatem iure. Saepe id expedita esse rerum ad sequi obcaecati eius placeat incidunt eaque laboriosam dolor fugiat quam asperiores aperiam eligendi omnis, alias maxime fuga est pariatur inventore. Deserunt obcaecati adipisci molestiae? Voluptatibus dolores laboriosam veritatis assumenda deleniti unde modi mollitia, harum animi cupiditate obcaecati labore saepe, sint eum molestiae vero omnis provident? Ipsam at nobis suscipit omnis, sint facere, vero repellendus officiis ea rem harum animi nostrum quos ullam exercitationem aspernatur aut totam maxime non aliquam? Porro dolore, inventore eligendi mollitia natus officia, ipsa explicabo, adipisci incidunt illum numquam eos recusandae sequi ex architecto molestiae. Sequi consequatur deserunt provident facilis et illo. Ea ratione tempore libero eveniet qui, omnis similique sapiente, nihil, optio natus doloremque asperiores veritatis fugiat eos recusandae fuga totam impedit quos est laboriosam architecto nam explicabo? Sequi ex porro dignissimos iste veniam earum non mollitia odit fugit, eius temporibus, velit ratione, quasi corrupti dicta adipisci quod? Iure nemo odio inventore nostrum dolor enim omnis accusantium, itaque alias numquam, accusamus voluptatem illum, quo repellat eos impedit molestias sed et iste harum repudiandae maiores! Doloremque, rem ratione magnam illum impedit sapiente laudantium illo! Quo impedit praesentium molestias at nihil quas suscipit asperiores, nisi eum totam commodi repellat saepe, architecto, voluptas nulla corporis? Beatae natus quasi iusto magni nulla non, reprehenderit labore tempora amet odit? Autem obcaecati aspernatur voluptas labore veniam, corrupti doloribus! Consequatur quibusdam sunt ducimus autem, earum aperiam nesciunt magni quidem sapiente deleniti dolorum quod, dicta necessitatibus? Voluptates et consequatur ea ratione aspernatur illo error, tempore reiciendis dolore officia doloribus nihil explicabo? Nulla, veniam optio mollitia hic maiores sapiente nostrum porro aliquam deserunt ut corporis ratione quisquam dolorem ad! Nihil recusandae exercitationem, veritatis rerum id iure explicabo pariatur optio et quae repellendus numquam sit voluptatum facere. Ab similique quos explicabo accusantium deserunt inventore, in soluta accusamus, error veritatis, nobis ipsa harum.
              </div>

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

          {/* <div className={styles.comments}>
            
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
                    <img src="" alt="" />
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

                    <div
                      className={styles.userNameSpace}
                      onClick={(e) => e.stopPropagation()}
                    >
                      &nbsp;
                    </div>

                  </div>
                  
                </div>

                <div className={styles.commentContent}>
                  {comment.content}
                </div>

              </div>
            ))}
            
          </div> */}

        </section>

        {community && (
          <aside className={styles.widgetSection}>
            <div className={styles.widget}>
              <CommunityWidget 
                community={community}
                currentPage={'post'}
              />
            </div>
          </aside>      
        )}

      </div>
    </>
  );
}

export default Post;