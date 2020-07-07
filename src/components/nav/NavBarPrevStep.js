import React, { forwardRef } from 'react';
import iconReturn from '../../assets/icons/icon--return.svg';

const NavBarPrevStep = forwardRef((props, ref) => {
  // function handlePrevStep() {
  //   console.log('tik');
  //   let wrapper = wrapperScroll.current;
  //   if (count < 5) {
  //     wrapper.style.transform = `translateX(-${count * -100}vw)`;
  //   }
  // }

  return (
    <nav
      className="userAccount__navContainer header__main"
      onClick={props.handlePrevStep}
      ref={ref}
    >
      <ul className="userAccount__nav">
        <li>
          <img
            src={iconReturn}
            alt="return"
            className="userAccount__nav--logo"
          />
        </li>
      </ul>
    </nav>
  );
});

export default NavBarPrevStep;
