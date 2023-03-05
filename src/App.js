import { useEffect, useState } from "react";
import "./App.css";
import Question from "./components/Question";
import allQuestion from "./components/questionBank.json";
import QuestionNav from "./components/QuestionNav";
import RealTimeResult from "./components/Result/RealTimeResult";

const APIURL = `https://quizapi.io/api/v1/questions?apiKey=${process.env.REACT_APP_QUESTION_API}&category=code&difficulty=Easy&tags=JavaScript`;
function App() {
  const [questions, setQuestions] = useState(allQuestion);
  const [currQuestion, setCurrQuestion] = useState(0);
  const [result, setResult] = useState({});
  const [clickedList, setClickedList] = useState({});

  const handleIncrement = (value) => {
    if (currQuestion < questions.length - 1) {
      setCurrQuestion((prev) => prev + value);
    }
  };
  const handleDecrement = (value) => {
    if (currQuestion > 0) {
      setCurrQuestion((prev) => prev - value);
    }
  };
  useEffect(() => {
    setClickedList({ ...clickedList, [currQuestion]: true });
  }, [currQuestion]);

  const handleGoToQuestionByNumber = (value) => {
    setCurrQuestion(value);
  };
  useEffect(() => {
    console.log(result);
  }, [result]);

  useEffect(() => {
    const resultObj = {};
    questions.forEach((question, idx) => {
      const uniquesId = question.id;
      resultObj[uniquesId] = {
        id: question.id,
        name: `Question ${idx + 1}`,
        correctAnswer: question.correct_answer,
        givenAnswer: "",
        isCorrect: false,
      };
    });
    setResult(resultObj);
  }, [questions]);

  const handleChange = (value, idx, selectedValue) => {
    result[idx].givenAnswer = selectedValue;
    if (result[idx].correctAnswer === value) {
      result[idx].isCorrect = true;
    }
    setResult({ ...result });
  };

  return (
    <div className="quiz-app">
      <h1 className="quiz__app__heading">Let's Quizy</h1>
      <div className="quiz__app__container">
        <div className="quiz__layout quiz__app__result">
          <RealTimeResult result={result} />
        </div>
        <div className="quiz__layout quiz__app__inner">
          <div className="next__previous">
            <button
              className="nav__btn prev__btn"
              onClick={() => handleDecrement(1)}
            >
              Previous
            </button>
            <button
              className="nav__btn next__btn"
              onClick={() => handleIncrement(1)}
            >
              Next
            </button>
          </div>
          <Question
            question={questions[currQuestion]}
            currQuestion={currQuestion}
            handleChange={handleChange}
            result={result}
          />
        </div>
        <QuestionNav
          clickedList={clickedList}
          currQuestion={currQuestion}
          handleQuestionClick={handleGoToQuestionByNumber}
          questions={allQuestion}
        />
      </div>
    </div>
  );
}

export default App;
