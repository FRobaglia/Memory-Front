import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SpaceContext from '../../context/SpaceContext';
import SpaceService from '../../services/SpaceService';
import SpaceSettingsMembers from '../../components/space/spaceSettings/SpaceSettingsMembers';
import SpaceAddMembers from '../../components/space/spaceSettings/SpaceAddMembers';
import SpaceExit from '../../components/space/spaceSettings/SpaceExit';
import useWindowSize from '../../utils/useWindowSize';
import '../../styles/pages/spaceMembers.scss';

function SpaceMembersPage() {
  const { value, setValue } = useContext(SpaceContext);
  const [width] = useWindowSize();
  const wrapper = useRef(null);
  const [translateValue, seTranslateValue] = useState();

  // TABS NAV
  const [isTab1Active, setIsTab1Active] = useState(true);
  const [isTab2Active, setIsTab2Active] = useState(false);
  const [isTab3Active, setIsTab3Active] = useState(false);

  useEffect(() => {
    getFocusedSpace();
    setTranslateValue();
  }, [width]);

  async function getFocusedSpace() {
    const result = await SpaceService.focusSpace(spaceId);
    setValue(result);
  }

  const spaceId = window.location.href
    .split('/')[4]
    .substring(window.location.href.split('/')[4].lastIndexOf('-') + 1);

  function handleClickNav(id) {
    const wrapperSlider = wrapper.current;
    width < 750
      ? (wrapperSlider.style.transform = `translateX(${id * -100}vw)`)
      : (wrapperSlider.style.transform = `translateX(${id * -750}px)`);
    switch (id) {
      case 0:
        setIsTab1Active(true);
        setIsTab2Active(false);
        setIsTab3Active(false);
        break;
      case 1:
        setIsTab1Active(false);
        setIsTab2Active(true);
        setIsTab3Active(false);
        break;
      case 2:
        setIsTab1Active(false);
        setIsTab2Active(false);
        setIsTab3Active(true);
        break;
      case 3:
        setIsTab1Active(false);
        setIsTab2Active(false);
        setIsTab3Active(false);
        break;
      default:
        setIsTab1Active(true);
        setIsTab2Active(false);
        setIsTab3Active(false);
        break;
    }
  }

  function setTranslateValue() {
    if (width > 750) {
      seTranslateValue(750);
    } else {
      seTranslateValue(100);
    }
  }

  return (
    <div className="body--parameter body--slider body--simple">
      <header className="header header--simple spaceMembers__header">
        {value.space && (
          <Link
            to={`/space/${value.space.firstName}-${value.space.lastName}-${value.space.id}`}
            className="button button--return"
          />
        )}
        <h1 className="headline--membres">Membres</h1>
      </header>
      <nav className="nav--slider spaceMembers__navSlider">
        <div className="nav--slider__elementGroup">
          <Link
            to={{ hash: '#informations' }}
            className={
              isTab1Active
                ? 'nav--slider__element nav--slider__element--active'
                : 'nav--slider__element'
            }
            onClick={() => handleClickNav(0)}
          >
            Liste des membres
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
            + Invitation
          </Link>
          <Link
            to={{ hash: '#demandes-acces' }}
            className={
              isTab3Active
                ? 'nav--slider__element nav--slider__element--active'
                : 'nav--slider__element'
            }
            onClick={() => handleClickNav(2)}
          >
            Quitter l'espace
          </Link>
        </div>
      </nav>
      <main>
        <div ref={wrapper} className="wrapper--flex spaceMembers__wrapper">
          <SpaceSettingsMembers />
          {value.space && <SpaceAddMembers />}
          <SpaceExit />
        </div>
      </main>
    </div>
  );
}

export default SpaceMembersPage;
