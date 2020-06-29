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
  const [spaceData, setSpaceData] = useState({});
  const [space, setSpace] = useState({});
  const [spaceErrorMessage, setSpaceErrorMessage] = useState('');
  const { setValue } = useContext(SpaceContext);
  // useLocation récupère la data passée dans le Link
  const spaceLocation = useLocation();
  const { user } = useContext(UserContext);
  const [values, handleChange] = useForm();

  useEffect(() => {
    getSpaceMemoryData();
  }, []);

  async function getSpaceMemoryData() {
    // const resultat = await SpaceService.focusSpace(spaceLocation.state.id);
    const resultat = await SpaceService.focusSpace(spaceLocation.state.id);
    console.log(resultat);
    if (resultat.status) {
      console.log(SpaceService.errorMessageSpace(resultat.status));
      setSpaceErrorMessage(SpaceService.errorMessageSpace(resultat.status));
    } else {
      setSpaceData(resultat);
      setSpace(resultat.space);
      setValue(resultat);
    }
  }

  async function createPost(event) {
    event.preventDefault();
    const data = toFormData(values);
    await PostService.createPost(spaceLocation.state.id, data);
    getSpaceMemoryData();
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
        {console.log(spaceData.posts)}
        {console.log(space.firstName)}
      </p>
      {JSON.stringify(space.createdBy) === JSON.stringify(user) ? (
        <Link
          to={{
            pathname: `/space/${space.firstName}-${space.lastName}-${spaceLocation.state.id}/settings/general`,
            state: { id: `${spaceLocation.state.id}` },
          }}
        >
          Settings
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
      {spaceData.posts &&
        spaceData.posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}

export default SpaceMemoryPage;
