import React, { useState } from "react";
import "./quiz.css";
import { useNavigate } from "react-router-dom";

// Define question sets for each programming language with advanced-level questions
const questionSets = {
  java: [
    {
      question: "What is the output of the following code?\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println(Math.min(Double.MIN_VALUE, 0.0d));\n  }\n}",
      options: ["0.0", "4.9E-324", "Compilation error", "Runtime error"],
      answer: "0.0",
      topic: "Java Basics - Math and Data Types",
    },
    {
      question: "Which of the following is true about the `try-with-resources` statement in Java?",
      options: [
        "It automatically closes resources that implement `AutoCloseable`.",
        "It can only be used with files.",
        "It requires a `finally` block to close resources.",
        "It is deprecated in Java 11.",
      ],
      answer: "It automatically closes resources that implement `AutoCloseable`.",
      topic: "Exception Handling - try-with-resources",
    },
    {
      question: "What is the purpose of the `volatile` keyword in Java?",
      options: [
        "To ensure atomicity of operations.",
        "To ensure visibility of changes across threads.",
        "To prevent deadlocks.",
        "To improve performance.",
      ],
      answer: "To ensure visibility of changes across threads.",
      topic: "Multithreading - volatile keyword",
    },
    {
      question: "What is the output of the following code?\n\npublic class Main {\n  public static void main(String[] args) {\n    String s1 = new String('Hello');\n    String s2 = new String('Hello');\n    System.out.println(s1 == s2);\n  }\n}",
      options: ["true", "false", "Compilation error", "Runtime error"],
      answer: "false",
      topic: "Java Basics - String and Object Comparison",
    },
    {
      question: "Which of the following is NOT a valid functional interface in Java?",
      options: ["Runnable", "Supplier", "Consumer", "All are valid"],
      answer: "All are valid",
      topic: "Java 8 - Functional Interfaces",
    },
    {
      question: "What is the output of the following code?\n\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> list = Arrays.asList(1, 2, 3);\n    list.stream().filter(n -> n > 1).forEach(System.out::println);\n  }\n}",
      options: ["1", "2\n3", "Compilation error", "Runtime error"],
      answer: "2\n3",
      topic: "Java 8 - Streams API",
    },
    {
      question: "Which of the following is true about the `finalize()` method in Java?",
      options: [
        "It is guaranteed to be called before garbage collection.",
        "It can be used to release resources.",
        "It is deprecated in Java 9.",
        "It is called every time an object goes out of scope.",
      ],
      answer: "It is deprecated in Java 9.",
      topic: "Java Basics - Garbage Collection",
    },
    {
      question: "What is the output of the following code?\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println(Stream.of(1, 2, 3).reduce(0, (a, b) -> a + b));\n  }\n}",
      options: ["6", "0", "Compilation error", "Runtime error"],
      answer: "6",
      topic: "Java 8 - Streams and Reduction",
    },
    {
      question: "Which of the following is true about the `CompletableFuture` class in Java?",
      options: [
        "It is used for asynchronous programming.",
        "It can only handle one task at a time.",
        "It is part of the `java.util.concurrent` package.",
        "It cannot be chained with other `CompletableFuture` instances.",
      ],
      answer: "It is used for asynchronous programming.",
      topic: "Concurrency - CompletableFuture",
    },
    {
      question: "What is the output of the following code?\n\npublic class Main {\n  public static void main(String[] args) {\n    Optional<String> opt = Optional.ofNullable(null);\n    System.out.println(opt.orElse('Default'));\n  }\n}",
      options: ["null", "Default", "Compilation error", "Runtime error"],
      answer: "Default",
      topic: "Java 8 - Optional Class",
    },
  ],
  cpp: [
    {
      question: "What is the output of the following code?\n\n#include <iostream>\nusing namespace std;\nint main() {\n  int x = 5;\n  int *ptr = &x;\n  cout << *ptr++;\n  return 0;\n}",
      options: ["5", "6", "Compilation error", "Runtime error"],
      answer: "5",
      topic: "C++ Basics - Pointers",
    },
    {
      question: "Which of the following is true about the `const` keyword in C++?",
      options: [
        "It can be used to define a constant pointer.",
        "It can be used to define a constant member function.",
        "It can be used to define a constant variable.",
        "All of the above.",
      ],
      answer: "All of the above.",
      topic: "C++ Basics - const Keyword",
    },
    {
      question: "What is the output of the following code?\n\n#include <iostream>\nusing namespace std;\nint main() {\n  int arr[] = {1, 2, 3};\n  cout << sizeof(arr) / sizeof(arr[0]);\n  return 0;\n}",
      options: ["1", "2", "3", "Compilation error"],
      answer: "3",
      topic: "C++ Basics - Arrays",
    },
    {
      question: "Which of the following is true about the `virtual` keyword in C++?",
      options: [
        "It is used to create virtual functions.",
        "It is used to create abstract classes.",
        "It is used to achieve runtime polymorphism.",
        "All of the above.",
      ],
      answer: "All of the above.",
      topic: "OOP - Virtual Functions",
    },
    {
      question: "What is the output of the following code?\n\n#include <iostream>\nusing namespace std;\nint main() {\n  int x = 10;\n  int &ref = x;\n  ref = 20;\n  cout << x;\n  return 0;\n}",
      options: ["10", "20", "Compilation error", "Runtime error"],
      answer: "20",
      topic: "C++ Basics - References",
    },
    {
      question: "Which of the following is true about the `std::move` function in C++?",
      options: [
        "It is used to move resources from one object to another.",
        "It is used to copy resources from one object to another.",
        "It is used to delete resources from an object.",
        "It is used to allocate resources for an object.",
      ],
      answer: "It is used to move resources from one object to another.",
      topic: "C++ Advanced - Move Semantics",
    },
    {
      question: "What is the output of the following code?\n\n#include <iostream>\nusing namespace std;\nint main() {\n  int x = 5;\n  int y = x++ + ++x;\n  cout << y;\n  return 0;\n}",
      options: ["10", "11", "12", "Compilation error"],
      answer: "12",
      topic: "C++ Basics - Operators",
    },
    {
      question: "Which of the following is true about the `std::unique_ptr` in C++?",
      options: [
        "It is used to manage dynamically allocated memory.",
        "It cannot be copied.",
        "It automatically deletes the managed object when it goes out of scope.",
        "All of the above.",
      ],
      answer: "All of the above.",
      topic: "C++ Advanced - Smart Pointers",
    },
    {
      question: "What is the output of the following code?\n\n#include <iostream>\nusing namespace std;\nint main() {\n  int x = 10;\n  int *ptr = &x;\n  int **ptr2 = &ptr;\n  cout << **ptr2;\n  return 0;\n}",
      options: ["10", "20", "Compilation error", "Runtime error"],
      answer: "10",
      topic: "C++ Basics - Pointers",
    },
    {
      question: "Which of the following is true about the `std::thread` class in C++?",
      options: [
        "It is used to create and manage threads.",
        "It is part of the `std` namespace.",
        "It can be used to achieve parallelism.",
        "All of the above.",
      ],
      answer: "All of the above.",
      topic: "C++ Advanced - Multithreading",
    },
  ],
  // Add similar advanced questions for other subjects...
};

const Quiz = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const navigate = useNavigate();

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setIncorrectAnswers([]);
  };

  const handleAnswerClick = (option) => {
    const currentQuestionData = questionSets[selectedLanguage][currentQuestion];
    if (option === currentQuestionData.answer) {
      setScore(score + 1);
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentQuestionData]);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionSets[selectedLanguage].length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const getSuggestion = () => {
    const totalQuestions = questionSets[selectedLanguage].length;
    const percentage = (score / totalQuestions) * 100;

    if (percentage <= 70) {
      return "You need to improve. Keep practicing!";
    } else if (percentage > 70 && percentage < 90) {
      return "Keep it up! You're doing well.";
    } else {
      return "Well done! You have a strong understanding.";
    }
  };

  const getMistakesAnalysis = () => {
    if (incorrectAnswers.length === 0) {
      return <p>No mistakes made. Great job!</p>;
    }

    // Group mistakes by topic
    const mistakesByTopic = {};
    incorrectAnswers.forEach((question) => {
      if (!mistakesByTopic[question.topic]) {
        mistakesByTopic[question.topic] = [];
      }
      mistakesByTopic[question.topic].push(question);
    });

    return (
      <div>
        <h3>Topics to Improve:</h3>
        {Object.keys(mistakesByTopic).map((topic) => (
          <div key={topic}>
            <h4>{topic}</h4>
            <ul>
              {mistakesByTopic[topic].map((question, index) => (
                <li key={index}>
                  <strong>Question:</strong> {question.question}<br />
                  <strong>Correct Answer:</strong> {question.answer}
                </li>
              ))}
            </ul>
            <a
              href={`https://www.google.com/search?q=${topic}+course`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find a course on {topic}
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="quiz-container">
      {!selectedLanguage ? (
        <div className="language-selection">
          <h2>Choose a Programming Language</h2>
          <div className="language-buttons">
            <button onClick={() => handleLanguageSelect("java")}>Java</button>
            <button onClick={() => handleLanguageSelect("cpp")}>C++</button>
            <button onClick={() => handleLanguageSelect("c")}>C</button>
            <button onClick={() => handleLanguageSelect("transformers")}>Transformers</button>
            <button onClick={() => handleLanguageSelect("datastructures")}>Data Structures</button>
          </div>
        </div>
      ) : showScore ? (
        <div className="score-section">
          <h2>Your Score: {score} / {questionSets[selectedLanguage].length}</h2>
          <p>{getSuggestion()}</p>
          {getMistakesAnalysis()}
          <button onClick={() => setSelectedLanguage(null)}>Choose Another Language</button>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>{questionSets[selectedLanguage][currentQuestion].question}</h2>
          <div className="options-container">
            {questionSets[selectedLanguage][currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;