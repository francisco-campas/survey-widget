import React, { useEffect, useState, useCallback } from "react";
import SurveyRadioQuestion from "./SurveyQuestions/SurveyRadioQuestion";
import SurveySelectQuestion from "./SurveyQuestions/SurveySelectQuestion";
import './SurveyComponent.css';

const SurveyComponent = (props) => {
  const { eventId, surveyId, userId, apiUrl } = props;
  const [survey, setSurvey] = useState(null);
  const [steps, setSteps] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const fetchAnswersAndQuestions = async (componentDidMount = false) => {
    const surveyUri = `/api/events/${eventId}/surveys/${surveyId}`;
    const answerUri = `/api/events/${eventId}/surveys/${surveyId}/answers/${userId}`;

    const [survey, answer] = await Promise.all(
      [surveyUri, answerUri].map((uri) =>
        fetch(apiUrl + uri).then((res) => res.json())
      )
    );

    survey.questions = survey.questions.map((question) => {
      const isAnswered =
        answer.answers &&
        answer.answers.find((a) => a.questionID === question.id);

      return {
        ...question,
        isAnswered: Boolean(isAnswered),
      };
    });

    const answeredCount = survey.questions
      .map((question) => question.isAnswered)
      .filter(Boolean).length;

    console.log(
      "COMPONENT DID MOUNT",
      componentDidMount,
      isDone,
      survey.questions.length,
      answeredCount
    );
    if (componentDidMount && survey.questions.length === answeredCount) {
      setIsDone(true);
    }

    setSurvey(survey);
    setSteps(survey.questions.length);
    setCurrentStep(answeredCount);
  };

  const fetchAnswersAndQuestionsCallback = useCallback(
    fetchAnswersAndQuestions
  );

  useEffect(() => {
    fetchAnswersAndQuestionsCallback(true);
  }, []);

  const questionSelect = ({ questionID, questionLabel }) => (event) => {
    const answer = {
      uid: userId,
      surveyId,
      eventId,
      questionID,
      questionLabel,
      answer: event.target.value,
    };

    fetch(apiUrl + "/api/answers", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    }).then(() => fetchAnswersAndQuestionsCallback());
  };

  return (
    <div className="survey-widget">
      {!survey && <div className="survey-widget__loader">Loading...</div>}
      {Boolean(survey) && currentStep !== steps && (
        <>
          <h4 className="survey-widget__title">{survey.title}</h4>
          {survey.questions.map((question, index) => (
            <div className="survey-widget__question" key={question.id}>
              {index === currentStep && (
                <>
                  <h5 className="survey-widget__question question__label">{question.label}</h5>
                  {question.type === "radio" && (
                    <SurveyRadioQuestion
                      questionID={question.id}
                      options={question.options}
                      onSelect={questionSelect({
                        questionID: question.id,
                        questionLabel: question.label,
                      })}
                    />
                  )}
                  {question.type === "select" && (
                    <SurveySelectQuestion
                      questionID={question.id}
                      options={question.options}
                      onSelect={questionSelect({
                        questionID: question.id,
                        questionLabel: question.label,
                      })}
                    />
                  )}
                </>
              )}
            </div>
          ))}
          <div className="survey-widget__steps">
            {currentStep}/{steps}
          </div>
        </>
      )}
      {Boolean(survey) && (
        <>
          {currentStep === steps && !isDone && (
            <div className="survey-widget__message">Thank You</div>
          )}
          {isDone && <div className="survey-widget__message">Done</div>}
        </>
      )}
    </div>
  );
};

export default SurveyComponent;
