import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SpaceContext from '../context/SpaceContext';
import SpaceService from '../services/SpaceService';
import UserContext from '../context/UserContext';
import { useForm, toFormData } from '../utils/forms';
import PostService from '../services/PostService';
import PostCard from '../components/space/posts/postCard/PostCard';
import UploadInput from '../components/UploadInput';

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
  const [imageFile, setImageFile] = useState([]);
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
    image.map((imageInfo) => setImageFile(imageInfo.raw));
    const postValuesAndImages = { ...postValues, imageFile };
    const data = toFormData(postValuesAndImages);
    await PostService.createPost(spaceId, data);
    getSpaceMemoryData();
  }

  async function deletePost(id) {
    await PostService.deletePost(id);
    getSpaceMemoryData();
  }

  function imagePreview(e) {
    if (e.target.files.length) {
      for (let i = 0; i < e.target.files.length; i += 1) {
        setImage([
          ...image,
          {
            preview: URL.createObjectURL(e.target.files[i]),
            raw: e.target.files[i],
          },
        ]);
        // setImageFile([
        //   ...imageFile,
        //   { [e.target.files[i].name]: e.target.files[i] },
        //   // [e.target.files[i].name]: e.target.files[i],
        // ]);
      }
    }
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
      </p>
      {image.map((imageInfo) => console.log(imageInfo.raw))}
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
        {image.map((imageUrl) => (
          <img
            src={imageUrl.preview}
            key={imageUrl.preview}
            alt="postsimag"
            width="100"
            height="100"
          />
        ))}
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
            specificFieldName="postImage"
            handleChange={(handlePostChange, imagePreview)}
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
