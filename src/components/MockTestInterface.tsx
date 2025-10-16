import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, ChevronRight, Award } from 'lucide-react';
import mockTestsData from '../data/mockTests.json';
import { saveMockTestResult } from '../services/database';
import { authService } from '../services/authService';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface MockTestInterfaceProps {
  testId: string;
  onClose: () => void;
  onTestComplete?: () => void;
}

export default function MockTestInterface({ testId, onClose, onTestComplete }: MockTestInterfaceProps) {
  const test = mockTestsData.tests.find(t => t.id === testId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(test?.questions.length || 0).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState((test?.duration || 60) * 60); // Convert to seconds
  const [score, setScore] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (showResults) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResults]);

  if (!test) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);

      // Calculate score
      let correctCount = 0;
      test.questions.forEach((q, index) => {
        if (selectedAnswers[index] === q.correctAnswer) {
          correctCount++;
        }
      });
      const finalScore = Math.round((correctCount / test.questions.length) * 100);
      setScore(finalScore);

      // Get current user
      const currentUser = authService.getCurrentUser();
      if (currentUser && currentUser.role !== 'institution') {
        // Save result to database
        await saveMockTestResult(
          parseInt(currentUser.id),
          testId,
          finalScore,
          true,
          selectedAnswers
        );

        // Refresh user data to update localStorage
        await authService.refreshUserData();

        // Call callback if provided
        if (onTestComplete) {
          onTestComplete();
        }
      }

      setShowResults(true);
    } catch (error) {
      console.error('Error saving test result:', error);
      alert('Test result saved locally, but there was an error saving to the database.');
      setShowResults(true);
    } finally {
      setSaving(false);
    }
  };

  const currentQ = test.questions[currentQuestion];
  const isPassed = score >= test.passingScore;

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Results Header */}
          <div className={`p-8 text-white ${isPassed ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-red-600 to-orange-600'}`}>
            <div className="text-center">
              {isPassed ? (
                <Award className="w-20 h-20 mx-auto mb-4" />
              ) : (
                <XCircle className="w-20 h-20 mx-auto mb-4" />
              )}
              <h2 className="text-3xl font-bold mb-2">
                {isPassed ? 'Congratulations!' : 'Keep Practicing!'}
              </h2>
              <p className="text-xl mb-4">Your Score: {score}%</p>
              <p className="text-white/90">
                {isPassed
                  ? `You passed! (Required: ${test.passingScore}%)`
                  : `You need ${test.passingScore}% to pass. You got ${score}%.`
                }
              </p>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Review Your Answers</h3>
            <div className="space-y-6">
              {test.questions.map((q, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                  <div key={q.id} className="border border-slate-200 rounded-xl p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-slate-900 mb-3">
                          Question {index + 1}: {q.question}
                        </p>
                        <div className="space-y-2 mb-4">
                          {q.options.map((option, optIndex) => {
                            const isUserAnswer = userAnswer === optIndex;
                            const isCorrectAnswer = q.correctAnswer === optIndex;

                            return (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg ${
                                  isCorrectAnswer
                                    ? 'bg-green-100 border-2 border-green-500'
                                    : isUserAnswer
                                    ? 'bg-red-100 border-2 border-red-500'
                                    : 'bg-slate-50'
                                }`}
                              >
                                {option}
                                {isCorrectAnswer && (
                                  <span className="ml-2 text-green-700 font-semibold">✓ Correct</span>
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <span className="ml-2 text-red-700 font-semibold">✗ Your Answer</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                          <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
                          <p className="text-sm text-blue-800">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-red-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:opacity-90 transition-all font-semibold shadow-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{test.title}</h2>
              <p className="text-white/90">Question {currentQuestion + 1} of {test.questions.length}</p>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5" />
              <span className="font-bold text-lg">{formatTime(timeRemaining)}</span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / test.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">{currentQ.question}</h3>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-red-600 bg-red-50'
                    : 'border-slate-200 hover:border-red-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-red-600 bg-red-600'
                        : 'border-slate-300'
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-slate-900">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-slate-200 p-6 bg-slate-50">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {test.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                    index === currentQuestion
                      ? 'bg-red-600 text-white'
                      : selectedAnswers[index] !== -1
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === test.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswers.includes(-1) || saving}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>{saving ? 'Submitting...' : 'Submit Test'}</span>
                {!saving && <ChevronRight className="w-5 h-5" />}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all font-semibold shadow-lg flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {selectedAnswers.includes(-1) && currentQuestion === test.questions.length - 1 && (
            <p className="text-center text-sm text-red-600 mt-4">
              Please answer all questions before submitting
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
