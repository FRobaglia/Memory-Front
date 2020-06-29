import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SpaceContext from '../context/SpaceContext';
import SpaceService from '../services/SpaceService';
import StorageService from '../services/StorageService';
import UserContext from '../context/UserContext';
import { useForm, toFormData } from '../utils/forms';
import PostService from '../services/PostService';
import PostCard from '../components/space/posts/postCard/PostCard';

function SpaceMemoryPage() {
  // const [spaceID, setSpaceID] = useState();
  const [spaceData, setSpaceData] = useState({});
  const [space, setSpace] = useState({});
  const [spaceErrorMessage, setSpaceErrorMessage] = useState('');
  const { setValue } = useContext(SpaceContext);
  // useLocation récupère la data passée dans le Link
  const { user } = useContext(UserContext);
  const [postValues, handlePostChange] = useForm();

  const spaceId = window.location.href.substring(
    window.location.href.lastIndexOf('-') + 1
  );

  useEffect(() => {
    getSpaceMemoryData();
  }, []);

  async function getSpaceMemoryData() {
    const resultat = await SpaceService.focusSpace(spaceId);
    console.log(resultat);
    if (resultat.status) {
      console.log(SpaceService.errorMessageSpace(resultat.status));
      setSpaceErrorMessage(SpaceService.errorMessageSpace(resultat.status));
    } else {
      setSpaceData(resultat);
      setSpace(resultat.space);
      setValue(resultat);
      StorageService.setObjectStorage('spaceInfos', resultat);
    }
  }

  async function createPost(event) {
    event.preventDefault();
    const data = toFormData(postValues);
    await PostService.createPost(spaceId, data);
    getSpaceMemoryData();
  }

  async function deletePost(id, index) {
    await PostService.deletePost(id);
    // postsData.splice(index, 1);
    // setPostsData([...postsData]);
  }

  if (spaceErrorMessage) {
    return (
      <div>
        <p>Pas cool</p>
        <p>{spaceErrorMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <p>
        Bienvenu dans l'espace de {space.firstName} {space.lastName}
      </p>
      {JSON.stringify(space.createdBy) === JSON.stringify(user) ? (
        <Link
          to={{
            pathname: `/space/${space.firstName}-${space.lastName}-${spaceId}/settings/general`,
            state: { id: `${spaceId}` },
          }}
        >
          <button type="button">Settings</button>
        </Link>
      ) : (
        ''
      )}
      <form action="/" method="post" onSubmit={createPost}>
        <label htmlFor="content">
          <input
            type="textarea"
            name="text"
            id="content"
            value={postValues.text || ''}
            onChange={handlePostChange}
          />
        </label>
        <button type="submit">poster un souvenir</button>
      </form>
      {spaceData.posts &&
        spaceData.posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            index={index}
            deletePost={deletePost}
          />
        ))}
    </div>
  );
}

export default SpaceMemoryPage;
