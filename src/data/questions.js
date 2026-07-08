const questions = [
  {
    id: 1,
    question: "What will be the output of the following code?",
    code: "console.log(typeof []);",
    options: ["object", "array", "undefined", "number"],
    answer: "object",
  },
  {
    id: 2,
    question: "Which keyword is used to declare a constant in JavaScript?",
    code: "",
    options: ["var", "let", "const", "static"],
    answer: "const",
  },
  {
    id: 3,
    question: "Which method is used to add an element to the end of an array?",
    code: "",
    options: ["push()", "pop()", "shift()", "slice()"],
    answer: "push()",
  },
  {
    id: 4,
    question: "Which operator is used for strict equality?",
    code: "",
    options: ["=", "==", "===", "!="],
    answer: "===",
  },
  {
    id: 5,
    question: "Which function converts JSON into an object?",
    code: "",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "parseJSON()",
    ],
    answer: "JSON.parse()",
  },
];

export default questions;