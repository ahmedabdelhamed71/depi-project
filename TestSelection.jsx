import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function TestSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F7FC]">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-8 bg-white rounded-xl shadow-sm border p-8">

        <h1 className="text-4xl font-bold mb-4">
          JavaScript Basics Test
        </h1>

        <p className="text-gray-600 mb-10">
          A test is required to verify your skill in JavaScript.
          The test consists of 10 multiple-choice questions (MCQ)
          to be completed within a 15-minute time limit.
        </p>

        <div className="flex justify-center gap-8 mb-10">

          <button
            onClick={() => navigate("/test")}
            className="w-64 h-64 rounded-xl bg-[#2143D8] text-white text-4xl font-bold shadow-lg hover:scale-105 transition"
          >
            Take the
            <br />
            test now
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-64 h-64 rounded-xl border-2 border-gray-200 text-[#2143D8] text-4xl font-bold hover:bg-gray-50 transition"
          >
            Take the
            <br />
            test later
          </button>

        </div>

        <div className="flex justify-end">

          <button
            onClick={() => navigate("/test")}
            className="px-10 py-3 bg-[#2143D8] text-white rounded-lg hover:bg-blue-700"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}

export default TestSelection;