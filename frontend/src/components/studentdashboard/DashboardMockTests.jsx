// Mock test UI: 5 fixed questions, submits the score to the backend, and shows score history.
import React, { useEffect, useMemo, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../../lib/api';

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
    const [history, setHistory] = useState([]);
    const [saveError, setSaveError] = useState('');

    const score = useMemo(
        () => QUESTIONS.reduce((total, q) => (answers[q.id] === q.answer ? total + 1 : total), 0),
        [answers]
    );

    const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

    // 🔴 Load the student's past scores once, so "Score history" has data without needing a submit first.
    useEffect(() => {
        const loadHistory = async () => {
            try {
                const { data } = await api.get('/api/student/results');
                if (data.success) setHistory(data.results);
            } catch {
                // history is a nice-to-have; silently ignore load failures
            }
        };
        loadHistory();
    }, []);

    const startTest = () => {
        setAnswers({});
        setSubmitted(false);
        setStarted(true);
    };

    const selectOption = (questionId, optionIndex) => {
        if (submitted) return;
        setAnswers((current) => ({ ...current, [questionId]: optionIndex }));
    };

    // 🔴 Submit the test, then save the score to the backend and refresh history.
    const submitTest = async () => {
        setSubmitted(true);
        setSaveError('');

        try {
            const { data } = await api.post('/api/student/results', { score, total: QUESTIONS.length });
            if (data.success) {
                setHistory((current) => [data.result, ...current].slice(0, 10));
            } else {
                setSaveError(data.message || 'Could not save your score');
            }
        } catch {
            setSaveError('Could not save your score. Please try again.');
        }
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
                <ScoreHistory history={history} />
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
                        onClick={submitTest}
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

            {submitted && saveError && (
                <p className="text-sm text-red-600 mt-3">{saveError}</p>
            )}

            <ScoreHistory history={history} />
        </div>
    );
};

// Score trend chart (oldest → newest, left to right) plus a table of past attempts, newest first.
const ScoreHistory = ({ history }) => {
    if (history.length === 0) return null;

    const chartData = [...history].reverse().map((attempt, index) => ({
        attempt: index + 1,
        date: new Date(attempt.createdAt).toLocaleDateString(),
        score: attempt.score,
        total: attempt.total,
    }));

    return (
        <div className="mt-6">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Score History</h3>

            <div className="h-56 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="attempt" tick={{ fontSize: 12 }} label={{ value: 'Attempt', position: 'insideBottom', offset: -2, fontSize: 12 }} />
                        <YAxis allowDecimals={false} domain={[0, (dataMax) => Math.max(dataMax, 5)]} tick={{ fontSize: 12 }} />
                        <Tooltip labelFormatter={(value, payload) => payload?.[0]?.payload?.date ?? `Attempt ${value}`} formatter={(value, name, props) => [`${value} / ${props.payload.total}`, 'Score']} />
                        <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="text-gray-500 border-b border-gray-200">
                        <th className="py-1 pr-4">Date</th>
                        <th className="py-1">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((attempt) => (
                        <tr key={attempt._id} className="border-b border-gray-100 last:border-b-0">
                            <td className="py-1 pr-4 text-gray-600">
                                {new Date(attempt.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-1 text-gray-800 font-medium">
                                {attempt.score} / {attempt.total}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardMockTests;
