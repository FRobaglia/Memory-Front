import React, { useContext } from 'react';
import UserContext from '../../../context/UserContext';
import SpaceContext from '../../../context/SpaceContext';
import '../../../styles/layout/line.scss';

function SpaceSettingsMembers() {
  const { value } = useContext(SpaceContext);
  const { user } = useContext(UserContext);

  return (
    <section className="section section--invitation members">
      <div className="section__content">
        <h2 className="spaceMembers__listMember--title">Liste des membres</h2>
        {/* {value.subscribers && value.subscribers.map((el) => console.log(el.user))} */}

        {value.subscribers &&
          value.subscribers.map((subscriber) => (
            <div
              className="line--member spaceMembers__listMembers"
              key={subscriber.user.id}
            >
              <div className="line--member__image">
                <img
                  src={subscriber.user.image.url}
                  alt={subscriber.user.firstName}
                />
              </div>
              <div className="line--member__text">
                <p className="line--member__text__text">
                  {subscriber.user.firstName} {subscriber.user.lastName}
                </p>
                <p className="line--member__text__role">
                  {subscriber.relationDefunct || 'Non renseigné'}
                </p>
              </div>
              {value.space.createdBy && value.space.createdBy.id === user.id ? (
                <button
                  aria-label="delete"
                  className="button button--delte line--member__delte"
                  type="submit"
                />
              ) : (
                ''
              )}
            </div>
          ))}
      </div>
    </section>
  );
}

export default SpaceSettingsMembers;
