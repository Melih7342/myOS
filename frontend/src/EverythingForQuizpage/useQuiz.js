import { useState } from "react";

export function useQuiz(questions) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    const question = questions[currentQuestion];

    const hasAnswer = answers[question.genre] && answers[question.genre].length > 0;


    const toggleOption = (option) => {
        let updated = [];
        const multiChoiceIds = [6, 10, 12];

        if (!multiChoiceIds.includes(question.id)) {
            updated = [option];
        } else {
            const currentAnswers = answers[question.genre] || [];

            if (currentAnswers.includes(option)) {
                updated = currentAnswers.filter((o) => o !== option);
            } else {
                updated = [...currentAnswers, option];
            }
        }

        setAnswers((prev) => ({
            ...prev,
            [question.genre]: updated,
        }));
    };

    const nextQuestion = () =>
        setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));

    const prevQuestion = () =>
        setCurrentQuestion((prev) => Math.max(prev - 1, 0));

    const isLastQuestion = currentQuestion === questions.length - 1;

    return {
        question,
        currentQuestion,
        answers,
        hasAnswer,
        toggleOption,
        nextQuestion,
        prevQuestion,
        isLastQuestion,
    };
}