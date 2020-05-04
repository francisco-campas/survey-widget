import React, { useEffect, useState } from "react";
import SurveyRadioQuestion from "./SurveyQuestions/SurveyRadioQuestion";
import SurveySelectQuestion from "./SurveyQuestions/SurveySelectQuestion";

const SurveyComponent = (props) => {
  const { eventId, surveyId, userId, apiUrl } = props;
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const uri = `/api/events/${eventId}/surveys/${surveyId}`;
    fetch(apiUrl + uri)
      .then((res) => res.json())
      .then((r) => {
        console.log("SURVEY", r);
        setSurvey(r);
      });
  }, [eventId, surveyId, userId, apiUrl]);

  useEffect(() => {
    const uri = `/api/events/${eventId}/surveys/${surveyId}/answers/${userId}`;
    fetch(apiUrl + uri)
      .then((res) => res.json())
      .then((r) => {
        console.log("ANSWERS", r.answers);
        setAnswers(r.answers);
      });
  }, [eventId, surveyId, userId, apiUrl]);

  const questionSelect = ({questionID, questionLabel}) => (event) => {

    const answer = {
      uid: userId,
      surveyId,
      eventId,
      questionID,
      questionLabel,
      answer: event.target.value
    }
    
    console.log("ANSWER", answer);
  };

  return (
    <div className="survey-widget">
      {!survey && <div className="survey-widget__loader">Loading...</div>}
      {Boolean(survey) && (
        <>
          <h4 className="survey-widget__title">survey.title</h4>
          {survey.questions.map((question) => (
            <div className="survey-widget__question" key={question.id}>
              <h5>{question.label}</h5>
              {question.type === "radio" && (
                <SurveyRadioQuestion
                  questionID={question.id}
                  options={question.options}
                  onSelect={questionSelect({questionID: question.id, questionLabel: question.label})}
                />
              )}
              {question.type === "select" && (
                <SurveySelectQuestion
                  questionID={question.id}
                  options={question.options}
                  onSelect={questionSelect({questionID: question.id, questionLabel: question.label})}
                />
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SurveyComponent;
