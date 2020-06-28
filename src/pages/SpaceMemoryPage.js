import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SpaceContext from '../context/SpaceContext';
import SpaceService from '../services/SpaceService';
import UserContext from '../context/UserContext';
import { useForm, toFormData } from '../utils/forms';
import PostService from '../services/PostService';
import PostCard from '../components/molecules/postCard/PostCard';

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
      // console.log(`${key}: ${element}`);
      if (key !== 'posts') {
        if (key === 'space') {
          // Space infos - Object of objects
          // const spaceDataArray = [];
          // Object.keys(element).map((spaceItem) => {
          //   spaceDataArray.push(element[spaceItem]);
          // });
          // setSpaceData(spaceDataArray);
          listPosts(element);
          setValue(element);
        } else {
          // Subscribers infos - Array of object
          const subscribersArray = [];
          element.map((el) => subscribersArray.push(el));
          setSubscribersData(subscribersArray);
        }
      } else {
        // Posts infos - Array
        const postsArray = [];
        element.map((post) => postsArray.push(post));
        setPostsData(postsArray);
      }
    });
  }
  function listPosts(element) {
    const spaceDataArray = [];
    Object.keys(element).map((spaceItem) => {
      spaceDataArray.push(element[spaceItem]);
    });
    setSpaceData(spaceDataArray);
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

  if (spaceErrorMessage) {
    return (
      <div>
        <p>Pas cool</p>
        <p>{spaceErrorMessage}</p>
      </div>
    );
  }
  console.log(postsData);
  return (
    <div>
      <p>
        Bienvenu dans l'espace de {spaceData[3]}
        {spaceData[7]}
      </p>
      {JSON.stringify(spaceData[9]) === JSON.stringify(user) ? (
        <Link
          to={{
            pathname: `/spaces/space/${spaceData[3]}-${spaceData[7]}-${spaceLocation.state.id}/settings`,
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
        postsData.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}

export default SpaceMemoryPage;
