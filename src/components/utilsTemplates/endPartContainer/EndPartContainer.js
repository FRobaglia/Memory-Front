import React from 'react';
import { Link } from 'react-router-dom';
import './_endPartContainer.scss';

function EndPartContainer({
  endMessage,
  endImage,
  endButtonLink,
  endButtonText,
  joinSpace,
  spaceErrorMessage,
  sendRequestAccess,
  requestAccessValues,
  handlerequestAccessChange,
  showSubscriberButton,
  messageButton,
  subscribeMessage,
  showInvitedUserButton,
  notConnected,
  location,
}) {
  return (
    <div className="end-container">
      <div className="header header--puzzle" />
      <div
        className={
          joinSpace
            ? 'wrapper--flex wrapper--flex--join-space'
            : 'wrapper--flex'
        }
      >
        {joinSpace ? (
          <section>
            <form
              method="post"
              onSubmit={sendRequestAccess}
              className="section__content"
            >
              <h2>Quelle était votre relation ?</h2>
              <div className="input">
                <label htmlFor="requestAccess" className="input__label">
                  Relation
                </label>
                <input
                  type="text"
                  name="relationDefunctText"
                  id="relationDefunctText"
                  value={requestAccessValues.relationDefunctText || ''}
                  onChange={handlerequestAccessChange}
                  className="input__field"
                />
              </div>
              <p className="space-error-message">{spaceErrorMessage}</p>
              {showSubscriberButton && ( // BUTTON
                <div className="subscriber-buttons">
                  {subscribeMessage && <p>{subscribeMessage}</p>}
                  <Link to="/account" className="button button--full">
                    Mon compte personnel
                  </Link>
                  <button
                    className="button button--strong button--full"
                    type="submit"
                  >
                    {messageButton}
                  </button>
                </div>
              )}
              {showInvitedUserButton && ( // INVITED BUTTON
                <button
                  className="button button--strong button--full"
                  type="submit"
                  onClick={() =>
                    setTimeout(() => {
                      window.location.reload(false);
                    }, 2000)
                  }
                >
                  {messageButton}
                </button>
              )}
            </form>
          </section>
        ) : (
          <>
            <div>
              <h1 className="end-container--text">{endMessage}</h1>
              <div
                className="end-container--image"
                style={{
                  backgroundImage: endImage && `url(${endImage})`,
                  width: endImage && '150px',
                }}
              />
            </div>
            {notConnected && (
              <>
                <p className="space-error-message">
                  Connectez vous pour accéder à cette page.
                </p>
                <Link
                  to="/login"
                  location={location}
                  className="button button--full"
                  style={{ marginBottom: '30px' }}
                >
                  Déja un compte
                </Link>
              </>
            )}
            <Link
              to={endButtonLink}
              className="button button--full button--strong"
            >
              {endButtonText}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default EndPartContainer;
