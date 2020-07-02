import React from 'react';
import { useForm, toFormData } from '../../../utils/forms';
import SpaceService from '../../../services/SpaceService';

function SpaceSettingsInvitations() {
  const [values, handleChange] = useForm();

  const spaceId = window.location.href
    .split('/')[4]
    .substring(window.location.href.split('/')[4].lastIndexOf('-') + 1);

  async function sendInvitation(e) {
    e.preventDefault();
    console.log(values);
    const data = toFormData(values);
    await SpaceService.createInvitation(spaceId, data);
  }

  return (
    <div>
      <form method="post" onSubmit={sendInvitation}>
        <label htmlFor="textInvitation">
          Texte d'invitation
          <textarea
            placeholder="Vous avez récemment appris la disparition de Janine..."
            required
            name="textInvitation"
            id="textInvitation"
            onChange={handleChange}
            value={values.textInvitation || ''}
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
    </div>
  );
}

export default SpaceSettingsInvitations;
