import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const answers = state?.answers || {};
  const questions = state?.questions || [];
  const skill = state?.skill || "JavaScript";

  let score = 0;

  questions.forEach((question, index) => {
    if (answers[index] === question.answer) {
      score++;
    }
  });

  return (
    <div className="min-h-screen bg-[#F5F7FC] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-[500px] text-center">

        <h1 className="text-4xl font-bold mb-6">
         {skill} Test Completed 
        </h1>

        <p className="text-gray-600 mb-8">
          Congratulations! You have completed the {skill} Basics Test.
        </p>

        <div className="bg-blue-50 rounded-xl py-8 mb-8">

          <h2 className="text-2xl font-semibold mb-3">
            Your Score
          </h2>

          <p className="text-5xl font-bold text-[#2143D8]">
            {score} / {questions.length}
          </p>

          <p className="mt-4 text-lg font-medium">
            {score === questions.length
              ? "Excellent 🎉"
              : score >= 3
              ? "Good Job 👏"
              : "Keep Practicing 💪"}
          </p>

        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#2143D8] text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </button>

      </div>
    </div>
  );
}

export default Result;