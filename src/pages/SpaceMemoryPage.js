import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SpaceService from '../services/SpaceService';
import UserContext from '../context/UserContext';
import { useForm, toFormData } from '../utils/forms';
import PostService from '../services/PostService';
import PostCard from '../components/space/posts/postCard/PostCard';
import UploadInput from '../components/utilsTemplates/UploadInput/UploadInput';

function SpaceMemoryPage() {
  // const [spaceID, setSpaceID] = useState();
  const [spaceData, setSpaceData] = useState({});
  const [space, setSpace] = useState({});
  const [spaceErrorMessage, setSpaceErrorMessage] = useState('');
  // useLocation récupère la data passée dans le Link
  const { user } = useContext(UserContext);
  const [showPostFields, setShowPostFields] = useState({
    title: false,
    image: false,
    video: false,
    link: false,
  });
  const [image, setImage] = useState([]);
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
    }
  }

  async function createPost(event) {
    event.preventDefault();
    const data = toFormData(postValues);
    await PostService.createPost(spaceId, data);
    getSpaceMemoryData();
  }

  async function deletePost(id) {
    await PostService.deletePost(id);
    getSpaceMemoryData();
  }

  function imagePreview(e) {
    // const array = [];
    if (e.target.files.length) {
      for (let i = 0; i < e.target.files.length; i += 1) {
        image.push(URL.createObjectURL(e.target.files[i]));
        setImage(image);
      }
    }
  }

  function deleteImagePreview(index) {
    image.splice(index, 1);
    setImage([...image]);
  }
  console.log(image);
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
            pathname: `/space/${space.firstName}-${space.lastName}-${spaceId}/settings`,
            state: { id: `${spaceId}` },
          }}
        >
          <button type="button">Settings</button>
        </Link>
      ) : (
        ''
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
          {image.map((imageUrl, e, index) => (
            <div>
              <img
                src={imageUrl}
                key={imageUrl}
                alt="postsimag"
                width="100"
                height="100"
              />
              <button
                type="button"
                onClick={() => {
                  handlePostChange(e);
                  deleteImagePreview(index);
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
              imagePreview(e);
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
