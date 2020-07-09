import React, { useContext, useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import UserContext from '../../../context/UserContext';
// import UploadInput from '../../utilsTemplates/UploadInput/UploadInput';
// import { useForm, toFormData } from '../../../utils/forms';
// import CommentService from '../../../services/CommentService';
// import PostService from '../../../services/PostService';
import 'react-awesome-slider/dist/styles.css';
// import UploadCommentImage from '../../../assets/svg/icons/icon-comment-image-upload.svg';
import ArrowIcon from '../../../assets/svg/icons/icon-arrow-left.svg';
import TrashIcon from '../../../assets/svg/icons/icon-trash.svg';
import Comments from '../comment/Comment';

function PostCard({ post, index, deletePost, subscribers }) {
  const { user } = useContext(UserContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);
  // const [values, handleChange] = useForm();

  function showPostOnLoad() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0px)';
          }
        });
      },
      { rootMargin: '0px 0px -30% 0px' }
    );
    document.querySelectorAll('.boxPuzzel__souvenir').forEach((souvenir) => {
      observer.observe(souvenir);
    });
  }
  showPostOnLoad();

  return (
    <div className="boxPuzzel boxPuzzel__souvenir">
      {user.id === post.createdBy.id && (
        <button
          type="button"
          className="delete-button delete-button--souvenir"
          onClick={() => deletePost(post.id, index)}
        >
          <img src={TrashIcon} alt="" />
        </button>
      )}
      {post.images.length >= 1 && (
        <AwesomeSlider bullets={false} className="souvenir__image">
          {post.images.map((image) => (
            <div key={image.id}>
              <img src={image.url} alt="post img" />
            </div>
          ))}
        </AwesomeSlider>
      )}
      <h1 className="souvenir__headline">{post.title}</h1>
      <p className="souvenir__text">{post.text}</p>

      {post.link && (
        <a href={post.link} className="button souvenir__button">
          Lien vers {post.title}
        </a>
      )}
      <div className="authorBox">
        <div
          className="authorBox__image"
          style={{ backgroundImage: `url(${post.createdBy.image.url})` }}
        />
        <p className="authorBox__name">
          {post.createdBy.firstName} {post.createdBy.lastName}
        </p>
        {subscribers.map(
          (subscriber) =>
            JSON.stringify(post.createdBy) ===
              JSON.stringify(subscriber.user) && (
              <p className="authorBox__role" key={post.createdBy.id}>
                {subscriber.relationDefunct}
              </p>
            )
        )}
      </div>
      <div
        className="souvenir__commentaire--Link"
        onClick={() =>
          showComments ? setShowComments(false) : setShowComments(true)
        }
        role="button"
        tabIndex="0"
        onKeyPress={() =>
          showComments ? setShowComments(false) : setShowComments(true)
        }
      >
        <p>
          {comments.length >= 1
            ? `${comments.length} Commentaires`
            : 'Pas encore de commentaires'}
        </p>
        <img
          src={ArrowIcon}
          alt="arrow icon to show comments"
          style={{ transform: showComments && 'rotate(90deg)' }}
        />
      </div>

      {showComments && (
        <Comments
          user={user}
          post={post}
          comments={comments}
          setComments={setComments}
        />
      )}
    </div>
  );
}

export default PostCard;
