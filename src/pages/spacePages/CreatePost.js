import React, { useState, useRef, useEffect, createRef } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { useForm, toFormData } from '../../utils/forms';
import PostService from '../../services/PostService';
import SpaceService from '../../services/SpaceService';
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
  const [space, setSpace] = useState(null);
  const [postValues, handlePostChange, deleteFiles] = useForm();
  const spaceId = window.location.href
    .split('/')[4]
    .substring(window.location.href.split('/')[4].lastIndexOf('-') + 1);

  const [toggleBtn, setToggleBtn] = useState(false);
  const [redirectToSpace, setRedirectToSpace] = useState(false);

  useEffect(() => {
    getSpace();
  }, []);

  async function getSpace() {
    setSpace(await SpaceService.focusSpace(spaceId));
  }

  async function createPost(event) {
    event.preventDefault();
    const data = toFormData(postValues);
    await PostService.createPost(spaceId, data);
    setRedirectToSpace(true);
  }

  if (redirectToSpace)
    return (
      <Redirect
        to={`/space/${space.space.firstName}-${space.space.lastName}-${space.space.id}`}
      />
    );

  return (
    <div className="body--creePost">
      <UserAccountHeaederBg />
      <main className="main__createPost">
        <h2>Ajouter un souvenir</h2>
        <form id="createMemory" action="/" method="post" onSubmit={createPost}>
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
                placeholder="Donnez un titre..."
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
        </form>
      </main>
      <footer className={`footer ${toggleBtn ? 'is-visible' : ''}`}>
        <div className="footer--border">
          <svg
            width="329"
            height="60"
            viewBox="0 0 329 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d)">
              <path
                d="M15.7892 58L164.998 58L314.206 58C320.153 58 324.998 58 324.998 58L324.997 55.4594C324.997 55.4594 320.152 55.4594 314.206 55.4594L193.738 55.4594C191.976 55.3594 190.214 55.2594 188.563 55.0594C184.819 54.6595 182.286 53.4597 181.295 51.46C180.194 49.4603 180.634 46.9607 182.616 44.0611C185.479 39.7618 187.021 35.1624 187.462 30.1632C188.563 19.1648 180.084 8.66643 168.081 6.46676C155.638 4.16711 143.305 10.5662 139.781 21.2646C137.248 28.5635 138.459 35.5624 142.314 42.2614C142.424 42.3614 142.424 42.4613 142.534 42.6613C143.415 44.2611 144.406 45.8608 144.956 47.6605C145.507 49.1603 145.397 50.4601 144.846 51.56C144.296 52.6598 143.195 53.4597 141.653 54.0596C140.001 54.5595 138.349 55.1594 136.587 55.1594C132.073 55.2594 133.064 55.3594 128.549 55.4594L15.7892 55.4593C9.84284 55.4593 4.99768 55.4593 4.99768 55.4593L4.99768 58C4.99768 58 9.84284 58 15.7892 58Z"
                fill="#EDE7F2"
              />
            </g>
            <defs>
              <filter
                id="filter0_d"
                x="0.997681"
                y="7.62939e-05"
                width="328"
                height="60"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="-2" />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.501961 0 0 0 0 0.443137 0 0 0 0 0.643137 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>

        <button
          type="submit"
          form="createMemory"
          className="button button--strong button--full button--submit"
        >
          Partager le souvenir
        </button>
      </footer>
    </div>
  );
}

export default CreatePost;
