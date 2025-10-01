import React, { useState, useEffect } from 'react';

interface TutorialProps {
    onExit: () => void;
}

const tutorialSteps = [
    {
        title: "Welcome to PitProRite Blackjack Trainer!",
        content: "This quick tutorial will walk you through the basics of Blackjack and how to use this trainer to sharpen your skills. Let's get started!"
    },
    {
        title: "The Goal of Blackjack",
        content: "Your goal is simple: get a hand value closer to 21 than the dealer's, without going over 21. Going over 21 is called a 'Bust', and it's an automatic loss."
    },
    {
        title: "Card Values",
        content: () => (
            <ul className="list-disc list-inside space-y-2 text-left">
                <li>Cards <strong>2 through 10</strong> are worth their face value.</li>
                <li><strong>Jack, Queen, and King</strong> are each worth 10.</li>
                <li><strong>Aces</strong> are special: they can be worth 1 or 11, whichever value gives you the best hand.</li>
            </ul>
        )
    },
    {
        title: "Understanding the Trainer",
        content: "The main screen shows the dealer's hand at the top and your hand(s) at the bottom. Your bet, hand total, and available actions are clearly displayed for each of your hands."
    },
    {
        title: "Your Main Actions: Hit & Stand",
        content: () => (
            <div className="text-left space-y-3">
                <p><strong className="text-green-400">Hit:</strong> Take another card. You can hit as many times as you want, but be careful not to bust!</p>
                <p><strong className="text-red-400">Stand:</strong> Keep your current hand and end your turn. This is the right move when you have a strong hand or think hitting is too risky.</p>
            </div>
        )
    },
    {
        title: "Meet PitProRite, Your AI Mentor",
        content: "This is a training tool! After you choose an action, PitProRite will give you instant feedback. She'll tell you if your move was correct according to perfect Basic Strategy and explain why. This is the key to learning fast."
    },
    {
        title: "Advanced Moves & Levels",
        content: "As you progress through the Challenge Levels, you'll practice more advanced situations like Doubling Down, Splitting Pairs, and taking Insurance. Each level is designed to focus on a specific skill."
    },
    {
        title: "Other Practice Modes",
        content: "Use the tabs at the top of the screen to access other specialized drills. You can practice Card Counting, Chip Payouts, and even learn what to say at the table with the 'Dealer Talk' mode."
    },
    {
        title: "You're Ready to Train!",
        content: "You've got the basics! Click 'Finish' to exit this tutorial and select Level 1 to start your first challenge. Good luck!"
    }
];

const Tutorial: React.FC<TutorialProps> = ({ onExit }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < tutorialSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onExit();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onExit]);


    const step = tutorialSteps[currentStep];

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4 animate-fade-in"
            onClick={onExit}
        >
            <div 
                className="bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full p-6 sm:p-8 relative border-2 border-slate-600"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onExit}
                    className="absolute top-2 right-2 text-slate-400 hover:text-white text-4xl font-bold z-10"
                    aria-label="Close tutorial"
                >&times;</button>
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 pr-8">{step.title}</h2>
                    <span className="text-slate-400 font-semibold text-sm sm:text-base whitespace-nowrap pt-1">
                        Step {currentStep + 1} / {tutorialSteps.length}
                    </span>
                </div>
                
                <div className="w-full bg-slate-700 h-1.5 rounded-full mb-6">
                    <div 
                        className="bg-sky-500 h-1.5 rounded-full transition-all duration-300" 
                        style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                    ></div>
                </div>

                <div className="text-slate-300 text-base sm:text-lg leading-relaxed min-h-[150px] flex items-center">
                    {typeof step.content === 'function' ? step.content() : <p>{step.content}</p>}
                </div>

                <div className="mt-8 flex justify-between items-center">
                    <button 
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className="px-6 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    
                    {currentStep === tutorialSteps.length - 1 ? (
                        <button 
                            onClick={onExit}
                            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold text-lg sm:text-xl transition-colors shadow-lg"
                        >
                            Finish
                        </button>
                    ) : (
                        <button 
                            onClick={handleNext}
                            className="px-6 py-2 bg-sky-600 hover:bg-sky-500 rounded-lg font-semibold transition-colors"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tutorial;
