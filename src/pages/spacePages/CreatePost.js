import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import SpaceService from '../../services/SpaceService';
import UserAccountHeaederBg from '../../components/userAccount/UserAccountHeaederBg';
import '../../styles/layout/container.scss';
import '../../styles/pages/createPost.scss';
import CreatePostForm from '../../components/forms/createPostForm/CreatePostForm';
import CancelIcon from '../../assets/svg/icons/icon-cancel.svg';

function CreatePost() {
  const [space, setSpace] = useState(null);
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

  if (redirectToSpace)
    return (
      <Redirect
        to={`/space/${space.space.firstName}-${space.space.lastName}-${space.space.id}`}
      />
    );

  return (
    <div className="body--creePost">
      <nav className="userAccount__navContainer header__main">
        <ul className="userAccount__nav">
          <li>
            <Link to="/" className="userAccount__nav--logoName">
              MEMORY
            </Link>
          </li>
          {space && (
            <li>
              <Link
                to={`/space/${space.space.firstName}-${space.space.lastName}-${space.space.id}`}
              >
                <img alt="return" src={CancelIcon} />
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <UserAccountHeaederBg />
      <main className="main__createPost">
        <h2>Ajouter un souvenir</h2>
        <CreatePostForm
          spaceId={spaceId}
          setRedirectToSpace={setRedirectToSpace}
          toggleBtn={toggleBtn}
          setToggleBtn={setToggleBtn}
        />
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
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
