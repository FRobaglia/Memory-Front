import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  browserHistory,
} from 'react';
import { useLocation, Redirect, withRouter, Link } from 'react-router-dom';
import SpaceContext from '../../context/SpaceContext';
import SpaceService from '../../services/SpaceService';
import SpaceSettingsGeneral from '../../components/settings/spaceSettings/SpaceSettingsGenerales';
import SpaceSettingsInvitations from '../../components/settings/spaceSettings/SpaceSettingsInvitations';
import SpaceSettingsMembers from '../../components/settings/spaceSettings/SpaceSettingsMembers';
import RequestAccessContainer from '../../components/utilsTemplates/requestAccessContainer/RequestAccessContainer';
import '../../styles/layout/container.scss';
import '../../styles/layout/_button.scss';
import './spaceSettings.scss';

function SpaceSettingsPage() {
  const { value, setValue } = useContext(SpaceContext);
  const wrapper = useRef(null);
  // TABS NAV
  const [isTab1Active, setIsTab1Active] = useState(true);
  const [isTab2Active, setIsTab2Active] = useState(false);
  const [isTab3Active, setIsTab3Active] = useState(false);
  const [isTab4Active, setIsTab4Active] = useState(false);

  // GET SPACEID URL
  const spaceId = window.location.href
    .split('/')[4]
    .substring(window.location.href.split('/')[4].lastIndexOf('-') + 1);

  function handleClickNav(id) {
    // const wrapper = document.querySelector('.wrapper--flex');
    const wrapperSlider = wrapper.current;
    switch (id) {
      case 0:
        setIsTab1Active(true);
        setIsTab2Active(false);
        setIsTab3Active(false);
        setIsTab4Active(false);
        wrapperSlider.style.transform = `translateX(${id * -100}vw)`;
        break;
      case 1:
        setIsTab1Active(false);
        setIsTab2Active(true);
        setIsTab3Active(false);
        setIsTab4Active(false);
        wrapperSlider.style.transform = `translateX(${id * -100}vw)`;
        break;
      case 2:
        setIsTab1Active(false);
        setIsTab2Active(false);
        setIsTab3Active(true);
        setIsTab4Active(false);
        wrapperSlider.style.transform = `translateX(${id * -100}vw)`;
        break;
      case 3:
        setIsTab1Active(false);
        setIsTab2Active(false);
        setIsTab3Active(false);
        setIsTab4Active(true);
        wrapperSlider.style.transform = `translateX(${id * -100}vw)`;
        break;
      default:
        setIsTab1Active(true);
        setIsTab2Active(false);
        setIsTab3Active(false);
        setIsTab4Active(false);
        break;
    }
  }

  useEffect(() => {
    getFocusedSpace();
  }, []);

  async function getFocusedSpace() {
    const result = await SpaceService.focusSpace(spaceId);
    setValue(result);
  }

  return (
    <div className="body--parameter body--slider body--simple">
      <header className="header header--simple spaceSettings__header">
        <button
          type="button"
          aria-label="Goback"
          className="button button--return"
        />
        <h1 className="headline--parameters">Paramètres</h1>
      </header>
      <nav className="nav--slider">
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
            Invitations
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
            Demandes d'accès
          </Link>
          <Link
            to={{ hash: '#membres' }}
            className={
              isTab4Active
                ? 'nav--slider__element nav--slider__element--active'
                : 'nav--slider__element'
            }
            onClick={() => handleClickNav(3)}
          >
            Membres
          </Link>
        </div>
      </nav>
      {value && (
        <main>
          <div ref={wrapper} className="wrapper--flex spaceSettings__container">
            <SpaceSettingsGeneral />
            <SpaceSettingsInvitations />
            <RequestAccessContainer spaceSettings spaceId={spaceId} />
            <SpaceSettingsMembers />
          </div>
        </main>
      )}
    </div>
  );
}

export default withRouter(SpaceSettingsPage);
