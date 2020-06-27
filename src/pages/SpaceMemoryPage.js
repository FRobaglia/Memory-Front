import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import SpaceContext from '../context/SpaceContext';
import SpaceService from '../services/SpaceService';

function SpaceMemoryPage() {
  // const [spaceID, setSpaceID] = useState();
  const [spaceData, setSpaceData] = useState([]);
  const [subscribersData, setSubscribersData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [spaceErrorMessage, setSpaceErrorMessage] = useState('');
  const { setValue } = useContext(SpaceContext);
  // useLocation récupère la data passée dans le Link
  const spaceLocation = useLocation();

  function handleMemoryData(obj) {
    const spaceInfos = Object.entries(obj);
    spaceInfos.forEach(([key, element]) => {
      // console.log(`${key}: ${element}`);
      if (key !== 'posts') {
        if (key === 'space') {
          // Space infos - Object of objects
          const spaceDataArray = [];
          Object.keys(element).map((spaceItem) => {
            spaceDataArray.push(element[spaceItem]);
          });
          setSpaceData(spaceDataArray);
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
      <p>Bienvenu dans l'espace de Madame {spaceData[3]}</p>
    </div>
  );
}

export default SpaceMemoryPage;
