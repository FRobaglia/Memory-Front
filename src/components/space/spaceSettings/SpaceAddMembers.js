import React, { useContext, useState, useRef } from 'react';
import SpaceContext from '../../../context/SpaceContext';
import '../../../styles/layout/_forms.scss';

function SpaceAddMembers() {
  const { value } = useContext(SpaceContext);
  const spaceUrl = `https://memory-hetic.netlify.app/space/${value.space.firstName}-${value.space.lastName}-${value.space.id}`;
  const [copySuccess, setCopySuccess] = useState(false);
  const input = useRef();

  function copyToClipboard() {
    input.current.select();
    document.execCommand('copy');
    setCopySuccess(true);
  }

  return (
    <section className="section section--invitation invitation">
      <div className="section__content">
        <h2>Inviter une nouvelle personne</h2>
        <div className="textGroup">
          <p className="text">
            Vous connaissez un proche qui aimerait bien partager un souvenir ?
            Envoyez lui le lien qu'il puisse demander l'accès
          </p>
          <div className="shareLink__group">
            <div className="input">
              <label htmlFor="text" className="input__label">
                Lien de partage
              </label>
              <input
                className="input__field spaceMembers__add--input"
                ref={input}
                type="text"
                value={spaceUrl}
                data-clipboard={spaceUrl}
              />
            </div>
            <button
              aria-label="share"
              className="button-shareLink"
              type="button"
              onClick={() => copyToClipboard()}
            />
          </div>
          <p className="text spaceMembers__add--aware">
            Attention : la personne que vous souhaitez inviter pourra accéder à
            l'espace après validation du manager.
          </p>
          {copySuccess ? <p style={{ color: 'green' }}>Lien copié</p> : null}
        </div>
      </div>
    </section>
  );
}

export default SpaceAddMembers;
