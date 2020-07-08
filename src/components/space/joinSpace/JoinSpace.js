import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SpaceService from '../../../services/SpaceService';
import { useForm, toFormData } from '../../../utils/forms';
import EndPartContainer from '../../utilsTemplates/endPartContainer/EndPartContainer';
import ErrorImage from '../../../assets/svg/door-guy.svg';

function JoinSpace({
  spaceId,
  spaceErrorMessage,
  showSubscriberButton,
  showInvitedUserButton,
  messageButton,
}) {
  const [requestAccessValues, handlerequestAccessChange] = useForm();
  const [isUserAlreadyRequestAccess, setUserAlreadyRequestAccess] = useState(
    false
  );
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [joinSpace, setJoinSpace] = useState(true);

  async function sendRequestAccess(event) {
    event.preventDefault();
    const data = toFormData(requestAccessValues);
    const result = await SpaceService.subcribeToSpace(spaceId, data);
    console.log('rt', result);
    if (result === 'USER_ALREADY_REQUEST_SUBSCRIPTION') {
      setUserAlreadyRequestAccess(true);
      setSubscribeMessage('');
    } else {
      setJoinSpace(false);
      setSubscribeMessage('Votre demande a bien été envoyé');
    }
  }
  console.log('joinspace', joinSpace);
  return (
    <div>
      {joinSpace ? (
        <EndPartContainer
          joinSpace={joinSpace}
          setJoinSpace={setJoinSpace}
          spaceErrorMessage={spaceErrorMessage}
          sendRequestAccess={sendRequestAccess}
          requestAccessValues={requestAccessValues}
          handlerequestAccessChange={handlerequestAccessChange}
          showSubscriberButton={showSubscriberButton}
          messageButton={messageButton}
          subscribeMessage={subscribeMessage}
          showInvitedUserButton={showInvitedUserButton}
        />
      ) : (
        <EndPartContainer
          endMessage={subscribeMessage}
          endButtonLink="/account"
          endButtonText="Revenir a mes espaces"
        />
      )}
    </div>
  );
}

export default JoinSpace;
