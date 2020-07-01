import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SpaceService from '../../services/SpaceService';
import UserContext from '../../context/UserContext';
import SpaceContext from '../../context/SpaceContext';
import { useForm, toFormData } from '../../utils/forms';
import PostService from '../../services/PostService';
import PostCard from '../../components/space/posts/postCard/PostCard';
import UploadInput from '../../components/UploadInput';

function SpaceMemoryPage() {
  const [requestAccessValues, handlerequestAccessChange] = useForm();
  const [spaceData, setSpaceData] = useState({});
  const [space, setSpace] = useState({});
  const [spaceErrorMessage, setSpaceErrorMessage] = useState('');
  const [isUserNotSubscribed, setIsUserNotSubscribed] = useState();
  const [isUserAlreadyRequestAccess, setUserAlreadyRequestAccess] = useState();
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
    if (resultat === 'USER_NOT_SUBSCRIBED') {
      // Gestion error 401 lorsque l'user n'est pas inscrit à cet espace
      setIsUserNotSubscribed(true);
    } else if (resultat.status) {
      setSpaceErrorMessage(SpaceService.errorMessageSpace(resultat.status));
    } else {
      setSpaceData(resultat);
      setSpace(resultat.space);
      setValue(resultat.space);
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
    const result = await SpaceService.subcribeToSpace(spaceId);
    if (result === 'USER_ALREADY_REQUEST_SUBSCRIPTION') {
      setUserAlreadyRequestAccess(true);
    }
  }

  if (spaceErrorMessage || isUserNotSubscribed) {
    return (
      <div>
        {spaceErrorMessage && (
          <>
            <p>Pas cool</p>
            <p>{spaceErrorMessage}</p>
          </>
        )}
        {isUserNotSubscribed && (
          <>
            <p>
              Tu n'es pas membre de cet espace. Pour cela, une demande d'accès
              est nécessaire
            </p>
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
              <button type="submit">Demander l'accès à cet espace</button>
            </form>
            {isUserAlreadyRequestAccess && (
              <p>Vous avez déjà fait la demande pour accéder à cet espace</p>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <p>
        Bienvenu dans l'espace de {space.firstName} {space.lastName}
      </p>
      {JSON.stringify(space.createdBy) === JSON.stringify(user) && (
        <Link
          to={{
            pathname: `/space/${space.firstName}-${space.lastName}-${space.id}/settings/general`,
            state: { id: `${spaceId}` },
          }}
        >
          <button type="button">Settings</button>
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
