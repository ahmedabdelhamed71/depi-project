import { useState } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import questions from "../../data/questions";

function TestSelection() {
  const navigate = useNavigate();
  const location = useLocation() ;
 const skill = location.state?.skill || "JavaScript";
  const [selection, setSelection] = useState("");

  const handleNext = () => {
    if (selection === "now") {
      navigate("/test" , {
        state:{
            skill,
        },
      });
    } else if (selection === "later") {
      
      alert("You chose to take the test later.");

      
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FC]">
      

      <div className="max-w-6xl mx-auto mt-8 bg-white rounded-xl shadow-sm border p-8">

        <h1 className="text-4xl font-bold mb-4">
          {skill} Basics Test 
        </h1>

        <p className="text-gray-600 mb-10">
          A test is required to verify your skill in {skill}.
          The test consists of {questions.length} questions (MCQ)
          to be completed within a 15-minute time limit.
        </p>

        <div className="flex justify-center gap-8 mb-10">

          {/* Take Test Now */}
          <button
            onClick={() => setSelection("now")}
          className={`w-64 h-64 rounded-xl border-2 text-4xl font-bold transition-all duration-300
${
  selection === "now"
    ? "bg-[#2143D8] text-white border-[#2143D8] ring-4 ring-blue-200"
    : "bg-white text-[#2143D8] border-gray-200 hover:bg-gray-50"
}`}
          >
            Take the
            <br />
            test now
          </button>

          {/* Take Test Later */}
          <button
            onClick={() => setSelection("later")}
            className={`w-64 h-64 rounded-xl border-2 text-4xl font-bold transition-all duration-300
${
  selection === "later"
    ? "bg-[#2143D8] text-white border-[#2143D8] ring-4 ring-blue-200"
    : "bg-white text-[#2143D8] border-gray-200 hover:bg-gray-50"
}`}
          >
            Take the
            <br />
            test later
          </button>

        </div>

        <div className="flex justify-end">

          <button
            onClick={handleNext}
            disabled={!selection}
            className={`px-10 py-3 rounded-lg text-white font-semibold transition
              ${
                selection
                  ? "bg-[#2143D8] hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}

export default TestSelection;