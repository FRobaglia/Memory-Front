import React from 'react';
import { Link } from 'react-router-dom';

function NavSettings({ space }) {
  return (
    <div>
      {console.log(space)}
      <nav>
        <Link
          to={{
            pathname: `/space/${space.firstName}-${space.lastName}-${space.id}/settings/general`,
          }}
        >
          Générales
        </Link>
        <Link
          to={`/space/${space.firstName}-${space.lastName}-${space.id}/settings/invite`}
        >
          Invitation
        </Link>
      </nav>
    </div>
  );
}

export default NavSettings;
