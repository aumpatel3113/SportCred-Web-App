import React, { useEffect, useState } from 'react';
import axios from 'axios'

const SoloTrivia = () => {

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

    // FETCH QUIZ DATA FROM DB
    useEffect(() => {

        const url = 'http://localhost:8080/api/v1/getSoloTrivia'
        const headers = {
            'Content-Type': 'text/plain',
        }

        axios.post(url, { 'numQuestions': '10' }, { headers }
        )
            .then(res => {
                //console.log(res.data)
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
                console.log(err);
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

    //console.log(questions)

    return (
        <div className='quiz-app'></div>
    );

}

export default SoloTrivia;
