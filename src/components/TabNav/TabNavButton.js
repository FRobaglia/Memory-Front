import React, { useState } from 'react';

function TabNavButton({
  firstTab,
  secondTab,
  thirdTab,
  fourthTab,
  firstTabLabel,
  secondTabLabel,
  thirdTabLabel,
  fourthTabLabel,
  tabNumber,
}) {
  const [firstTabIsChecked, setFirstTabIsChecked] = useState(firstTab);
  const [secondTabIsChecked, setSecondTabIsChecked] = useState(secondTab);
  const [thirdTabIsChecked, setThirdTabIsChecked] = useState(thirdTab);
  const [fourthTabIsChecked, setFourthTabIsChecked] = useState(fourthTab);
  const [button, setButton] = useState({
    tabIsChecked: '',
    tabLabel: '',
  });
  const buttonArray = [];

  function tabExist() {
    if (tabNumber === 2) {
      setFirstTabIsChecked(false);
      setSecondTabIsChecked(true);
    } else if (tabNumber === 3) {
      setFirstTabIsChecked(false);
      setSecondTabIsChecked(false);
      setThirdTabIsChecked(true);
    } else if (tabNumber === 4) {
      setFirstTabIsChecked(false);
      setSecondTabIsChecked(false);
      setThirdTabIsChecked(false);
      setFourthTabIsChecked(true);
    }
  }
  function createButton() {
    for (let i = 0; i < tabNumber; i += 1) {
      // switch (i) {
      //   case i === 1:
      //     setButton({
      //       buttontabIsChecked: firstTabIsChecked,
      //       tabLabel: firstTabLabel,
      //     });
      //     break;
      //   case i === 2:
      //     setButton({
      //       buttontabIsChecked: secondTabIsChecked,
      //       tabLabel: secondTabLabel,
      //     });
      //     break;
      //   case i === 3:
      //     setButton({
      //       buttontabIsChecked: thirdTabIsChecked,
      //       tabLabel: thirdTabLabel,
      //     });
      //     break;
      //   case i === 4:
      //     setButton({
      //       buttontabIsChecked: fourthTabIsChecked,
      //       tabLabel: fourthTabLabel,
      //     });
      //     break;
      //   default:
      //     setButton({
      //       buttontabIsChecked: firstTabIsChecked,
      //       tabLabel: firstTabLabel,
      //     });
      // }
      buttonArray.push({ ...button });
    }
  }

  return (
    <div>
      {createButton()}
      {buttonArray.map((buttonInfos, index) => {
        console.log(buttonInfos);
        return (
          <div key={index}>
            <input
              type="button"
              id={buttonInfos.tabLabel}
              checked={buttonInfos.tabIsChecked}
              onChange={tabExist}
            />
            <label htmlFor={buttonInfos.tabLabel}>{buttonInfos.tabLabel}</label>
          </div>
        );
      })}
    </div>
  );
}

export default TabNavButton;
