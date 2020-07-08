import React from 'react';
import './_stepHome.scss';

function StepHome({ stepLogo, stepText, stepClass }) {
  return (
    <section>
      <div
        className={
          stepClass
            ? `step section__content ${stepClass}`
            : `step section__content`
        }
      >
        <div className="step--text">
          <img className="step--text--logo" src={stepLogo} alt="step logo" />
          <h1 className="step--text--title">{stepText}</h1>
        </div>
      </div>
    </section>
  );
}

export default StepHome;
