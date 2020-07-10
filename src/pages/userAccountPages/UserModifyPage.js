import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { useForm, toFormData, toURLSearchParams } from '../../utils/forms';
import UploadInput from '../../components/utilsTemplates/UploadInput/UploadInput';
import SessionService from '../../services/SessionService';
import UserModifyProfil from '../../components/userAccount/UserModifyProfil';
import UserModifyPassword from '../../components/userAccount/UserModifyPassword';
import useWindowSize from '../../utils/useWindowSize';
import '../../styles/pages/userModify.scss';
import '../../styles/layout/_button.scss';

function UserModifyPage() {
  const { user, setUser } = useContext(UserContext);
  const [values, handleChange] = useForm();
  const [passwordValues, handlePasswordChange] = useForm();
  const wrapper = useRef(null);
  // TABS NAV
  const [isTab1Active, setIsTab1Active] = useState(true);
  const [isTab2Active, setIsTab2Active] = useState(false);
  const [width] = useWindowSize();
  const [translateValue, setTranslateValue] = useState();

  function wrapperTranslate(id) {
    const wrapperSlider = wrapper.current;
    if (width < 750) {
      wrapperSlider.style.transform = `translateX(${id * -100}vw)`;
    } else wrapperSlider.style.transform = `translateX(${id * -750}px)`;
  }

  function handleClickNav(id) {
    wrapperTranslate(id);
    switch (id) {
      case 0:
        setIsTab1Active(true);
        setIsTab2Active(false);
        break;
      case 1:
        setIsTab1Active(false);
        setIsTab2Active(true);
        break;
      default:
        setIsTab1Active(true);
        setIsTab2Active(false);
        break;
    }
  }

  useEffect(() => {
    setTranslateValue();
  }, [width]);

  return (
    <div className="body--parameter body--simple body--slider">
      <header className="header header--simple spaceSettings__header">
        <Link to="/account" className="button button--return" />
        <img
          src={user.image.url}
          alt={user.firstName}
          className="userModify__nav--photo"
        />
        <h1 className="userModify__nav--title">Mon compte</h1>
      </header>
      <nav className="nav--slider">
        <div className="nav--slider__elementGroup userModify__nav--content">
          <Link
            to={{ hash: '#informations' }}
            className={
              isTab1Active
                ? 'nav--slider__element nav--slider__element--active'
                : 'nav--slider__element'
            }
            onClick={() => handleClickNav(0)}
          >
            Informations
          </Link>
          <Link
            to={{ hash: '#invitations' }}
            className={
              isTab2Active
                ? 'nav--slider__element nav--slider__element--active'
                : 'nav--slider__element'
            }
            onClick={() => handleClickNav(1)}
          >
            Changer le mot de passe
          </Link>
        </div>
      </nav>
      <main className="userModify__main">
        <div ref={wrapper} className="wrapper--flex">
          <UserModifyProfil />
          <UserModifyPassword />
        </div>
      </main>
    </div>
  );
}

export default UserModifyPage;
