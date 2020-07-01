import React from 'react';

function TabNav({
  firstTabName,
  setFirstTab,
  secondTabName,
  setSecondTab,
  thirdTabName,
  setThirdTab,
  fourthTabName,
  setFourthTab,
}) {
  return (
    <div>
      <div>
        {fourthTabName ? (
          <button
            type="button"
            onClick={() => {
              setFirstTab(true);
              setSecondTab(false);
              setThirdTab(false);
              setFourthTab(false);
            }}
          >
            {firstTabName}
          </button>
        ) : (
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
        )}
        <button
          type="button"
          onClick={() => {
            setFirstTab(false);
            setSecondTab(true);
            setThirdTab(false);
            setFourthTab(false);
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
            setFourthTab(false);
          }}
        >
          {thirdTabName}
        </button>
        {fourthTabName && (
          <button
            type="button"
            onClick={() => {
              setFirstTab(false);
              setSecondTab(false);
              setThirdTab(false);
              setFourthTab(true);
            }}
          >
            {fourthTabName}
          </button>
        )}
      </div>
    </div>
  );
}

export default TabNav;
