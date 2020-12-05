import React, { useEffect, useState } from 'react';
import './OnlineChallengeTrivia.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios'

const OnlineChallengeTrivia = () => {
    const [notValidPlaySession, setNotValidPlaySession] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem('numOnlinePlayed') > 5) {
            setNotValidPlaySession(true)
        } else {
            sessionStorage.setItem('numOnlinePlayed', sessionStorage.getItem('numOnlinePlayer') + 1)
        }
    })

    const [roomsInfo, setRoomsInfo] = useState([0, -1]);
    const [Data, setData] = useState({
        username1: '', room1: '',
        username2: '', room2: '',
        username3: '', room3: '',
        username4: '', room4: '',
        username5: '', room5: '',
        username6: '', room6: '',
        username7: '', room7: '',
        username8: '', room8: '',
        username9: '', room9: '',
        username10: '', room10: ''
    })

    //GET AVAILABLE ROOMS
    useEffect(() => {

        const url = 'http://localhost:8080/api/v1/getAvailableRooms'
        const headers = {
            'Content-Type': 'text/plain',
        }
        axios.post(url, { 'username': btoa(sessionStorage.getItem('username')) }, { headers }
        )
            .then(res => {
                let roomsList = res.data.roomNumbers;
                setData({
                    username1: roomsList[0].username, room1: roomsList[0].roomNumber,
                    username2: roomsList[1].username, room2: roomsList[1].roomNumber,
                    username3: roomsList[2].username, room3: roomsList[2].roomNumber,
                    username4: roomsList[3].username, room4: roomsList[3].roomNumber,
                    username5: roomsList[4].username, room5: roomsList[4].roomNumber,
                    username6: roomsList[5].username, room6: roomsList[5].roomNumber,
                    username7: roomsList[6].username, room7: roomsList[6].roomNumber,
                    username8: roomsList[7].username, room8: roomsList[7].roomNumber,
                    username9: roomsList[8].username, room9: roomsList[8].roomNumber,
                    username10: roomsList[9].username, room10: roomsList[9].roomNumber
                })
            })
            .catch(err => {
                setPostError(true)
                //console.log(err);
            })
    }, [])

    var rooms = [{ 'username': Data.username1, 'room': Data.room1 },
    { 'username': Data.username2, 'room': Data.room2 },
    { 'username': Data.username3, 'room': Data.room3 },
    { 'username': Data.username4, 'room': Data.room4 },
    { 'username': Data.username5, 'room': Data.room5 },
    { 'username': Data.username6, 'room': Data.room6 },
    { 'username': Data.username7, 'room': Data.room7 },
    { 'username': Data.username8, 'room': Data.room8 },
    { 'username': Data.username9, 'room': Data.room9 },
    { 'username': Data.username10, 'room': Data.room10 }]

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

    const [QuizData, setQuizData] = useState({
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
    const [oppScore, setOppScore] = useState(-1)
    const [endOfGameMsg, setEndOfGameMsg] = useState('Won!')
    const [PostError, setPostError] = useState(false)

    const [winner, setWinner] = useState('')
    const [loser, setLoser] = useState('')

    // FETCHES OPPONENT QUIZ DATA
    useEffect(() => {
        if (roomsInfo[0] === -1) {

            const url = 'http://localhost:8080/api/v1/getOpponent'
            const headers = {
                'Content-Type': 'text/plain',
            }

            axios.post(url, { 'roomNumber': rooms[roomsInfo[1]].room }, { headers }
            )
                .then(res => {

                    let questionListData = res.data.questionList;

                    setQuizData({
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
                    
                    let oppAnswered = res.data.opponentCorrect;
                    setOppScore(oppAnswered)

                    let oppName = res.data.username;
                    setLoser(oppName)

                })
                .catch(err => {
                    setPostError(true)
                    //console.log(PostError)
                    //console.log(err);
                })

        }
    }, [roomsInfo])

    var questions = [
        {
            "question": QuizData.question1,
            "answerOptions": [
                {
                    "answerText": QuizData.answer1Option1.answerText,
                    "isCorrect": QuizData.answer1Option1.isCorrect
                },
                {
                    "answerText": QuizData.answer1Option2.answerText,
                    "isCorrect": QuizData.answer1Option2.isCorrect
                },
                {
                    "answerText": QuizData.answer1Option3.answerText,
                    "isCorrect": QuizData.answer1Option3.isCorrect
                },
                {
                    "answerText": QuizData.answer1Option4.answerText,
                    "isCorrect": QuizData.answer1Option4.isCorrect
                }
            ]
        },
        {
            "question": QuizData.question2,
            "answerOptions": [
                {
                    "answerText": QuizData.answer2Option1.answerText,
                    "isCorrect": QuizData.answer2Option1.isCorrect
                },
                {
                    "answerText": QuizData.answer2Option2.answerText,
                    "isCorrect": QuizData.answer2Option2.isCorrect
                },
                {
                    "answerText": QuizData.answer2Option3.answerText,
                    "isCorrect": QuizData.answer2Option3.isCorrect
                },
                {
                    "answerText": QuizData.answer2Option4.answerText,
                    "isCorrect": QuizData.answer2Option4.isCorrect
                }
            ]
        },
        {
            "question": QuizData.question3,
            "answerOptions": [
                {
                    "answerText": QuizData.answer3Option1.answerText,
                    "isCorrect": QuizData.answer3Option1.isCorrect
                },
                {
                    "answerText": QuizData.answer3Option2.answerText,
                    "isCorrect": QuizData.answer3Option2.isCorrect
                },
                {
                    "answerText": QuizData.answer3Option3.answerText,
                    "isCorrect": QuizData.answer3Option3.isCorrect
                },
                {
                    "answerText": QuizData.answer3Option4.answerText,
                    "isCorrect": QuizData.answer3Option4.isCorrect
                }
            ]
        },
        {
            "question": QuizData.question4,
            "answerOptions": [
                {
                    "answerText": QuizData.answer4Option1.answerText,
                    "isCorrect": QuizData.answer4Option1.isCorrect
                },
                {
                    "answerText": QuizData.answer4Option2.answerText,
                    "isCorrect": QuizData.answer4Option2.isCorrect
                },
                {
                    "answerText": QuizData.answer4Option3.answerText,
                    "isCorrect": QuizData.answer4Option3.isCorrect
                },
                {
                    "answerText": QuizData.answer4Option4.answerText,
                    "isCorrect": QuizData.answer4Option4.isCorrect
                }
            ]
        },
        {
            "question": QuizData.question5,
            "answerOptions": [
                {
                    "answerText": QuizData.answer5Option1.answerText,
                    "isCorrect": QuizData.answer5Option1.isCorrect
                },
                {
                    "answerText": QuizData.answer5Option2.answerText,
                    "isCorrect": QuizData.answer5Option2.isCorrect
                },
                {
                    "answerText": QuizData.answer5Option3.answerText,
                    "isCorrect": QuizData.answer5Option3.isCorrect
                },
                {
                    "answerText": QuizData.answer5Option4.answerText,
                    "isCorrect": QuizData.answer5Option4.isCorrect
                }
            ]
        },
        {
            "question": QuizData.question6,
            "answerOptions": [
                {
                    "answerText": QuizData.answer6Option1.answerText,
                    "isCorrect": QuizData.answer6Option1.isCorrect
                },
                {
                    "answerText": QuizData.answer6Option2.answerText,
                    "isCorrect": QuizData.answer6Option2.isCorrect
                },
                {
                    "answerText": QuizData.answer6Option3.answerText,
                    "isCorrect": QuizData.answer6Option3.isCorrect
                },
                {
                    "answerText": QuizData.answer6Option4.answerText,
                    "isCorrect": QuizData.answer6Option4.isCorrect
                }
            ]
        },
        {
            "question": QuizData.question7,
            "answerOptions": [
                {
                    "answerText": QuizData.answer7Option1.answerText,
                    "isCorrect": QuizData.answer7Option1.isCorrect
                },
                {
                    "answerText": QuizData.answer7Option2.answerText,
                    "isCorrect": QuizData.answer7Option2.isCorrect
                },
                {
                    "answerText": QuizData.answer7Option3.answerText,
                    "isCorrect": QuizData.answer7Option3.isCorrect
                },
                {
                    "answerText": QuizData.answer7Option4.answerText,
                    "isCorrect": QuizData.answer7Option4.isCorrect
                }
            ]
        },
        {
            "question": QuizData.question8,
            "answerOptions": [
                {
                    "answerText": QuizData.answer8Option1.answerText,
                    "isCorrect": QuizData.answer8Option1.isCorrect
                },
                {
                    "answerText": QuizData.answer8Option2.answerText,
                    "isCorrect": QuizData.answer8Option2.isCorrect
                },
                {
                    "answerText": QuizData.answer8Option3.answerText,
                    "isCorrect": QuizData.answer8Option3.isCorrect
                },
                {
                    "answerText": QuizData.answer8Option4.answerText,
                    "isCorrect": QuizData.answer8Option4.isCorrect
                }
            ]
        },
        {
            "question": QuizData.question9,
            "answerOptions": [
                {
                    "answerText": QuizData.answer9Option1.answerText,
                    "isCorrect": QuizData.answer9Option1.isCorrect
                },
                {
                    "answerText": QuizData.answer9Option2.answerText,
                    "isCorrect": QuizData.answer9Option2.isCorrect
                },
                {
                    "answerText": QuizData.answer9Option3.answerText,
                    "isCorrect": QuizData.answer9Option3.isCorrect
                },
                {
                    "answerText": QuizData.answer9Option4.answerText,
                    "isCorrect": QuizData.answer9Option4.isCorrect
                }
            ]
        },
        {
            "question": QuizData.question10,
            "answerOptions": [
                {
                    "answerText": QuizData.answer10Option1.answerText,
                    "isCorrect": QuizData.answer10Option1.isCorrect
                },
                {
                    "answerText": QuizData.answer10Option2.answerText,
                    "isCorrect": QuizData.answer10Option2.isCorrect
                },
                {
                    "answerText": QuizData.answer10Option3.answerText,
                    "isCorrect": QuizData.answer10Option3.isCorrect
                },
                {
                    "answerText": QuizData.answer10Option4.answerText,
                    "isCorrect": QuizData.answer10Option4.isCorrect
                }
            ]
        },
    ]

    //console.log(questions)

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

            if (score < oppScore) {
                setEndOfGameMsg('Lost');
                setWinner(atob(rooms[roomsInfo[1]].username))
                setLoser(sessionStorage.getItem('username'))
            } else {
                setEndOfGameMsg('Won');
                setLoser(atob(rooms[roomsInfo[1]].username))
                setWinner(sessionStorage.getItem('username'))
            }
        }
    };

    // 10s TIMER PER QUESTION
    const [counter, setCounter] = React.useState(10);
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

                if (score < oppScore) {
                    setEndOfGameMsg('Lost');
                    setWinner(atob(rooms[roomsInfo[1]].username))
                    setLoser(sessionStorage.getItem('username'))
                } else {
                    setEndOfGameMsg('Won');
                    setLoser(atob(rooms[roomsInfo[1]].username))
                    setWinner(sessionStorage.getItem('username'))
                }
            }
        }

        return () => clearInterval(timer);
    }, [counter]);

    // SEND RESULTS BACK TO DB
    useEffect(() => {
        if (sendResults === 1) {
            const url = 'http://localhost:8080/api/v1/sendFinalDuoScore'
            const headers = {
                'Content-Type': 'text/plain',
            }
            axios.post(url, { 'usernameWinner': btoa(winner), 'usernameLoser': btoa(loser) }, { headers }
            )
                .then(res => {
                    console.log(res.data)
                })
        }

    }, [sendResults])


    return (
        <div className='online-challenge-trivia'>
            { notValidPlaySession ? (
                <div className = "non-valid-session">
                    <h1>You cannot play more than 5 head to head matchups a day..</h1>
                    <div className='back'><p><NavLink exact to='/trivia'>back</NavLink></p></div>
                </div>
            ) : (
                <>
                { roomsInfo[0] === 0 ? (
                <div className='room-section'>
                    { PostError ? (
                        <div className='post-error'>
                            <h1>Oops.. An error occured fetching the trivia data. :(</h1>
                            <div className='back'><p><NavLink exact to='/trivia'>back</NavLink></p></div>
                        </div>
                    ) : (
                            <>
                                <div className='rooms'>
                                    <h1>Pick someone to challenge!</h1>
                                    <div className='room-buttons'>
                                        <button type="room1" onClick={() => setRoomsInfo([-1, 0])}>{atob(rooms[0].username)}</button>
                                        <button type="room1" onClick={() => setRoomsInfo([-1, 1])}>{atob(rooms[1].username)}</button>
                                        <button type="room1" onClick={() => setRoomsInfo([-1, 2])}>{atob(rooms[2].username)}</button>
                                        <button type="room1" onClick={() => setRoomsInfo([-1, 3])}>{atob(rooms[3].username)}</button>
                                        <button type="room1" onClick={() => setRoomsInfo([-1, 4])}>{atob(rooms[4].username)}</button>
                                        <button type="room1" onClick={() => setRoomsInfo([-1, 5])}>{atob(rooms[5].username)}</button>
                                        <button type="room1" onClick={() => setRoomsInfo([-1, 6])}>{atob(rooms[6].username)}</button>
                                        <button type="room1" onClick={() => setRoomsInfo([-1, 7])}>{atob(rooms[7].username)}</button>
                                        <button type="room1" onClick={() => setRoomsInfo([-1, 8])}>{atob(rooms[8].username)}</button>
                                        <button type="room1" onClick={() => setRoomsInfo([-1, 9])}>{atob(rooms[9].username)}</button>
                                        <div className='rooms-info'><p>Any option with a 'N/A' name is invalid.</p></div>
                                        <div className='back'><p><NavLink exact to='/trivia/online'>back</NavLink></p></div>
                                    </div>
                                </div>
                            </>
                        )}
                </div>
            ) : (
                    <>
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
                                                    {showScore ? (
                                                        <div className='score-section'>
                                                            <h1>You scored {score} out of {questions.length}.</h1>
                                                            <h1>{atob(rooms[roomsInfo[1]].username)} scored {oppScore} out of {questions.length}.</h1>
                                                            <h2>You've {endOfGameMsg}</h2>
                                                            <p><NavLink exact to='/trivia/online'>Play Again?</NavLink></p>
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
                                                                        <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
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
                    </>
                )}
                </>
            )}
        </div>
    );
}

export default OnlineChallengeTrivia;