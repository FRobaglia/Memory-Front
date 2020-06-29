import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SpaceContext from '../context/SpaceContext';
import SpaceService from '../services/SpaceService';
import UserContext from '../context/UserContext';
import { useForm, toFormData } from '../utils/forms';
import PostService from '../services/PostService';
import PostCard from '../components/space/posts/postCard/PostCard';

function SpaceMemoryPage() {
  // const [spaceID, setSpaceID] = useState();
  const [spaceData, setSpaceData] = useState([]);
  const [subscribersData, setSubscribersData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [spaceErrorMessage, setSpaceErrorMessage] = useState('');
  const { setValue } = useContext(SpaceContext);
  // useLocation récupère la data passée dans le Link
  const spaceLocation = useLocation();
  const { user } = useContext(UserContext);
  const [values, handleChange] = useForm();

  function handleMemoryData(obj) {
    const spaceInfos = Object.entries(obj);
    spaceInfos.forEach(([key, element]) => {
      switch (key) {
        case 'posts':
          setPostsData(element);
          break;
        case 'subscribers':
          setSubscribersData(element);
          break;
        default:
          setSpaceData(element);
          setValue(element);
      }
    });
  }

  useEffect(() => {
    async function getSpaceMemoryData() {
      const resultat = await SpaceService.focusSpace(spaceLocation.state.id);
      console.log(resultat);
      if (resultat.status) {
        console.log(SpaceService.errorMessageSpace(resultat.status));
        setSpaceErrorMessage(SpaceService.errorMessageSpace(resultat.status));
      } else {
        handleMemoryData(resultat);
      }
    }
    getSpaceMemoryData();
  }, []);

  async function createPost(event) {
    event.preventDefault();
    const data = toFormData(values);
    await PostService.createPost(spaceLocation.state.id, data);
    // listPosts();
  }

  async function deletePost(id, index) {
    await PostService.deletePost(id);
    postsData.splice(index, 1);
    setPostsData([...postsData]);
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
        Bienvenu dans l'espace de {spaceData.firstName} {spaceData.lastName}
        {console.log(postsData)}
      </p>
      {JSON.stringify(spaceData.createdBy) === JSON.stringify(user) ? (
        <Link
          to={{
            pathname: `/space/${spaceData.firstName}-${spaceData.lastName}-${spaceLocation.state.id}/settings`,
            state: { id: `${spaceLocation.state.id}` },
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
            value={values.text || ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit">poster un souvenir</button>
      </form>
      {postsData &&
        postsData.map((post, index) => (
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
