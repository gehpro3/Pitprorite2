import React from 'react';
import { PracticeMode } from '../types';

interface SidebarProps {
  activeMode: PracticeMode;
  setActiveMode: (mode: PracticeMode) => void;
}

const iconStyle = "w-6 h-6";

const AuditionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconStyle}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const GrooveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconStyle}><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>;
const RulesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconStyle}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>;
const ChipPayoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconStyle}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg>;
const HitStandIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconStyle}><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.042L15 21a2.25 2.25 0 0 0-2.25-2.25h-1.5a2.25 2.25 0 0 0-2.25 2.25c0 .355.116.684.31.958L10.5 21.042m4.542-.001a4.5 4.5 0 1 0-9.085 0M9 3.75a3 3 0 0 0-3 3v1.5a3 3 0 0 0 3 3v-6Z" /></svg>;
const CardCountingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconStyle}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>;
const DealerTalkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconStyle}><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.404 3 12s4.03 8.25 9 8.25Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75h.008v.008H12v-.008Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.75h.008v.008H7.5v-.008Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75h.008v.008H16.5v-.008Z" /></svg>;


const modes: { id: PracticeMode; label: string; icon: React.ReactElement }[] = [
    { id: 'audition', label: 'Dealer Audition', icon: <AuditionIcon /> },
    { id: 'pitProRite', label: "PitProRite Challenge", icon: <GrooveIcon /> },
    { id: 'chipPayout', label: 'Chip Payouts', icon: <ChipPayoutIcon /> },
    { id: 'hitStand', label: 'Hit/Stand Drills', icon: <HitStandIcon /> },
    { id: 'cardCounting', label: 'Card Counting', icon: <CardCountingIcon /> },
    { id: 'dealerTalk', label: 'Dealer Talk', icon: <DealerTalkIcon /> },
    { id: 'virginiaRules', label: 'Virginia Rules', icon: <RulesIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ activeMode, setActiveMode }) => {
  return (
    <aside className="w-64 bg-slate-950 p-4 flex-col border-r border-slate-700/50 shadow-lg hidden sm:flex">
      <div className="text-center mb-8 pt-4">
        <h2 className="text-2xl font-bold text-slate-200 tracking-wide">PitProRite</h2>
        <p className="text-xs text-amber-300/80 font-semibold tracking-wider">TRAINING MENU</p>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {modes.map(mode => {
            const isActive = activeMode === mode.id;
            return (
              <li key={mode.id}>
                <button
                  onClick={() => setActiveMode(mode.id)}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg text-left font-semibold transition-all duration-200 ease-in-out transform hover:translate-x-1 ${
                    isActive
                      ? 'bg-slate-700 text-white shadow-inner'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {mode.icon}
                  <span>{mode.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="text-center text-xs text-slate-600 p-2">
        <p>Version 2.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;