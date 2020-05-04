import React from 'react';
import SurveyRadioQuestion from "./SurveyRadioQuestion";
import SurveySelectQuestion from "./SurveySelectQuestion";

const questionStrategy = {
    'radio': SurveyRadioQuestion,
    'select': SurveySelectQuestion,
}

const SurveyQuestion = (props) => {
    const {type, ...questiopnProps} = props;
    const Question = questionStrategy[type] || SurveyRadioQuestion;

    return <Question {...questiopnProps}/>
}

export default SurveyQuestion;