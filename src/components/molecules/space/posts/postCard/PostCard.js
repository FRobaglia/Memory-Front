import React from 'react';

function PostCard(post) {
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
    </div>
  );
}

export default PostCard;
