import React, { useEffect, useState } from 'react'
import "./styles.css"
const Question = ({ question, currQuestion, handleChange, result }) => {
    const handleInputChange = (e, idx, value) => {
        handleChange && handleChange(e.target.value, idx, value)
    }

    return (
        <div className='question__container'>
            <div className='question__inner'>
                <h3 className='question__heading'>{question.category} Quiz</h3>
                <div className='question__box'>
                    <div className='question'>
                        <span>Question {currQuestion + 1}</span>
                        <div>{question.question}</div>
                    </div>
                    <div className='options'>
                        {
                            Object.entries(question.answers).map(([key, value]) => {
                                return (value &&
                                    <div key={key}>
                                        <input className="option" type="radio" onChange={(e) => handleInputChange(e, question.id, value)} name={question.id} id={key} checked={result[question.id]?.givenAnswer === value} value={key} />
                                        <label htmlFor={key}>{value}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question