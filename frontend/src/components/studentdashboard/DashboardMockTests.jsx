import React, { useMemo, useState } from 'react';

const QUESTIONS = [
    {
        id: 1,
        question: 'What is the time complexity of binary search on a sorted array of n elements?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        answer: 1,
    },
    {
        id: 2,
        question: 'Which data structure uses FIFO (First In First Out) ordering?',
        options: ['Stack', 'Queue', 'Tree', 'Graph'],
        answer: 1,
    },
    {
        id: 3,
        question: 'The number of edges in a complete graph with n vertices is:',
        options: ['n', 'n - 1', 'n(n - 1) / 2', 'n^2'],
        answer: 2,
    },
    {
        id: 4,
        question: 'Which normal form removes partial dependencies from a relation?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        answer: 1,
    },
    {
        id: 5,
        question: 'In a demand-paging system, a page fault occurs when:',
        options: [
            'A page is found in memory',
            'A referenced page is not in main memory',
            'The CPU is idle',
            'A process terminates',
        ],
        answer: 1,
    },
];

const DashboardMockTests = () => {
    const [started, setStarted] = useState(false);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const score = useMemo(
        () => QUESTIONS.reduce((total, q) => (answers[q.id] === q.answer ? total + 1 : total), 0),
        [answers]
    );

    const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

    const startTest = () => {
        setAnswers({});
        setSubmitted(false);
        setStarted(true);
    };

    const selectOption = (questionId, optionIndex) => {
        if (submitted) return;
        setAnswers((current) => ({ ...current, [questionId]: optionIndex }));
    };

    if (!started) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Mock Tests</h2>
                <div className="space-y-4">
                    <p className="text-gray-700">
                        GATE CS practice test &mdash; {QUESTIONS.length} multiple-choice questions. No time limit.
                    </p>
                    <button
                        onClick={startTest}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Start Mock Test
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">GATE CS Practice Test</h2>
                {submitted && (
                    <span className="text-lg font-bold text-blue-700">
                        Score: {score} / {QUESTIONS.length}
                    </span>
                )}
            </div>

            <div className="space-y-6">
                {QUESTIONS.map((q, index) => (
                    <div key={q.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <p className="font-semibold text-gray-800 mb-2">
                            {index + 1}. {q.question}
                        </p>
                        <div className="space-y-2">
                            {q.options.map((option, optionIndex) => {
                                const chosen = answers[q.id] === optionIndex;
                                const isCorrect = q.answer === optionIndex;

                                let optionClass = 'border-gray-300 hover:bg-gray-50';
                                if (submitted && isCorrect) {
                                    optionClass = 'border-green-500 bg-green-50';
                                } else if (submitted && chosen && !isCorrect) {
                                    optionClass = 'border-red-500 bg-red-50';
                                } else if (chosen) {
                                    optionClass = 'border-blue-500 bg-blue-50';
                                }

                                return (
                                    <label
                                        key={optionIndex}
                                        className={`flex items-center gap-3 p-2 border rounded-lg cursor-pointer transition ${optionClass}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${q.id}`}
                                            checked={chosen}
                                            onChange={() => selectOption(q.id, optionIndex)}
                                        />
                                        <span className="text-gray-700">{option}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-3 mt-6">
                {!submitted ? (
                    <button
                        onClick={() => setSubmitted(true)}
                        disabled={!allAnswered}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-60"
                    >
                        {allAnswered ? 'Submit Test' : 'Answer all questions to submit'}
                    </button>
                ) : (
                    <button
                        onClick={startTest}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Retake Test
                    </button>
                )}
                <button
                    onClick={() => setStarted(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                    Exit
                </button>
            </div>
        </div>
    );
};

export default DashboardMockTests;
