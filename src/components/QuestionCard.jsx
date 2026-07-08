function QuestionCard({ question }) {
  return (
    <>
      <p className="text-xl font-semibold mb-5">
        {question.question}
      </p>

      {question.code && (
        <div className="bg-[#F4F6FB] border border-gray-200 rounded-xl p-5 mb-8 overflow-x-auto">
          <pre className="text-sm text-gray-800">
            <code>{question.code}</code>
          </pre>
        </div>
      )}
    </>
  );
}

export default QuestionCard;