import React from 'react';
import SurveyComponent from '../../components/SurveyComponent/SurveyComponent';
import './Home.css';

const Home = (props) => (
    <div>
        <h1>Page with survey</h1>
        <div className="home__wrapper">
            <SurveyComponent 
                eventId="F824Bb7abtQpvv07kjrX" 
                surveyId="qpSogKlTVVQSTgJ5Aakb" 
                userId="1wewd9asdasdnas9as"
                apiUrl={process.env.REACT_APP_FIREBASE_API_URL}
            />
        </div>
    </div>
)

export default Home;