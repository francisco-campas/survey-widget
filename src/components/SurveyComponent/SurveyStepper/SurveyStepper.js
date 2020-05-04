import React from "react";

const SurveyStepper = (props) => {
  const { steps, currentStep } = props;

  return (
    <div className="survey-widget__stepper">
      {[...Array(steps).keys()].map((step) => (
        <div
          key={step}
          className={
            "survey-widget__step " +
            (step <= currentStep ? "survey-widget__step--answered" : "")
          }
        ></div>
      ))}
    </div>
  );
};

export default SurveyStepper;
