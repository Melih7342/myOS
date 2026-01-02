import React from "react";

export function QuestionHeader({ question, currentQuestion, questions }) {
  return (
    <>
      <p className="text-center text-muted mb-2">
        Question {currentQuestion + 1} of {questions.length}
      </p>
      <h4 className="text-center mb-4">{question.question}</h4>
    </>
  );
}

export function QuestionOptions({ question, answers, onToggleOption }) {
  return (
    <div className="d-flex justify-content-center gap-3 flex-wrap mb-5">
      {question.options.map((option) => {
        const selected = answers[question.genre]?.includes(option) || false;

        return (
          <button
            key={option}
            className={`btn ${
              selected ? "btn-primary" : "btn-outline-primary"
            } px-4`}
            onClick={() => onToggleOption(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function QuestionButtons({
  hasAnswer,
  isLastQuestion,
  onNext,
  onBack,
  onFinish,
}) {
  return (
    <div className="d-flex justify-content-between">
      <button
        className="btn btn-outline-secondary"
        onClick={onBack}
        disabled={!onBack}
      >
        Back
      </button>

      {isLastQuestion ? (
        <button
          className="btn btn-success"
          onClick={onFinish}
          disabled={!hasAnswer}
        >
          Finish
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={!hasAnswer}
        >
          Next
        </button>
      )}
    </div>
  );
}
