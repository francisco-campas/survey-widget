import React, { useEffect, useState } from "react";

const SurveyComponent = (props) => {
  const { eventId, surveyId, userId } = props;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const uri = `/api/events/${eventId}/surveys/${surveyId}`;
    fetch(process.env.REACT_APP_FIREBASE_API_URL + uri)
      .then((res) => res.json())
      .then((q) => {
          console.log('QUESTIONS', q.questions)
          setQuestions(q.questions)
      });
  }, [eventId, surveyId, userId]);

  return (
    <>
      {questions.map((question) => (
        <h2>{question.label}</h2>
      ))}
    </>
  );
};

export default SurveyComponent;
