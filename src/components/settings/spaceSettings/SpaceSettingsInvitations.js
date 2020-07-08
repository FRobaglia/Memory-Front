import React, { useState } from 'react';
import { useForm, toFormData } from '../../../utils/forms';
import SpaceService from '../../../services/SpaceService';

function SpaceSettingsInvitations() {
  const [values, handleChange] = useForm();
  const [textInvitation, setTextInvitation] = useState('');
  const [isAlreadyInvited, setIsAlreadyInvited] = useState(false);
  const [successfulInvitation, setSuccessfulInvitation] = useState(false);

  const spaceId = window.location.href
    .split('/')[4]
    .substring(window.location.href.split('/')[4].lastIndexOf('-') + 1);

  async function sendInvitation(e) {
    e.preventDefault();
    console.log('vav', values);
    setTextInvitation(values.textInvitation);
    const data = toFormData(values);
    const result = await SpaceService.createInvitation(spaceId, data);
    console.log(result);
    if (result === 'ALREADY_INVITED') {
      setIsAlreadyInvited(true);
    } else {
      setSuccessfulInvitation(true);
    }
  }

  return (
    <section className="section section--info info">
      <div className="section__content">
        <h2>Invitations</h2>
        <div className="textGroup">
          <form method="post" onSubmit={sendInvitation}>
            <h3>Texte d'invitation</h3>
            <p className="text">
              Ce texte constituera le message d'invitation reçu par email
            </p>
            <div className="input">
              <label htmlFor="textInvitation" className="input__label">
                Message d'invitation
              </label>
              <textarea
                className="input__field"
                placeholder="Vous avez récemment appris la disparition de Janine..."
                required
                name="textInvitation"
                id="textInvitation"
                onChange={handleChange}
                value={values.textInvitation || textInvitation}
              />
            </div>
            <div className="input">
              <label htmlFor="email" className="input__label">
                Adresse e-mail
              </label>
              <input
                className="input__field"
                type="email"
                name="email"
                id="email"
                placeholder="test@example.com"
                value={values.email || ''}
                onChange={handleChange}
              />
            </div>
            <button className="button button--full" type="submit">
              Inviter à rejoindre l'espace
            </button>
          </form>
        </div>
        {isAlreadyInvited && <p>Ce destinataire a déjà été invité</p>}
        {successfulInvitation && <p>Invitation envoyé!</p>}
      </div>
    </section>
  );
}

export default SpaceSettingsInvitations;
