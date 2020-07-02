import React, { useContext, useEffect } from 'react';
import { Tabs, useTabState, usePanelState } from '@bumaga/tabs';
import SpaceContext from '../../context/SpaceContext';
import SpaceService from '../../services/SpaceService';
import SpaceSettingsMembers from '../../components/settings/spaceSettings/SpaceSettingsMembers';
import SpaceAddMembers from '../../components/settings/spaceSettings/SpaceAddMembers';

function SpaceMembersPage() {
  const { value, setValue } = useContext(SpaceContext);

  useEffect(() => {
    getFocusedSpace();
  }, []);

  async function getFocusedSpace() {
    const result = await SpaceService.focusSpace(spaceId);
    setValue(result);
  }

  const Tab = ({ children }) => {
    const { onClick } = useTabState();

    return (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    );
  };

  const Panel = ({ children }) => {
    const isActive = usePanelState();

    return isActive ? <div>{children}</div> : null;
  };
  const spaceId = window.location.href
    .split('/')[4]
    .substring(window.location.href.split('/')[4].lastIndexOf('-') + 1);

  return (
    <div>
      <Tabs>
        <div>
          <Tab>Membres</Tab>
          <Tab>Ajouter un membre</Tab>
        </div>
        <Panel>
          <SpaceSettingsMembers />
        </Panel>
        <Panel>
          <SpaceAddMembers />
        </Panel>
      </Tabs>
    </div>
  );
}

export default SpaceMembersPage;
