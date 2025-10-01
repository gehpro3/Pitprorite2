import React, { useState, useEffect } from 'react';
import AuditionPractice from './components/AuditionPractice';
import Tutorial from './components/Tutorial';
import Sidebar from './components/Sidebar';
import PitProRite from './components/GiniasGroove';
import VirginiaRules from './components/VirginiaRules';
import CardCountingPractice from './components/CardCountingPractice';
import ChipPayoutPractice from './components/ChipPayoutPractice';
import HitStandPractice from './components/HitStandPractice';
import DealerTalkPractice from './components/DealerTalkPractice';
import { PracticeMode } from './types';


function App() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [activeMode, setActiveMode] = useState<PracticeMode>('audition');

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('pitpro_tutorial_v2');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleExitTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('pitpro_tutorial_v2', 'true');
  };

  const renderActiveComponent = () => {
    switch (activeMode) {
      case 'audition':
        return <AuditionPractice />;
      case 'pitProRite':
        return <PitProRite />;
      case 'chipPayout':
        return <ChipPayoutPractice />;
      case 'hitStand':
        return <HitStandPractice />;
      case 'cardCounting':
        return <CardCountingPractice />;
      case 'dealerTalk':
        return <DealerTalkPractice />;
      case 'virginiaRules':
        return <VirginiaRules />;
      default:
        return <AuditionPractice />;
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans flex flex-col">
        {showTutorial && <Tutorial onExit={handleExitTutorial} />}
        
        <header className="w-full p-4 sm:p-6 text-center border-b border-slate-700/50 shrink-0">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-200 tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            PitProRite Blackjack Trainer
            </h1>
            <p className="text-slate-400 mt-2 text-lg">Legacy-Grade Training for the Modern Dealer.</p>
        </header>

        <div className="flex flex-1 overflow-hidden">
            <Sidebar activeMode={activeMode} setActiveMode={setActiveMode} />
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <div className="w-full max-w-7xl mx-auto flex justify-center">
                    {renderActiveComponent()}
                </div>
            </main>
        </div>
        
        <footer className="w-full p-4 text-center text-slate-500 text-sm border-t border-slate-700/50 shrink-0">
            <p>This application is for educational and training purposes only. Remember to gamble responsibly.</p>
            <p>&copy; 2024 Blackjack Trainer Pro. All rights reserved.</p>
            <button onClick={() => setShowTutorial(true)} className="mt-2 text-slate-400 hover:text-white underline transition-colors">
                Show Tutorial
            </button>
        </footer>
    </div>
  );
}

export default App;