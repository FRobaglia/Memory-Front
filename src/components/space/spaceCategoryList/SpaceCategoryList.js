import React, { useState, useEffect } from 'react';
import SpaceService from '../../../services/SpaceService';
import SpaceCard from '../spaceCard/SpaceCard';
import ArrowIcon from '../../../assets/svg/icons/icon-arrow-left.svg';
import './_spaceCategoryList.scss';

function SpaceCategoryList({
  showSpaces,
  setShowSpaces,
  spaceCategoryTitle,
  spaceCategoryName,
}) {
  const [userSpaces, setUserSpaces] = useState([]);
  let noSpaceMessage;

  useEffect(() => {
    getSpaces();
  }, []);

  async function getSpaces() {
    const data = await SpaceService.getUserSpaces('spaces');
    switch (spaceCategoryName) {
      case 'manager':
        setUserSpaces(data.manager);
        break;
      case 'subscriber':
        setUserSpaces(data.subscriber);
        break;
      case 'waiting':
        setUserSpaces(data.waiting);
        break;

      default:
        setUserSpaces(data.subscriber);
    }
    return userSpaces;
  }
  if (userSpaces && userSpaces.length === 0) {
    noSpaceMessage = "Vous n'êtes membre d'aucun espace.";
  }

  return (
    <>
      <div
        className="space-category"
        onClick={() =>
          showSpaces ? setShowSpaces(false) : setShowSpaces(true)
        }
        role="button"
        tabIndex="0"
        onKeyPress={() =>
          showSpaces ? setShowSpaces(false) : setShowSpaces(true)
        }
      >
        <p>{spaceCategoryTitle}</p>
        <img
          src={ArrowIcon}
          alt="arrow icon to show category"
          style={{ transform: showSpaces && 'rotate(-90deg)' }}
        />
      </div>
      {noSpaceMessage}
      {showSpaces &&
        userSpaces &&
        userSpaces.map((space) => (
          <SpaceCard
            key={space.space.id}
            space={space.space}
            role={space.role.role}
            noSpaceMessage={noSpaceMessage}
          />
        ))}
    </>
  );
}

export default SpaceCategoryList;
