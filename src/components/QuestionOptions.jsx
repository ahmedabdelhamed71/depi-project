function QuestionOptions({
  options,
  selectedAnswer,
  currentQuestion,
  answers,
  setAnswers,
  question,
}) {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <label
          key={option}
          className={`flex items-center gap-3 rounded-lg p-4 cursor-pointer border-2 transition-all duration-200
          ${
            selectedAnswer === option
              ? "border-[#2143D8] bg-blue-50"
              : "border-gray-300 hover:border-[#2143D8]"
          }`}
        >
          <input
            type="radio"
            name="answer"
            checked={selectedAnswer === option}
           onChange={() =>
           setAnswers({
           ...answers,
           [currentQuestion]: {
            questionId: question._id,
             answer: option,
              },
              })
            }
          />

          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

export default QuestionOptions;