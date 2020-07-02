import React, { useContext, useState, useRef } from 'react';
import SpaceContext from '../../../context/SpaceContext';

function SpaceAddMembers() {
  const { value } = useContext(SpaceContext);
  const spaceUrl = `https://memory-hetic.netlify.app/space/${value.space.firstName}-${value.space.lastName}-${value.space.id}/`;
  const [copySuccess, setCopySuccess] = useState(false);
  const input = useRef();
  const [buttonValue, setButtonValue] = useState('Copier');

  function copyToClipboard() {
    console.log(input);
    input.current.select();
    document.execCommand('copy');
    setButtonValue('Copié');
    setCopySuccess(true);
  }

  return (
    <div>
      <h1>Invite un membre</h1>
      <p>
        Tu connais un proche qui aimerait bien partager un souvenir ? Envoie le
        lien qu'il puisse demander l'acces
      </p>
      <input
        ref={input}
        type="text"
        value={spaceUrl}
        data-clipboard={spaceUrl}
      />
      <button type="button" onClick={() => copyToClipboard()}>
        {buttonValue}
      </button>
      {copySuccess ? <p style={{ color: 'green' }}>Lien copié</p> : null}
    </div>
  );
}

export default SpaceAddMembers;
