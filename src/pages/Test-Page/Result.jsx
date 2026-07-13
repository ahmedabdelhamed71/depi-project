import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const result = state?.result;
  const skill = state?.skill;

  if (!result) {
    return (
      <h2 className="text-center mt-10 text-2xl">
        No Result Found
      </h2>
    );
  }

  const percentage = Math.round(
    (result.score / result.totalQuestions) * 100
  );

  return (
    <div className="min-h-screen bg-[#F5F7FC] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-[500px] text-center">

        <h1 className="text-4xl font-bold mb-6">
          {skill.name} Test Completed
        </h1>

        <p className="text-gray-600 mb-8">
          Congratulations! You have completed the {skill.name} Basics Test.
        </p>

        <div className="bg-blue-50 rounded-xl py-8 mb-8">

          <h2 className="text-2xl font-semibold mb-3">
            Your Score
          </h2>

          <p className="text-5xl font-bold text-[#2143D8]">
            {result.score} / {result.totalQuestions}
          </p>

          <p className="text-xl mt-4">
            {percentage}%
          </p>

          <p className="mt-4 text-lg font-medium">
            {percentage >= 60
              ? "Passed 🎉"
              : "Failed 😢"}
          </p>

        </div>

        <button
          onClick={() => navigate("/search-skill")}
          className="w-full bg-[#2143D8] text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Skills
        </button>

      </div>
    </div>
  );
}

export default Result;