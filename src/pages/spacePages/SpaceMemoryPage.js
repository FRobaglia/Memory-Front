import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SpaceService from '../../services/SpaceService';
import UserContext from '../../context/UserContext';
import SpaceContext from '../../context/SpaceContext';
import { useForm, toFormData } from '../../utils/forms';
import PostService from '../../services/PostService';
import UploadInput from '../../components/utilsTemplates/UploadInput/UploadInput';
import PostCard from '../../components/space/posts/postCard/PostCard';
import '../../styles/pages/_space.scss';
import IconSettings from '../../assets/svg/icons/icon-settings.svg';
import IconMembers from '../../assets/svg/icons/icon-members.svg';
import IconBack from '../../assets/svg/icons/icon-arrow-left.svg';
import EndPartContainer from '../../components/utilsTemplates/endPartContainer/EndPartContainer';
import ErrorImage from '../../assets/svg/door-guy.svg';
import JoinSpace from '../../components/space/joinSpace/JoinSpace';

function SpaceMemoryPage() {
  const [spaceData, setSpaceData] = useState({});
  const [space, setSpace] = useState({});
  const [showInvitedUserButton, setInvitedUserButton] = useState();
  const [showSubscriberButton, setSubscriberButton] = useState();
  const [spaceErrorMessage, setSpaceErrorMessage] = useState('');
  const [messageButton, setMessageButton] = useState(
    "Demander l'accès a cet espace"
  );
  const { user } = useContext(UserContext);
  const { setValue } = useContext(SpaceContext);
  const spaceId = window.location.href.substring(
    window.location.href.lastIndexOf('-') + 1
  );

  useEffect(() => {
    getSpaceMemoryData();
  }, []);

  async function getSpaceMemoryData() {
    const resultat = await SpaceService.focusSpace(spaceId);
    if (resultat.status === 'SPACE_NOT_VALIDATED') {
      setSpaceErrorMessage(SpaceService.errorMessageSpace(resultat.status));
    }
    switch (resultat) {
      case 'SPACE_NOT_SUBSCRIBED':
        setInvitedUserButton(false);
        setSubscriberButton(true);
        setSpaceErrorMessage(SpaceService.errorMessageSpace(resultat));
        break;
      case 'SPACE_SUBSCRIBED_WAITING':
        setSpaceErrorMessage(SpaceService.errorMessageSpace(resultat));
        break;
      case 'SPACE_INVITATION_WAITING':
        setMessageButton("Accéder à l'espace");
        setInvitedUserButton(true);
        setSubscriberButton(false);
        setSpaceErrorMessage(SpaceService.errorMessageSpace(resultat));
        break;
      default:
        setSpaceData(resultat);
        setSpace(resultat.space);
        setValue(resultat.space);
        break;
    }
  }

  async function deletePost(id) {
    await PostService.deletePost(id);
    getSpaceMemoryData();
  }

  // Unenable space memory
  if (spaceErrorMessage && !showInvitedUserButton && !showSubscriberButton) {
    return (
      <EndPartContainer
        endMessage={spaceErrorMessage}
        endImage={ErrorImage}
        endButtonLink="/account"
        endButtonText="Revenir a mes espaces"
      />
    );
  }
  if ((spaceErrorMessage && showInvitedUserButton) || showSubscriberButton) {
    // SUBSCRIBERS
    return (
      <JoinSpace
        spaceId={spaceId}
        spaceErrorMessage={spaceErrorMessage}
        showSubscriberButton={showSubscriberButton}
        showInvitedUserButton={showInvitedUserButton}
        messageButton={messageButton}
      />
    );
  }
  return (
    <div className="body--espace">
      <Link
        to={{
          pathname: `/space/${space.firstName}-${space.lastName}-${space.id}/createPost`,
          state: { space },
        }}
        type="button"
        className="button button--addSouvenir"
      >
        +{' '}
        <svg
          width="17"
          height="13"
          viewBox="0 0 17 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9492 4.31359e-07C11.9492 0.132394 11.9492 0.234237 11.9492 0.336078C11.9492 1.72621 11.9492 3.11633 11.9492 4.50646C11.9492 5.04113 12.1788 5.3161 12.6755 5.3823C13.1347 5.4434 13.5096 5.26009 13.8564 4.94438C14.9154 3.9718 16.5602 4.51156 16.9303 5.94751C17.1506 6.80807 16.8366 7.72464 16.1572 8.22366C15.4636 8.73286 14.5827 8.68194 13.9079 8.132C13.6689 7.9385 13.3971 7.77047 13.1207 7.67372C12.9285 7.60752 12.6849 7.64317 12.4834 7.69918C12.0616 7.82648 11.9539 8.00979 11.9539 8.48845C11.9539 9.88876 11.9539 11.284 11.9539 12.6843C11.9539 12.7861 11.9539 12.8829 11.9539 13C7.95675 13 3.98306 13 0 13C-1.89193e-07 8.67176 -3.77942e-07 4.3537 -5.6758e-07 0.0152769C0.0890325 0.0101852 0.168694 0.00509547 0.243669 0.00509547C1.55574 0.00509541 2.86312 0.0101851 4.17518 7.71171e-07C4.40479 7.61135e-07 4.49851 0.101844 4.54537 0.31571C4.64378 0.723074 4.48446 1.03878 4.25953 1.33921C3.6363 2.17431 3.50509 3.10106 3.9362 4.06855C4.35325 5.00549 5.07957 5.49432 6.04019 5.47904C6.99144 5.46377 7.69902 4.95966 8.09732 4.02781C8.505 3.08069 8.36911 2.1794 7.77399 1.36467C7.5725 1.0897 7.41318 0.809637 7.44598 0.448102C7.47878 0.106934 7.57718 0.0101859 7.88646 0.0101859C9.14229 0.0101858 10.3981 0.0101857 11.654 0.0101857C11.743 1.39405e-06 11.8367 4.36275e-07 11.9492 4.31359e-07Z"
            fill="white"
          />
        </svg>
      </Link>
      <div className="header header--espace header--centered">
        <div className="nav nav--espace">
          <Link to="/account">
            <img className="icon-left-corner" src={IconBack} alt="icon back" />
          </Link>
          {space.createdBy && space.createdBy.id === user.id ? (
            <Link
              to={{
                pathname: `/space/${space.firstName}-${space.lastName}-${space.id}/settings/`,
                state: { id: `${spaceId}` },
              }}
            >
              <img
                className="icon-right-corner"
                src={IconSettings}
                alt="icon settings"
              />
            </Link>
          ) : (
            <Link
              to={{
                pathname: `/space/${space.firstName}-${space.lastName}-${space.id}/members`,
                state: { id: `${spaceId}` },
              }}
            >
              <img
                className="icon-right-corner"
                src={IconMembers}
                alt="icon membres"
              />
            </Link>
          )}
        </div>

        <div className="espace__hero">
          <div className="espace__hero__image">
            {space.image && <img src={space.image.url} alt="" />}
          </div>
          <p className="espace__hero__text">En memoire de</p>
          <div className="espace__hero__name">
            {space.firstName} {space.lastName}
          </div>
        </div>
      </div>

      <main>
        {spaceData.posts &&
          spaceData.posts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              subscribers={spaceData.subscribers}
              deletePost={deletePost}
            />
          ))}
      </main>
    </div>
  );
}

export default SpaceMemoryPage;
