import React, { useContext, useState } from 'react';
import UserContext from '../../../../context/UserContext';
import UploadInput from '../../../utilsTemplates/UploadInput/UploadInput';
import { useForm, toFormData } from '../../../../utils/forms';
import CommentService from '../../../../services/CommentService';
import PostService from '../../../../services/PostService';

function PostCard({ post, index, deletePost, subscribers }) {
  const { user } = useContext(UserContext);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [values, handleChange] = useForm();

  async function addComment(e) {
    e.preventDefault();
    const data = toFormData(values);
    await CommentService.createComment(post.id, data);
    refreshComments();
  }

  async function deleteComment(id) {
    await CommentService.deleteComment(id);
    refreshComments();
  }

  async function refreshComments() {
    const refreshedPost = await PostService.getPost(post.id);
    if (refreshedPost.post) {
      setComments(refreshedPost.post.comments);
      setShowCommentInput(false);
    }
  }

  return (
    <div className="boxPuzzel boxPuzzel__souvenir">
      <h1 className="souvenir__headline">{post.title}</h1>
      <p className="souvenir__text">{post.text}</p>
      {post.images &&
        post.images.map((image) => (
          <img
            src={image.url}
            key={image.id}
            alt="post img"
            className="souvenir__image"
            width="40px"
            height="40px"
          />
        ))}
      {post.link && <a href={post.link}>Lien</a>}
      <div className="authorBox">
        <img
          src={post.createdBy.image.url}
          width="40px"
          height="40px"
          alt="profile pic of author"
          className="authorBox__image"
        />
        <p className="authorBox__name">
          Ecrit par {post.createdBy.firstName} {post.createdBy.lastName}
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
      <button
        type="button"
        className="souvenir__commentairLink"
        onClick={() => setShowCommentInput(true)}
      >
        {comments.length >= 1
          ? `${comments.length} Commentaires`
          : 'Pas encore de commentaires'}
      </button>
      {user.id === post.createdBy.id ? (
        <button type="button" onClick={() => deletePost(post.id, index)}>
          Supprimer le post
        </button>
      ) : (
        ''
      )}
      <h3>Commentaires :</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          <strong> {comment.text} </strong>
          <em>
            écrit par {comment.createdBy.firstName} {comment.createdBy.lastName}
          </em>
          {comment.createdBy.id === user.id ? (
            <button
              type="button"
              onClick={() => {
                deleteComment(comment.id);
              }}
            >
              Supprimer mon commentaire
            </button>
          ) : (
            ''
          )}
        </div>
      ))}
      {showCommentInput && (
        <form method="post" onSubmit={addComment}>
          <UploadInput
            labelText="Ajouter une image"
            specificFieldName="commentImage"
            handleChange={handleChange}
          />
          <label htmlFor="text">
            Texte de mon commentaire :
            <textarea
              placeholder="Super photo... !"
              required
              name="text"
              id="text"
              onChange={handleChange}
              value={values.text || ''}
            />
          </label>
          <input type="submit" value="ajouter mon commentaire" />
        </form>
      )}
    </div>
  );
}

export default PostCard;
