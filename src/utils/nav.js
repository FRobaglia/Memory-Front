import React from 'react';

function Nav({
  firstTabName,
  setFirstTab,
  secondTabName,
  setSecondTab,
  thirdTabName,
  setThirdTab,
}) {
  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => {
            setFirstTab(true);
            setSecondTab(false);
            setThirdTab(false);
          }}
        >
          {firstTabName}
        </button>
        <button
          type="button"
          onClick={() => {
            setFirstTab(false);
            setSecondTab(true);
            setThirdTab(false);
          }}
        >
          {secondTabName}
        </button>
        <button
          type="button"
          onClick={() => {
            setFirstTab(false);
            setSecondTab(false);
            setThirdTab(true);
          }}
        >
          {thirdTabName}
        </button>
      </div>
    </div>
  );
}

export default Nav;
