import React, { useContext, useState } from 'react';
import UserContext from '../../../../context/UserContext';
import UploadInput from '../../../UploadInput';
import { useForm, toFormData } from '../../../../utils/forms';
import CommentService from '../../../../services/CommentService';
import PostService from '../../../../services/PostService';
import SpaceService from '../../../../services/SpaceService';

function PostCard({ post, index, deletePost }) {
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
  }

  async function refreshComments() {
    const refreshedPost = await PostService.getPost(post.id);
    if (refreshedPost && refreshedPost.comments)
      setComments(refreshedPost.comments);
  }

  return (
    <div style={{ border: '1px solid black' }}>
      {post.img && <img src={post.img} alt="post img" />}
      <h1>{post.title || 'souvenir sans titre'}</h1>
      <p>{post.text}</p>

      <div>
        <p style={{ display: 'inline-block' }}>
          Ecrit par {post.createdBy.firstName} {post.createdBy.lastName}
          &nbsp;&nbsp;
        </p>
        <img
          src={post.createdBy.image.url}
          width="40px"
          height="40px"
          alt="profile pic of author"
        />
      </div>
      <button type="button" onClick={() => setShowCommentInput(true)}>
        Ajouter un commentaire
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
