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

  const [toggleBtn, setToggleBtn] = useState(false);

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
        <h2>Ajouter un souvenir</h2>
        <form action="/" method="post" onSubmit={createPost}>
          {showPostForm.title && (
            <div className="input input--title">
              <label className="input__label" htmlFor="title">
                Titre du souvenir
              </label>
              <input
                className="input__field"
                type="text"
                name="title"
                id="title"
                placeholder="Donnez un titre à votre souvenir"
                value={postValues.title || ''}
                onChange={handlePostChange}
              />
            </div>
          )}
          <div className="input input--souvenir">
            <label className="input__label" htmlFor="content">
              Votre souvenir
            </label>
            <textarea
              className="input__field"
              name="text"
              id="content"
              cols="30"
              rows="5"
              placeholder="Quel souvenir voulez-vous partager ?"
              value={postValues.text || ''}
              onChange={handlePostChange}
              required
            />
          </div>

          {showPostForm.link && (
            <div className="input">
              <label className="input__label" htmlFor="link">
                Lien vers une page externe
              </label>
              <input
                className="input__field"
                type="text"
                id="link"
                name="link"
                placeholder="Ajouter un lien..."
                value={postValues.link || ''}
                onChange={handlePostChange}
              />
            </div>
          )}
          {showPostForm.image && (
            <div className="input">
              <div className="input__field">
                <UploadInput
                  labelText="Vos images"
                  handleChange={(e) => {
                    handlePostChange(e);
                  }}
                  isMultiple
                  images={postValues.imagesFiles}
                />
                <div className="previews">
                  {postValues.imagesFiles.map((image, index) => (
                    <div className="previews__preview" key={image.name}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="importées depuis l'ordinateur"
                      />
                      <button
                        type="button"
                        className="preview__button"
                        onClick={() => {
                          deleteFiles(index);
                        }}
                      ></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {showPostForm.video && (
            <div className="input">
              <div className="input__field">
                <UploadInput
                  labelText="Votre vidéo"
                  specificFieldName="postVideo"
                  handleChange={handlePostChange}
                />
              </div>
            </div>
          )}
          <div className="buttons">
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
              Ajouter un lien externe
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
              Ajouter des images
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
          </div>
          <div className="switchGroup">
            <div
              onClick={() => setToggleBtn(!toggleBtn)}
              className={`toggle-btn ${toggleBtn ? 'active' : ''}`}
            >
              <input type="checkbox" checked className="cb-value" />
              <span className="round-btn"></span>
            </div>
            <p className="text">
              Je suis sur que le défunt serait d'accord pour que je publie cela.
              Aussi, je suis sur que personne ne serait offensé par ce contenu.
            </p>
          </div>
          <button type="submit">poster un souvenir</button>
        </form>
      </main>
    </div>
  );
}

export default CreatePost;
