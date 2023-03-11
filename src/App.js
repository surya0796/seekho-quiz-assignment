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
  const [showResult, setShowResult] = useState(null);

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

  // useEffect(()=>{

  // },[])

  useEffect(() => {
    setClickedList({ ...clickedList, [currQuestion]: true });
  }, [currQuestion]);

  const handleGoToQuestionByNumber = (value) => {
    setCurrQuestion(value);
  };

  useEffect(() => {
    const resultObj = {};
    questions.sort((currObj,nextObj)=>currObj.id-nextObj.id)
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
  const handSubmit = () => {
    let rightAnswers = 0;
    Object.values(result).forEach((answer) => {
      if (answer.isCorrect) {
        rightAnswers += 1;
      }
    });
    const finalScore = Math.round((rightAnswers / questions.length) * 100);
    const wrongAnswers = questions.length - rightAnswers;
    setShowResult({
      correct: rightAnswers,
      incorrect: wrongAnswers,
      result: finalScore,
    });
  };
  useEffect(()=>{
    console.log("result",result)
  },[result])
  return (
    <div className="quiz-app">
      <h1 className="quiz__app__heading">Let's Quizy</h1>
      {!showResult ? (
        <div className="quiz__app__container">
          <div className="quiz__layout quiz__app__result">
            <RealTimeResult handleQuestionClick={handleGoToQuestionByNumber} result={result} />
          </div>
          <div className="quiz__layout quiz__app__inner">
            <div className="next__previous">
              {currQuestion > 0 && (
                <button
                  className="nav__btn prev__btn"
                  onClick={() => handleDecrement(1)}
                >
                  Previous
                </button>
              )}
              {currQuestion < questions.length - 1 && (
                <button
                  className="nav__btn next__btn"
                  onClick={() => handleIncrement(1)}
                >
                  Next
                </button>
              )}
            </div>
            <Question
              question={questions[currQuestion]}
              currQuestion={currQuestion}
              handleChange={handleChange}
              result={result}
            />
            {Object.keys(clickedList).length === questions.length && <button className="nav__btn" onClick={handSubmit}>
              Submit
            </button>}
          </div>
          <QuestionNav
            clickedList={clickedList}
            currQuestion={currQuestion}
            result={result}
            handleQuestionClick={handleGoToQuestionByNumber}
            questions={allQuestion}
          />
        </div>
      ) : (
        <div className="quiz__result quiz__layout">
          <h2>Final Results Are :</h2>
          <div>{showResult.correct}</div>
          <div>{showResult.incorrect}</div>
          <div>{showResult.result}%</div>
        </div>
      )}
    </div>
  );
}

export default App;
