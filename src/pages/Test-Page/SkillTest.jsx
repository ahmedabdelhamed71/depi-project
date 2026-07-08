import { useState , useEffect } from "react";
import Timer from "../../components/Timer";
import questions from "../../data/questions";
import QuestionOptions from "../../components/QuestionOptions";
import QuestionCard from "../../components/QuestionCard";
import ProgressBar from "../../components/ProgressBar";
import { useNavigate , useLocation } from "react-router-dom";

function SkillTest() { 
    const navigate = useNavigate() ;
    const location = useLocation() ;
    const skill = location.state?.skill ;
    const [currentQuestion, setCurrentQuestion] = useState(0);
const [answers, setAnswers] = useState({});
const [timeLeft , setTimeLeft]  = useState(15 * 60) ;
const question = questions[currentQuestion];
const selectedAnswer = answers[currentQuestion] ;
useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        navigate("/result" , {
            state: {
                answers, questions , skill,
            },
        });
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [navigate]); 
useEffect(() => {
  if (!skill) {
    navigate("/");
  }
}, [skill, navigate]);
  return (
    <div className="min-h-screen bg-[#F5F7FC]">
      

      <div className="max-w-6xl mx-auto mt-8 bg-white rounded-xl border p-8">
      <ProgressBar current={currentQuestion} total={questions.length} />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            {skill} Basics Test 
          </h1>

          <div className="flex items-center gap-6">

            <span className="text-gray-500">
             Question {currentQuestion + 1} of {questions.length}
            </span>

         <Timer timeLeft={timeLeft} />

          </div>
        </div>

      <QuestionCard question={question} />

     <QuestionOptions
  options={question.options}
  selectedAnswer={selectedAnswer}
  currentQuestion={currentQuestion}
  answers={answers}
  setAnswers={setAnswers}
/>

        <div className="flex justify-between mt-10">

        <button
  onClick={() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      
    }
  }}
  disabled={currentQuestion === 0}
  className={`px-8 py-3 rounded-lg ${
    currentQuestion === 0
      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
      : "border hover:bg-gray-100"
  }`}
>
  Previous
</button>

        <button
  onClick={() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      
    } else {
     navigate("/result" , 
        {
            state: {answers, questions,skill,}
        },
     ) ;
    }
  }}
 disabled={!selectedAnswer}

className={`px-8 py-3 rounded-lg text-white transition ${
  selectedAnswer
    ? "bg-[#2143D8] hover:bg-blue-700"
    : "bg-gray-300 cursor-not-allowed"
}`}
>
  {currentQuestion === questions.length - 1
    ? "Submit Test"
    : "Next Question"}
</button>
        </div>

      </div>
    </div>
  );
}

export default SkillTest;