import React from 'react'
import "./styles.css"
const RealTimeResult = ({ result }) => {
    return (
        <div className='result'>
            <h3>Results</h3>
            {
                Object.values(result).map((reslt) => {
                    return (reslt.givenAnswer && 
                        <div key={reslt.id} className='result'>
                            Question : {reslt.givenAnswer}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RealTimeResult