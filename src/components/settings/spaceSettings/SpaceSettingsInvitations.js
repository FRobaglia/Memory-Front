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
    <div>
      <h1>Invitations</h1>
      {/* {console.log('rac', textInvitation)} */}
      <form method="post" onSubmit={sendInvitation}>
        <label htmlFor="textInvitation">
          Texte d'invitation
          <textarea
            placeholder="Vous avez récemment appris la disparition de Janine..."
            required
            name="textInvitation"
            id="textInvitation"
            onChange={handleChange}
            value={values.textInvitation || textInvitation}
          />
        </label>
        <label htmlFor="email">
          Adresse e-mail
          <input
            type="email"
            name="email"
            id="email"
            placeholder="test@example.com"
            value={values.email || ''}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Inviter à rejoindre l'espace" />
      </form>
      {isAlreadyInvited && <p>Ce destinataire a déjà été invité</p>}
      {successfulInvitation && <p>Invitation envoyé!</p>}
    </div>
  );
}

export default SpaceSettingsInvitations;
