import React, { useContext } from 'react';
import UserContext from '../../../../context/UserContext';

function PostCard({ post, index, deletePost }) {
  const { user } = useContext(UserContext);
  return (
    <div>
      {post.img && <img src={post.img} alt="post img" />}
      <h1>{post.title}</h1>
      <p>{post.text}</p>

      <div>
        <img
          src={post.createdBy.image.url}
          style={{ width: '40px' }}
          {...{ height: '40px' }}
          alt="profile pic of author"
        />
        <p>
          {post.createdBy.firstName} {post.createdBy.lastName}
        </p>
      </div>
      {user.id === post.createdBy.id ? (
        <button type="button" onClick={() => deletePost(post.id, index)}>
          Supprimer le post
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

export default PostCard;
