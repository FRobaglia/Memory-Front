import React, { useContext } from 'react';
// import UserContext from '../context/UserContext';
// import SessionService from '../services/SessionService';
import { Link } from 'react-router-dom';
import LoginPage from './authPages/LoginPage';
import '../styles/pages/_home.scss';
import StepHome from '../components/utilsTemplates/stepHome/StepHome';
import firstStepLogo from '../assets/svg/number-1.svg';
import secondStepLogo from '../assets/svg/number-2.svg';
import thirdStepLogo from '../assets/svg/number-3.svg';
import memoryLogo from '../assets/svg/puzzle-logo.svg';
import lockIcon from '../assets/svg/lock.svg';
import tree from '../assets/svg/tree.svg';
import noSound from '../assets/svg/no-sound.svg';

function Home({ location }) {
  // const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <div className="login">
        <LoginPage location={location} />
      </div>
      <div className="wrapper--flex">
        <section>
          <div className="identity section__content">
            <div className="identity--text">
              <h1 className="identity--title">Memory</h1>
              <p>Rassembler les souvenir de vos proches</p>
            </div>
          </div>
        </section>
        <section>
          <div className="presentation section__content">
            <div className="presentation--text">
              <h1 className="presentation--text--title">
                Qu'est-ce que MEMORY ?
              </h1>
              <p className="presentation--text--desc">
                MEMORY est un espace de recueillement pour les proches d'une
                personne décédée, dédié a sa mémoire grâce à un rassemblement de
                souvenirs.
              </p>
            </div>
            <Link to="/account" className="button button--full">
              + Crée un Espace
            </Link>
          </div>
        </section>
        <section>
          <div className="step-image step-image--first" />
        </section>
        <StepHome
          stepLogo={firstStepLogo}
          stepText="Partages des souvenirs"
          stepClass="first-step"
        />
        <section>
          <div className="step-image step-image--second" />
        </section>
        <StepHome
          stepLogo={secondStepLogo}
          stepText="Creer une collection de souvenirs"
        />
        <section>
          <div className="step-image step-image--third" />
        </section>
        <StepHome
          stepLogo={thirdStepLogo}
          stepText="Un espace de recueillement pour des moment difficiles"
          stepClass="third-step"
        />
        <section>
          <div className="memory-logo section__content">
            <div className="memory-logo--container">
              <img src={memoryLogo} alt="puzzle piece" />
            </div>
          </div>
        </section>
        <section>
          <div className="services section__content">
            <h1 className="services--title">Nos services</h1>
            <ul>
              <li className="services--item">
                <img className="services--icon" src={lockIcon} alt="" />
                <p>Vos espaces sont strictemtent personels</p>
              </li>
              <li className="services--item">
                <img className="services--icon" src={tree} alt="" />
                <p>Le support du hors ligne vous permet d'y accedez partout</p>
              </li>
              <li className="services--item">
                <img className="services--icon" src={noSound} alt="" />
                <p>Pas déranger par des notifications</p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
