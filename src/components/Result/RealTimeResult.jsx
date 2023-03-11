import React from 'react'
import "./styles.css"
const RealTimeResult = ({ result,handleQuestionClick }) => {
    const goToQuestion = (value) => {
        handleQuestionClick && handleQuestionClick(value)
    }
    return (
        <div className='result'>
            <h3>Results</h3>
            {
                Object.values(result).map((reslt,idx) => {
                    return (reslt.givenAnswer && 
                        <div onClick={() => goToQuestion(reslt.name.split(' ')[1] - 1)} key={reslt.id} className='result'>
                            {reslt.name} : {reslt.givenAnswer}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RealTimeResult