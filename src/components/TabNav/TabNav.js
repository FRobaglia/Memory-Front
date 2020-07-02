import React from 'react';

function TabNav({
  firstTabLabel,
  setFirstTab,
  secondTabLabel,
  setSecondTab,
  thirdTabLabel,
  setThirdTab,
  fourthTabLabel,
  setFourthTab,
}) {
  return (
    <div>
      <div>
        {fourthTabLabel ? (
          <button
            type="button"
            onClick={() => {
              setFirstTab(true);
              setSecondTab(false);
              setThirdTab(false);
              setFourthTab(false);
            }}
          >
            {firstTabLabel}
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
            {firstTabLabel}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setFirstTab(false);
            setSecondTab(true);
            setThirdTab(false);
          }}
        >
          {secondTabLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            setFirstTab(false);
            setSecondTab(false);
            setThirdTab(true);
          }}
        >
          {thirdTabLabel}
        </button>
        {fourthTabLabel && (
          <button
            type="button"
            onClick={() => {
              setFirstTab(false);
              setSecondTab(false);
              setThirdTab(false);
              setFourthTab(true);
            }}
          >
            {fourthTabLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default TabNav;
