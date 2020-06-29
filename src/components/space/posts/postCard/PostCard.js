import React, { useContext } from 'react';
import UserContext from '../../../../context/UserContext';

function PostCard(post, index, deletePost) {
  const { user } = useContext(UserContext);
  return (
    <div>
      {post.post.img && <img src={post.post.img} alt="post img" />}
      <h1>{post.post.title}</h1>
      <p>{post.post.text}</p>

      <div>
        <img
          src={post.post.createdBy.image.url}
          style={{ width: '40px' }}
          {...{ height: '40px' }}
          alt="profile pic of author"
        />
        <p>
          {post.post.createdBy.firstName} {post.post.createdBy.lastName}
        </p>
      </div>
      {user.id === post.post.createdBy.id ? (
        <button type="button" onClick={() => deletePost(post.post.id, index)}>
          Supprimer le post
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

export default PostCard;
