import React from "react";

const SurveySelectQuestion = (props) => {
  const { options, questionID, onSelect } = props;

  return (
    <div className="survey-widget__question-wrapper survey-widget__radio-wrapper">
      <select
        className="survey-widget__select"
        name={questionID}
        onChange={onSelect}
      >
        {options.map((option, index) => (
          <option
            key={index}
            className="survey-widget__radiobutton"
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SurveySelectQuestion;
