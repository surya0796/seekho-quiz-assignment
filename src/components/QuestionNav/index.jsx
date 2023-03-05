import "./styles.css"

const QuestionNav = ({ questions, currQuestion, handleQuestionClick, clickedList }) => {
    let questionsList = []
    const goToQuestion = (value) => {
        handleQuestionClick && handleQuestionClick(value)
    }

    if (questions.length > 0) {
        questionsList = questions.map((question, idx) => {
            return <div className={`question__number ${clickedList[idx] ? 'clicked' : ''} ${currQuestion === idx ? 'active' : ''}`} onClick={() => goToQuestion(idx)} key={question.id}><span className='number'>{idx + 1}</span></div>
        })
    }
    else {
        questionsList = ["No Questions"]
    }

    return (
        <div className='quiz__layout quiz__nav'>
            <h3 className='quiz__nav__heading'>Question {currQuestion + 1}/ {questions.length}</h3>
            <div className='quiz__nav__list'>
                {questionsList}
            </div>
        </div>
    )
}

export default QuestionNav