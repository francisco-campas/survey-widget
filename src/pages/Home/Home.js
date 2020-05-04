import React, { useState } from "react";
import SurveyComponent from "../../components/SurveyComponent/SurveyComponent";
import "./Home.css";

const eventId = "F824Bb7abtQpvv07kjrX";
const surveyId = "qpSogKlTVVQSTgJ5Aakb";
const userId = "1wewd9asdasdnas9as";
const apiUrl = process.env.REACT_APP_FIREBASE_API_URL;

const Home = (props) => {
  const [loading, setLoading] = useState(false);

  function refreshWidget() {
    setLoading(true);
    const uri = `/api/events/${eventId}/surveys/${surveyId}/answers/${userId}`;
    fetch(apiUrl + uri, { method: "DELETE" }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Page with survey</h1>
      <p
        onClick={refreshWidget}
        style={{ cursor: "pointer", "text-decoration": "underline" }}
      >
        Click to refresh widget state
      </p>
      {!loading && (
        <div className="home__wrapper">
          <SurveyComponent
            eventId={eventId}
            surveyId={surveyId}
            userId={userId}
            apiUrl={apiUrl}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
