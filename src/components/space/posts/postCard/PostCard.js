import React, { useContext } from 'react';
import UserContext from '../../../../context/UserContext';

function PostCard({ post, index, deletePost }) {
  const { user } = useContext(UserContext);
  console.log(post);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      {post.images &&
        post.images.map((image) => (
          <img
            src={image.url}
            alt="post img"
            style={{ width: '40px' }}
            {...{ height: '40px' }}
          />
        ))}
      {post.link && <a href={post.link}>Lien</a>}
      <div>
        <img
          src={post.createdBy.image.url}
          alt="profile pic of author"
          style={{ width: '40px' }}
          {...{ height: '40px' }}
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
