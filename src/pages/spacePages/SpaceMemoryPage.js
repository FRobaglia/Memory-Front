import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SpaceService from '../../services/SpaceService';
import UserContext from '../../context/UserContext';
import SpaceContext from '../../context/SpaceContext';
import { useForm, toFormData } from '../../utils/forms';
import PostService from '../../services/PostService';
import PostCard from '../../components/space/posts/postCard/PostCard';
import UploadInput from '../../components/utilsTemplates/UploadInput/UploadInput';

function SpaceMemoryPage() {
  const [requestAccessValues, handlerequestAccessChange] = useForm();
  const [spaceData, setSpaceData] = useState({});
  const [space, setSpace] = useState({});
  const [showInvitedUserButton, setInvitedUserButton] = useState();
  const [showSubscriberButton, setSubscriberButton] = useState();
  const [spaceErrorMessage, setSpaceErrorMessage] = useState('');
  const [messageButton, setMessageButton] = useState(
    "Demander l'accès a cet espace"
  );
  const [isUserAlreadyRequestAccess, setUserAlreadyRequestAccess] = useState(
    false
  );
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const { user } = useContext(UserContext);
  const { setValue } = useContext(SpaceContext);
  const [showPostFields, setShowPostFields] = useState({
    title: false,
    image: false,
    video: false,
    link: false,
  });
  const [postValues, handlePostChange, deleteFile] = useForm();
  const spaceId = window.location.href.substring(
    window.location.href.lastIndexOf('-') + 1
  );

  useEffect(() => {
    getSpaceMemoryData();
  }, []);

  async function getSpaceMemoryData() {
    const resultat = await SpaceService.focusSpace(spaceId);
    // to refactor with elsif
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

  async function createPost(event) {
    event.preventDefault();
    // setPostValues({ imagesFiles: [] });
    const data = toFormData(postValues);
    await PostService.createPost(spaceId, data);
    getSpaceMemoryData();
  }

  async function deletePost(id) {
    await PostService.deletePost(id);
    getSpaceMemoryData();
  }

  async function sendRequestAccess(event) {
    event.preventDefault();
    const data = toFormData(requestAccessValues);
    const result = await SpaceService.subcribeToSpace(spaceId, data);
    console.log('rt', result);
    if (result === 'USER_ALREADY_REQUEST_SUBSCRIPTION') {
      setUserAlreadyRequestAccess(true);
      setSubscribeMessage('');
    } else {
      setSubscribeMessage('Votre demande a bien été envoyé');
    }
  }

  // Unenable space memory
  if (spaceErrorMessage && !showInvitedUserButton && !showSubscriberButton) {
    return (
      <div>
        <p>Pas cool</p>
        <p>{spaceErrorMessage}</p>
        <Link to="/account">Mon compte personnel</Link>
      </div>
    );
  }
  if ((spaceErrorMessage && showInvitedUserButton) || showSubscriberButton) {
    return (
      <div>
        <p>{spaceErrorMessage}</p>
        <form method="post" onSubmit={sendRequestAccess}>
          <label htmlFor="requestAccess">
            Relation avec le/la défunt
            <input
              type="text"
              name="relationDefunctText"
              id="relationDefunctText"
              value={requestAccessValues.relationDefunctText || ''}
              onChange={handlerequestAccessChange}
            />
          </label>
          {showSubscriberButton && ( // SUBSCRIBER BUTTON
            <>
              <button type="submit">{messageButton}</button>
              {subscribeMessage && <p>{subscribeMessage}</p>}
              <Link to="/account">Mon compte personnel</Link>
            </>
          )}
          {showInvitedUserButton && ( // INVITED BUTTON
            <button
              type="submit"
              onClick={() =>
                setTimeout(() => {
                  window.location.reload(false);
                }, 2000)
              }
            >
              {messageButton}
            </button>
          )}
        </form>
        {isUserAlreadyRequestAccess && (
          <p>
            Vous avez déjà fait la demande pour accéder à cet espace. L'espace
            sera accessible une fois votre demande acceptée.
          </p>
        )}
      </div>
    );
  }
  // Space memory fetch
  return (
    <div>
      <p>
        Bienvenu dans l'espace de {space.firstName} {space.lastName}
      </p>
      {JSON.stringify(space.createdBy) === JSON.stringify(user) ? (
        <Link
          to={{
            pathname: `/space/${space.firstName}-${space.lastName}-${space.id}/settings/general`,
            state: { id: `${spaceId}` },
          }}
        >
          <button type="button">Parametres</button>
        </Link>
      ) : (
        <Link
          to={{
            pathname: `/space/${space.firstName}-${space.lastName}-${space.id}/members`,
            state: { id: `${spaceId}` },
          }}
        >
          <button type="button">Membres</button>
        </Link>
      )}
      <form action="/" method="post" onSubmit={createPost}>
        {showPostFields.title && (
          <label htmlFor="title">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="titre du souvenir"
              value={postValues.title || ''}
              onChange={handlePostChange}
            />
          </label>
        )}
        <label htmlFor="content">
          <textarea
            name="text"
            id="content"
            cols="30"
            rows="5"
            placeholder="ecrit un souvenir"
            value={postValues.text || ''}
            onChange={handlePostChange}
            required
          />
        </label>
        <div>
          {postValues.imagesFiles.map((image, index) => (
            <div key={image.name}>
              <img
                src={URL.createObjectURL(image)}
                alt="postsimag"
                width="100"
                height="100"
              />
              <button
                type="button"
                onClick={() => {
                  deleteFile(index);
                }}
              >
                supprimer photo
              </button>
            </div>
          ))}
        </div>

        {showPostFields.link && (
          <label htmlFor="link">
            <input
              type="text"
              id="link"
              name="link"
              placeholder="lien"
              value={postValues.link || ''}
              onChange={handlePostChange}
            />
          </label>
        )}
        {showPostFields.image && (
          <UploadInput
            labelText="Photo souvenir"
            handleChange={(e) => {
              handlePostChange(e);
            }}
            isMultiple
          />
        )}
        {showPostFields.video && (
          <UploadInput
            labelText="Video souvenir"
            specificFieldName="postVideo"
            handleChange={handlePostChange}
          />
        )}
        <button
          type="button"
          style={{ display: showPostFields.title ? 'none' : 'inline-block' }}
          onClick={() => {
            setShowPostFields(() => {
              return { ...showPostFields, title: true };
            });
          }}
        >
          Ajouter un titre
        </button>
        <button
          type="button"
          style={{ display: showPostFields.link ? 'none' : 'inline-block' }}
          onClick={() =>
            setShowPostFields(() => {
              return { ...showPostFields, link: true };
            })
          }
        >
          Ajouter un lien
        </button>
        <button
          type="button"
          style={{ display: showPostFields.image ? 'none' : 'inline-block' }}
          onClick={() =>
            setShowPostFields(() => {
              return { ...showPostFields, image: true };
            })
          }
        >
          Ajouter une image
        </button>
        <button
          type="button"
          style={{ display: showPostFields.video ? 'none' : 'inline-block' }}
          onClick={() =>
            setShowPostFields(() => {
              return { ...showPostFields, video: true };
            })
          }
        >
          Ajouter une video
        </button>
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
