import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


function SearchSkill() {
  const navigate = useNavigate();

 

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [skills, setSkills] = useState([]); 
  useEffect(() => {
  const getSkills = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/skills");

      const data = await response.json(); 
      console.log("Response:", response.status);
      console.log("Data:", data);

      setSkills(data);
    } catch (error) {
      console.log(error);
    }
  };

  getSkills();
}, []);


 const filteredSkills = skills.filter((skill) =>
  skill.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="min-h-screen bg-[#F5F7FC]">
      

      <div className="max-w-5xl mx-auto mt-8 bg-white rounded-xl border p-8">

        <h1 className="text-4xl font-bold mb-8">
          Search for a Skill
        </h1>

        <div className="relative mb-6">

          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={22}
          />

         <input
  type="text"
  placeholder="e.g., JavaScript, Python, UI/UX..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full border rounded-xl pl-12 pr-4 py-4 text-lg outline-none focus:ring-2 focus:ring-blue-500"/>

        </div>

        <div className="flex flex-wrap gap-3 mb-8">

        {filteredSkills.length > 0 ? (
  filteredSkills.map((skill) => (
    <button
      key={skill._id}
      onClick={() => setSelectedSkill(skill)}
      className={`px-5 py-2 rounded-full border transition ${
        selectedSkill?._id === skill._id
          ? "bg-[#2143D8] text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {skill.name}
    </button>
  ))
) : (
  <p className="text-gray-500 text-lg">
    No skills found.
  </p>
)}
        </div>

        {selectedSkill && (
          <div className="border rounded-xl p-5 w-[320px] mb-8">

            <h2 className="font-bold text-2xl mb-3">
              {selectedSkill.name}
            </h2>

            <p className="text-gray-600">
              Add {selectedSkill.name} to your profile?
             A {selectedSkill.mcqCount} MCQ test (15 min) is required.
            </p>

          </div>
        )}

        <div className="flex justify-end">

          <button
            disabled={!selectedSkill}
            onClick={() =>
              navigate("/test-selection", {
                state: {
                  skill: selectedSkill,
                },
              })
            }
            className={`px-10 py-3 rounded-lg text-white
            ${
              selectedSkill
                ? "bg-[#2143D8]"
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

export default SearchSkill;