import React from 'react'

const SurveyRadioQuestion = (props) => {
    const {options, questionID, onSelect} = props;

    return (
        <div className="survey-widget__radio-wrapper">
            {options.map((option, index) => (
                <label key={index} >
                    <input className="survey-widget__radiobutton" type="radio" name={questionID} value={option} onChange={onSelect}/>
                    {option}
                </label>
                
            ))}
        </div>
    )
}

export default SurveyRadioQuestion;