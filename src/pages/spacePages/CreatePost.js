import React, { useState, useRef, useEffect, createRef } from 'react';
import moment from 'moment';
import { useForm, toFormData } from '../../utils/forms';
import PostService from '../../services/PostService';
import UploadInput from '../../components/utilsTemplates/UploadInput/UploadInput';
import UserAccountHeaederBg from '../../components/userAccount/UserAccountHeaederBg';
import '../../styles/layout/container.scss';
import './createPost.scss';
import NavBar from '../../components/nav/NavBar';
// import NavBarPrevStep from '../../components/nav/NavBarPrevStep';

function CreatePost() {
  const [showPostForm, setShowPostForm] = useState({
    allForm: false,
    title: false,
    image: false,
    video: false,
    link: false,
  });
  const [postValues, handlePostChange, deleteFiles] = useForm();
  const spaceId = window.location.href
    .split('/')[4]
    .substring(window.location.href.split('/')[4].lastIndexOf('-') + 1);

  useEffect(() => {}, []);

  async function createPost(event) {
    event.preventDefault();
    const data = toFormData(postValues);
    await PostService.createPost(spaceId, data);
    // getSpaceMemoryData();
  }

  return (
    <div className="body--creePost">
      <UserAccountHeaederBg />
      <main className="main__createPost">
        <form action="/" method="post" onSubmit={createPost}>
          {showPostForm.title && (
            <div className="input">
              <label className="input__label" htmlFor="title">
                Titre du souvenir
              </label>
              <input
                className="input__field"
                type="text"
                name="title"
                id="title"
                placeholder="titre du souvenir"
                value={postValues.title || ''}
                onChange={handlePostChange}
              />
            </div>
          )}
          <div className="input">
            <label className="input__label" htmlFor="content">
              Ton souvenir
            </label>
            <textarea
              className="input__field"
              name="text"
              id="content"
              cols="30"
              rows="5"
              placeholder="Quel souvenir veux-tu partager ?"
              value={postValues.text || ''}
              onChange={handlePostChange}
              required
            />
          </div>
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
                    deleteFiles(index);
                  }}
                >
                  supprimer photo
                </button>
              </div>
            ))}
          </div>

          {showPostForm.link && (
            <div className="input">
              <label className="input__label" htmlFor="link"></label>
              <input
                className="input__field"
                type="text"
                id="link"
                name="link"
                placeholder="lien"
                value={postValues.link || ''}
                onChange={handlePostChange}
              />
            </div>
          )}
          {showPostForm.image && (
            <UploadInput
              labelText="Photo souvenir"
              handleChange={(e) => {
                handlePostChange(e);
              }}
              isMultiple
            />
          )}
          {showPostForm.video && (
            <UploadInput
              labelText="Video souvenir"
              specificFieldName="postVideo"
              handleChange={handlePostChange}
            />
          )}
          <button
            type="button"
            className="button button--add"
            style={{ display: showPostForm.title ? 'none' : 'inline-block' }}
            onClick={() => {
              setShowPostForm(() => {
                return { ...showPostForm, title: true };
              });
            }}
          >
            Ajouter un titre
          </button>
          <button
            type="button"
            className="button button--add"
            style={{ display: showPostForm.link ? 'none' : 'inline-block' }}
            onClick={() =>
              setShowPostForm(() => {
                return { ...showPostForm, link: true };
              })
            }
          >
            Ajouter un lien
          </button>
          <button
            type="button"
            className="button button--add"
            style={{ display: showPostForm.image ? 'none' : 'inline-block' }}
            onClick={() =>
              setShowPostForm(() => {
                return { ...showPostForm, image: true };
              })
            }
          >
            Ajouter une image
          </button>
          <button
            type="button"
            className="button button--add"
            style={{ display: showPostForm.video ? 'none' : 'inline-block' }}
            onClick={() =>
              setShowPostForm(() => {
                return { ...showPostForm, video: true };
              })
            }
          >
            Ajouter une video
          </button>
          <button type="submit">poster un souvenir</button>
        </form>
      </main>
    </div>
  );
}

export default CreatePost;
