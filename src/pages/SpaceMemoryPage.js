import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import SpaceContext from '../context/SpaceContext';
import SpaceService from '../services/SpaceService';

function SpaceMemoryPage() {
  // const [spaceID, setSpaceID] = useState();
  const [spaceData, setSpaceData] = useState([]);
  const [subscribersData, setSubscribersData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const { value, setValue } = useContext(SpaceContext);
  // useLocation récupère la data passée dans le Link
  const spaceLocation = useLocation();

  function handleMemoryData(obj) {
    const spaceInfos = Object.entries(obj);
    spaceInfos.forEach(([key, element]) => {
      // console.log(`${key}: ${element}`);
      if (key !== 'posts') {
        if (key === 'space') {
          // Space infos
          const spaceDataArray = [];
          Object.keys(element).map((spaceItem) => {
            spaceDataArray.push(element[spaceItem]);
          });
          setSpaceData(spaceDataArray);
        } else {
          // Subscribers infos
          const subscribersArray = [];
          element.map((el) => subscribersArray.push(el));
          setSubscribersData(subscribersArray);
        }
      } else {
        // Posts infos
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
      handleMemoryData(resultat);
    }
    getSpaceMemoryData();
  }, []);

  if (spaceData) {
    return (
      <div>
        <p>Bienvenu dans l'espace de Madame {spaceData[3]}</p>
      </div>
    );
  }
  return <p>Merci de patienter...</p>;
}

export default SpaceMemoryPage;
