import React from 'react';
import UploadInput from '../../utilsTemplates/UploadInput/UploadInput';
import CommentService from '../../../services/CommentService';
import PostService from '../../../services/PostService';
import { useForm, toFormData } from '../../../utils/forms';
import UploadCommentImage from '../../../assets/svg/icons/icon-comment-image-upload.svg';
import TrashIcon from '../../../assets/svg/icons/icon-trash.svg';

function Comment({ user, post, comments, setComments }) {
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
    }
  }

  return (
    <div className="souvenir__commentaire--block">
      {comments.map((comment) => (
        <div className="souvenir__commentaire" key={comment.id}>
          <div
            className="souvenir__commentaire--author-image"
            style={{
              backgroundImage: `url(${comment.createdBy.image.url})`,
            }}
          />
          <div className="souvenir__commentaire--box">
            <div className="souvenir__commentaire--head">
              <p className="souvenir__commentaire--author">
                {comment.createdBy.firstName} {comment.createdBy.lastName}
              </p>
              {console.log(comment.image)}
              {comment.createdBy.id === user.id && (
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  <img src={TrashIcon} alt="" />
                </button>
              )}
            </div>
            <p className="souvenir__commentaire--text">{comment.text} </p>
            {comment.image && <img src={comment.image.url} alt="comment pic" />}
          </div>
        </div>
      ))}
      <form
        className="souvenir__commentaire--form"
        method="post"
        onSubmit={addComment}
      >
        <UploadInput
          labelImg={UploadCommentImage}
          specificFieldName="commentImage"
          handleChange={(e) => {
            handleChange(e);
          }}
        />
        <div className="image-preview">
          {values.commentImage && (
            <img
              src={URL.createObjectURL(values.commentImage)}
              alt="commentpic"
              width="100"
              height="100"
              className=""
            />
          )}
          <label htmlFor="text">
            <textarea
              placeholder="Super photo... !"
              required
              name="text"
              id="text"
              onChange={handleChange}
              value={values.text || ''}
            />
          </label>
        </div>
        <input type="submit" value="" />
      </form>
    </div>
  );
}

export default Comment;
