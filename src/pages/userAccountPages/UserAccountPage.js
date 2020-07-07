import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import SpacesContainer from '../../components/userAccount/SpacesContainer';
import UserInvitationContainer from '../../components/userAccount/UserInvitationsContainer';
// import RequestAccessContainer from '../../components/userAccount/RequestAccessContainer';
import RequestAccessContainer from '../../components/utilsTemplates/requestAccessContainer/RequestAccessContainer';
import UserAccountHeaederBg from '../../components/userAccount/UserAccountHeaederBg';
// import logoPuzzle from '../../assets/svg/puzzle-logo.svg';
import '../../components/nav/navbar-userAccount.scss';
import './userAccount.scss';
import '../../styles/layout/nav.scss';

function UserAccountPage() {
  const { user } = useContext(UserContext);
  const [navPosition, setNavPosition] = useState('top');
  const [isTab1Active, setIsTab1Active] = useState(true);
  const [isTab2Active, setIsTab2Active] = useState(false);
  const [isTab3Active, setIsTab3Active] = useState(false);
  // const [navSliderElement, setNavSliderElement] = useState();
  const tabRef = useRef(null);
  // const navSliderElementRef = useRef(document.querySelector('.nav--slider'));
  const navSliderElementRef = useRef();
  // let listener = null;

  // Changing backgroundcolor navbar
  const listener = document.addEventListener('scroll', () => {
    // window.addEventListener('DOMContentLoaded', () => {
    // const navSlider = document.querySelector('.nav--slider');
    const navSlider = navSliderElementRef.current;
    // setNavSliderElement(navSlider)
    if (!navSlider) return false;
    const scrolled = document.scrollingElement.scrollTop;
    if (scrolled > 120) {
      if (navPosition !== 'violet') {
        setNavPosition('violet');
        navSlider.style.position = 'fixed';
        navSlider.style.top = '65px';
      }
    } else if (navPosition !== 'top') {
      setNavPosition('top');
      navSlider.style.position = 'relative';
      navSlider.style.top = 'auto';
    }
    // });
  });

  function handleClickNav(id) {
    const wrapper = document.querySelector('.wrapper--flex');
    switch (id) {
      case 0:
        setIsTab1Active(true);
        setIsTab2Active(false);
        setIsTab3Active(false);
        wrapper.style.transform = `translateX(${id * -100}vw)`;
        break;
      case 1:
        setIsTab1Active(false);
        setIsTab2Active(true);
        setIsTab3Active(false);
        wrapper.style.transform = `translateX(${id * -100}vw)`;
        break;
      case 2:
        setIsTab1Active(false);
        setIsTab2Active(false);
        setIsTab3Active(true);
        wrapper.style.transform = `translateX(${id * -100}vw)`;
        break;
      default:
        setIsTab1Active(true);
        setIsTab2Active(false);
        setIsTab3Active(false);
        break;
    }
  }

  useEffect(() => {
    tabRef.current.className =
      'nav--slider__element nav--slider__element--active';

    // navSliderElementRef.current = document.querySelector('.nav--slider');
    console.log(navSliderElementRef.current);
  }, [listener]);

  return (
    <div className="userAccount__body">
      <nav
        className="userAccount__navContainer header__main"
        style={{
          backgroundColor: navPosition === 'top' ? 'transparent' : '#EDE7F2',
          transition: '0.2s ease',
        }}
      >
        <ul className="userAccount__nav">
          <li>
            <Link to="/" className="userAccount__nav--logoName">
              {/* <img
                src={logoPuzzle}
                alt="memory-logo"
                className="userAccount__nav--logo"
              /> */}
              MEMORY
            </Link>
          </li>
          <li>
            <Link to="account/modify">
              <img
                src={user.image.url}
                alt={user.firstName}
                className="userAccount__nav--photo"
              />
            </Link>
          </li>
        </ul>
      </nav>
      <UserAccountHeaederBg />

      <main className="main--scroll userAccount__main">
        <nav
          ref={navSliderElementRef}
          className="nav--slider userAccount__navSlider"
        >
          <div className="nav--slider__elementGroup">
            <button
              ref={tabRef}
              type="button"
              className={
                isTab1Active
                  ? 'nav--slider__element nav--slider__element--active'
                  : 'nav--slider__element'
              }
              onClick={() => handleClickNav(0)}
            >
              Tous mes espaces
            </button>
            <button
              type="button"
              onClick={() => handleClickNav(1)}
              className={
                isTab2Active
                  ? 'nav--slider__element nav--slider__element--active'
                  : 'nav--slider__element'
              }
            >
              Invitations reçues
            </button>
            <button
              type="button"
              onClick={() => handleClickNav(2)}
              className={
                isTab3Active
                  ? 'nav--slider__element nav--slider__element--active'
                  : 'nav--slider__element'
              }
            >
              Demandes d'accès reçues
            </button>
          </div>
        </nav>
        <div className="wrapper--flex userAccount__wrapper">
          <SpacesContainer />
          <UserInvitationContainer />
          <RequestAccessContainer account />
        </div>
      </main>
    </div>
  );
}

export default UserAccountPage;
