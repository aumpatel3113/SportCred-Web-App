import React, { useEffect, useState } from 'react';
import './SoloTrivia.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios'

const SoloTrivia = () => {

    const [showCounter, setShowCounter] = useState(true);

    // 3s COUNTDOWN BEFORE TRIVIA STARTS
    const [pregameCounter, setPregameCounter] = React.useState(3);
    React.useEffect(() => {
        const preGameTimer =
            pregameCounter > 0 && setInterval(() => setPregameCounter(pregameCounter - 1), 1000);

        if (pregameCounter === 0) {
            setShowCounter(false)
        }

        return () => clearInterval(preGameTimer);
    }, [pregameCounter]);

    const [Data, setData] = useState({
        question1: '',
        answer1Option1: '',
        answer1Option2: '',
        answer1Option3: '',
        answer1Option4: '',

        question2: '',
        answer2Option1: '',
        answer2Option2: '',
        answer2Option3: '',
        answer2Option4: '',

        question3: '',
        answer3Option1: '',
        answer3Option2: '',
        answer3Option3: '',
        answer3Option4: '',

        question4: '',
        answer4Option1: '',
        answer4Option2: '',
        answer4Option3: '',
        answer4Option4: '',

        question5: '',
        answer5Option1: '',
        answer5Option2: '',
        answer5Option3: '',
        answer5Option4: '',

        question6: '',
        answer6Option1: '',
        answer6Option2: '',
        answer6Option3: '',
        answer6Option4: '',

        question7: '',
        answer7Option1: '',
        answer7Option2: '',
        answer7Option3: '',
        answer7Option4: '',

        question8: '',
        answer8Option1: '',
        answer8Option2: '',
        answer8Option3: '',
        answer8Option4: '',

        question9: '',
        answer9Option1: '',
        answer9Option2: '',
        answer9Option3: '',
        answer9Option4: '',

        question10: '',
        answer10Option1: '',
        answer10Option2: '',
        answer10Option3: '',
        answer10Option4: '',
    })
    const [PostError, setPostError] = useState(false)

    // FETCHES QUIZ DATA FROM DB
    useEffect(() => {

        const url = 'http://localhost:8080/api/v1/getSoloTrivia'
        const headers = {
            'Content-Type': 'text/plain',
        }

        axios.post(url, { 'numQuestions': '10' }, { headers }
        )
            .then(res => {
                //console.log(res.data.questionList)
                let questionListData = res.data.questionList;
                setData({
                    question1: questionListData[0].question,
                    answer1Option1: questionListData[0].answerOptions[0],
                    answer1Option2: questionListData[0].answerOptions[1],
                    answer1Option3: questionListData[0].answerOptions[2],
                    answer1Option4: questionListData[0].answerOptions[3],

                    question2: questionListData[1].question,
                    answer2Option1: questionListData[1].answerOptions[0],
                    answer2Option2: questionListData[1].answerOptions[1],
                    answer2Option3: questionListData[1].answerOptions[2],
                    answer2Option4: questionListData[1].answerOptions[3],

                    question3: questionListData[2].question,
                    answer3Option1: questionListData[2].answerOptions[0],
                    answer3Option2: questionListData[2].answerOptions[1],
                    answer3Option3: questionListData[2].answerOptions[2],
                    answer3Option4: questionListData[2].answerOptions[3],

                    question4: questionListData[3].question,
                    answer4Option1: questionListData[3].answerOptions[0],
                    answer4Option2: questionListData[3].answerOptions[1],
                    answer4Option3: questionListData[3].answerOptions[2],
                    answer4Option4: questionListData[3].answerOptions[3],

                    question5: questionListData[4].question,
                    answer5Option1: questionListData[4].answerOptions[0],
                    answer5Option2: questionListData[4].answerOptions[1],
                    answer5Option3: questionListData[4].answerOptions[2],
                    answer5Option4: questionListData[4].answerOptions[3],

                    question6: questionListData[5].question,
                    answer6Option1: questionListData[5].answerOptions[0],
                    answer6Option2: questionListData[5].answerOptions[1],
                    answer6Option3: questionListData[5].answerOptions[2],
                    answer6Option4: questionListData[5].answerOptions[3],

                    question7: questionListData[6].question,
                    answer7Option1: questionListData[6].answerOptions[0],
                    answer7Option2: questionListData[6].answerOptions[1],
                    answer7Option3: questionListData[6].answerOptions[2],
                    answer7Option4: questionListData[6].answerOptions[3],

                    question8: questionListData[7].question,
                    answer8Option1: questionListData[7].answerOptions[0],
                    answer8Option2: questionListData[7].answerOptions[1],
                    answer8Option3: questionListData[7].answerOptions[2],
                    answer8Option4: questionListData[7].answerOptions[3],

                    question9: questionListData[8].question,
                    answer9Option1: questionListData[8].answerOptions[0],
                    answer9Option2: questionListData[8].answerOptions[1],
                    answer9Option3: questionListData[8].answerOptions[2],
                    answer9Option4: questionListData[8].answerOptions[3],

                    question10: questionListData[9].question,
                    answer10Option1: questionListData[9].answerOptions[0],
                    answer10Option2: questionListData[9].answerOptions[1],
                    answer10Option3: questionListData[9].answerOptions[2],
                    answer10Option4: questionListData[9].answerOptions[3]
                })
            })
            .catch(err => {
                setPostError(true)
                //console.log(err);
            })
    }, [])

    var questions = [
        {
            "question": Data.question1,
            "answerOptions": [
                {
                    "answerText": Data.answer1Option1.answerText,
                    "isCorrect": Data.answer1Option1.isCorrect
                },
                {
                    "answerText": Data.answer1Option2.answerText,
                    "isCorrect": Data.answer1Option2.isCorrect
                },
                {
                    "answerText": Data.answer1Option3.answerText,
                    "isCorrect": Data.answer1Option3.isCorrect
                },
                {
                    "answerText": Data.answer1Option4.answerText,
                    "isCorrect": Data.answer1Option4.isCorrect
                }
            ]
        },
        {
            "question": Data.question2,
            "answerOptions": [
                {
                    "answerText": Data.answer2Option1.answerText,
                    "isCorrect": Data.answer2Option1.isCorrect
                },
                {
                    "answerText": Data.answer2Option2.answerText,
                    "isCorrect": Data.answer2Option2.isCorrect
                },
                {
                    "answerText": Data.answer2Option3.answerText,
                    "isCorrect": Data.answer2Option3.isCorrect
                },
                {
                    "answerText": Data.answer2Option4.answerText,
                    "isCorrect": Data.answer2Option4.isCorrect
                }
            ]
        },
        {
            "question": Data.question3,
            "answerOptions": [
                {
                    "answerText": Data.answer3Option1.answerText,
                    "isCorrect": Data.answer3Option1.isCorrect
                },
                {
                    "answerText": Data.answer3Option2.answerText,
                    "isCorrect": Data.answer3Option2.isCorrect
                },
                {
                    "answerText": Data.answer3Option3.answerText,
                    "isCorrect": Data.answer3Option3.isCorrect
                },
                {
                    "answerText": Data.answer3Option4.answerText,
                    "isCorrect": Data.answer3Option4.isCorrect
                }
            ]
        },
        {
            "question": Data.question4,
            "answerOptions": [
                {
                    "answerText": Data.answer4Option1.answerText,
                    "isCorrect": Data.answer4Option1.isCorrect
                },
                {
                    "answerText": Data.answer4Option2.answerText,
                    "isCorrect": Data.answer4Option2.isCorrect
                },
                {
                    "answerText": Data.answer4Option3.answerText,
                    "isCorrect": Data.answer4Option3.isCorrect
                },
                {
                    "answerText": Data.answer4Option4.answerText,
                    "isCorrect": Data.answer4Option4.isCorrect
                }
            ]
        },
        {
            "question": Data.question5,
            "answerOptions": [
                {
                    "answerText": Data.answer5Option1.answerText,
                    "isCorrect": Data.answer5Option1.isCorrect
                },
                {
                    "answerText": Data.answer5Option2.answerText,
                    "isCorrect": Data.answer5Option2.isCorrect
                },
                {
                    "answerText": Data.answer5Option3.answerText,
                    "isCorrect": Data.answer5Option3.isCorrect
                },
                {
                    "answerText": Data.answer5Option4.answerText,
                    "isCorrect": Data.answer5Option4.isCorrect
                }
            ]
        },
        {
            "question": Data.question6,
            "answerOptions": [
                {
                    "answerText": Data.answer6Option1.answerText,
                    "isCorrect": Data.answer6Option1.isCorrect
                },
                {
                    "answerText": Data.answer6Option2.answerText,
                    "isCorrect": Data.answer6Option2.isCorrect
                },
                {
                    "answerText": Data.answer6Option3.answerText,
                    "isCorrect": Data.answer6Option3.isCorrect
                },
                {
                    "answerText": Data.answer6Option4.answerText,
                    "isCorrect": Data.answer6Option4.isCorrect
                }
            ]
        },
        {
            "question": Data.question7,
            "answerOptions": [
                {
                    "answerText": Data.answer7Option1.answerText,
                    "isCorrect": Data.answer7Option1.isCorrect
                },
                {
                    "answerText": Data.answer7Option2.answerText,
                    "isCorrect": Data.answer7Option2.isCorrect
                },
                {
                    "answerText": Data.answer7Option3.answerText,
                    "isCorrect": Data.answer7Option3.isCorrect
                },
                {
                    "answerText": Data.answer7Option4.answerText,
                    "isCorrect": Data.answer7Option4.isCorrect
                }
            ]
        },
        {
            "question": Data.question8,
            "answerOptions": [
                {
                    "answerText": Data.answer8Option1.answerText,
                    "isCorrect": Data.answer8Option1.isCorrect
                },
                {
                    "answerText": Data.answer8Option2.answerText,
                    "isCorrect": Data.answer8Option2.isCorrect
                },
                {
                    "answerText": Data.answer8Option3.answerText,
                    "isCorrect": Data.answer8Option3.isCorrect
                },
                {
                    "answerText": Data.answer8Option4.answerText,
                    "isCorrect": Data.answer8Option4.isCorrect
                }
            ]
        },
        {
            "question": Data.question9,
            "answerOptions": [
                {
                    "answerText": Data.answer9Option1.answerText,
                    "isCorrect": Data.answer9Option1.isCorrect
                },
                {
                    "answerText": Data.answer9Option2.answerText,
                    "isCorrect": Data.answer9Option2.isCorrect
                },
                {
                    "answerText": Data.answer9Option3.answerText,
                    "isCorrect": Data.answer9Option3.isCorrect
                },
                {
                    "answerText": Data.answer9Option4.answerText,
                    "isCorrect": Data.answer9Option4.isCorrect
                }
            ]
        },
        {
            "question": Data.question10,
            "answerOptions": [
                {
                    "answerText": Data.answer10Option1.answerText,
                    "isCorrect": Data.answer10Option1.isCorrect
                },
                {
                    "answerText": Data.answer10Option2.answerText,
                    "isCorrect": Data.answer10Option2.isCorrect
                },
                {
                    "answerText": Data.answer10Option3.answerText,
                    "isCorrect": Data.answer10Option3.isCorrect
                },
                {
                    "answerText": Data.answer10Option4.answerText,
                    "isCorrect": Data.answer10Option4.isCorrect
                }
            ]
        },
    ]

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [sendResults, setSendResults] = useState(0);
    const [score, setScore] = useState(0);

    // CHECKS IF THE USER INPUT IS A CORRECT ANSWER
    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setCounter(14)
        } else {
            setShowScore(true);
            setSendResults(1);
        }
    };

    // 14s TIMER PER QUESTION
    const [counter, setCounter] = React.useState(14);
    useEffect(() => {
        const timer = counter >= 0 && setInterval(() => setCounter(counter - 1), 1000);

        if (counter === -1) {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
                setCounter(14)
            } else {
                setShowScore(true);
                setSendResults(1);
            }
        }

        return () => clearInterval(timer);
    }, [counter]);

    // SEND RESULTS BACK TO DB
    useEffect(() => {
        if (sendResults === 1) {
            const url = 'http://localhost:8080/api/v1/sendFinalSoloScore'
            const headers = {
                'Content-Type': 'text/plain',
            }
            
            axios.post(url, { 'username': btoa(sessionStorage.getItem('username')), 'correctAnswers': score, 'totalAnswers': '10' }, { headers }
            )
                .then(res => {
                    console.log(res.data)
                })
        }

    }, [sendResults])

    return (
        <div className='quiz-app'>
            {PostError ? (
                <div className='post-error'>
                    <h1>Oops.. An error occured fetching the trivia data. :(</h1>
                    <div className='back'><p><NavLink exact to='/trivia'>back</NavLink></p></div>
                </div>
            ) : (
                    <>
                        {showCounter ? (
                            <div className='game-counter'>
                                <h3>Ready?</h3>
                                <div><p>{pregameCounter}</p></div>
                            </div>

                        ) : (
                                <>
                                    { showScore ? (
                                        <div className='score-section-solo'>
                                            <h1>You scored {score} out of {questions.length}.</h1>
                                            <p><NavLink exact to='/trivia/solo'>Play Again?</NavLink></p>
                                            <p><NavLink exact to='/trivia'>Back to Trivia</NavLink></p>
                                            <p><NavLink exact to='/'>Home</NavLink></p>
                                        </div>
                                    ) : (
                                            <>
                                                <div className='question-section'>
                                                    <div className='question-count'>
                                                        <span>Question {currentQuestion + 1}</span>
                                                    </div>
                                                    <div className='question-text'>{questions[currentQuestion].question}</div>
                                                </div>
                                                <div className='answer-section'>
                                                    {questions[currentQuestion].answerOptions.map((answerOption) => (
                                                        <button className = 'quiz-button'onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                                                    ))}
                                                </div>
                                                <div className='timer'>
                                                    <div>{counter}s</div>
                                                </div>
                                            </>
                                        )}
                                </>
                            )}
                    </>
                )}
        </div>
    );

}

export default SoloTrivia;
