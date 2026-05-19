import { useState } from 'react';
import SplashScreen from '@/pages/SplashScreen';
import QuizScreen from '@/pages/QuizScreen';
import ResultScreen from '@/pages/ResultScreen';
import { Answer } from '@/types/index';

type AppScreen = 'splash' | 'quiz' | 'result';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('splash');
  const [answers, setAnswers] = useState<Answer[]>([]);

  function handleStart() {
    setScreen('quiz');
  }

  function handleQuizComplete(finalAnswers: Answer[]) {
    setAnswers(finalAnswers);
    setScreen('result');
  }

  function handleRestart() {
    setAnswers([]);
    setScreen('splash');
  }

  return (
    <div className="app-root">
      {screen === 'splash' && <SplashScreen onStart={handleStart} />}
      {screen === 'quiz' && <QuizScreen onComplete={handleQuizComplete} />}
      {screen === 'result' && <ResultScreen answers={answers} onRestart={handleRestart} />}
    </div>
  );
}
