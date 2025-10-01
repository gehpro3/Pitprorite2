
import React from 'react';
import { Player } from '../types';
import Card from './Card';
import Chip from './Chip';
import { getHandValue } from '../utils/handCalculator';
import { calculateChips } from '../utils/chipCalculator';

const HitIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const StandIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.042L15 21a2.25 2.25 0 0 0-2.25-2.25h-1.5a2.25 2.25 0 0 0-2.25 2.25c0 .355.116.684.31.958L10.5 21.042m4.542-.001a4.5 4.5 0 1 0-9.085 0M9 3.75a3 3 0 0 0-3 3v1.5a3 3 0 0 0 3 3v-6z" /></svg>;
const DoubleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18l-2.25-2.25m0 0l2.25-2.25M15.75 15.75H18m-7.5-6H13.5v5.25m0 0l-3.75-3.75M10.5 15V9.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25a4.5 4.5 0 0 0-4.5-4.5H7.5a4.5 4.5 0 0 0-4.5 4.5Z" /></svg>;
const SplitIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>;
const SurrenderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" /></svg>;

interface PlayerHandProps {
    player: Player;
    gamePhase: 'betting' | 'playing';
    isCurrentPlayer: boolean;
    isPayoutPhase: boolean;
    isInsuranceOffered: boolean;
    isSplitHand: boolean;
    splitHandIndex?: number;
    onHit: (playerId: number | string) => void;
    onStand: (playerId: number | string) => void;
    onDoubleDown: (playerId: number | string) => void;
    onSplit: (playerId: number | string) => void;
    onSurrender: (playerId: number | string) => void;
    onAcceptInsurance: (playerId: number | string) => void;
    onDeclineInsurance: (playerId: number | string) => void;
    onBetChange: (playerId: number | string, bet: string) => void;
}

const PlayerHand: React.FC<PlayerHandProps> = ({
    player,
    gamePhase,
    isCurrentPlayer,
    isPayoutPhase,
    isInsuranceOffered,
    isSplitHand,
    splitHandIndex = 0,
    onHit,
    onStand,
    onDoubleDown,
    onSplit,
    onSurrender,
    onAcceptInsurance,
    onDeclineInsurance,
    onBetChange,
}) => {
    const handValue = getHandValue(player.hand);
    const chips = calculateChips(player.bet);
    const isInsurancePhase = isCurrentPlayer && !isPayoutPhase && isInsuranceOffered;
    const isAutoPlayer = !!player.isAuto;
    const playerLabel = isSplitHand ? `Hand ${splitHandIndex + 1}` : `Player ${player.id}`;
    const hasBetError = !!player.betError;


    const getOutcomeStyles = () => {
        if (!isPayoutPhase || !player.outcome) return '';
        switch (player.outcome) {
            case 'win':
            case 'blackjack':
                return 'bg-green-500/30 border-green-400';
            case 'loss':
                return 'bg-red-500/30 border-red-400';
            case 'push':
                return 'bg-gray-500/30 border-gray-400';
            case 'surrender':
                 return 'bg-orange-500/30 border-orange-400';
            default:
                return '';
        }
    };

    const renderOutcomeInfo = () => {
        if (!player.outcome) return null;
    
        let payoutAmount: number;
        let payoutColor: string;
        let secondaryMessage: string | null = null;
        let calculationDetail: string | null = null;

        switch (player.outcome) {
            case 'win':
                payoutAmount = player.bet;
                payoutColor = 'text-green-400';
                calculationDetail = `1:1 Payout on $${player.bet}`;
                break;
            case 'blackjack':
                const payoutMultiplier = player.payoutRule === '3:2' ? 1.5 : 1.2;
                payoutAmount = player.bet * payoutMultiplier;
                payoutColor = 'text-yellow-300';
                secondaryMessage = 'BLACKJACK!';
                calculationDetail = `$${player.bet} × ${payoutMultiplier} (${player.payoutRule}) = $${payoutAmount.toFixed(2)}`;
                break;
            case 'loss':
                payoutAmount = -player.bet;
                payoutColor = 'text-red-400';
                if (player.isBusted) {
                    secondaryMessage = 'BUST';
                }
                calculationDetail = `Lost $${player.bet} bet`;
                break;
            case 'push':
                payoutAmount = 0;
                payoutColor = 'text-gray-400';
                calculationDetail = 'Bet returned';
                break;
            case 'surrender':
                payoutAmount = -player.bet / 2;
                payoutColor = 'text-orange-400';
                secondaryMessage = 'SURRENDER';
                calculationDetail = `Lost half of $${player.bet} bet`;
                break;
            default:
                return null;
        }
        
        const formatCurrency = (amount: number) => {
            const value = Math.abs(amount);
            const formattedValue = value.toFixed(2);
            
            if (amount > 0) return `+$${formattedValue}`;
            if (amount < 0) return `-$${formattedValue}`;
            return '$0.00';
        };
        
        const primaryText = player.outcome === 'push' ? 'PUSH' : formatCurrency(payoutAmount);
    
        return (
            <div className="flex flex-col items-center text-center space-y-1">
                <div className={`text-2xl font-bold ${payoutColor}`}>
                    {primaryText}
                </div>
                {secondaryMessage && (
                    <div className="text-base font-bold text-gray-200 -mt-1">
                        {secondaryMessage}
                    </div>
                )}
                {calculationDetail && (
                     <div className="text-sm text-gray-400 mt-1 px-2 py-1 bg-black/20 rounded-lg">
                        {calculationDetail}
                    </div>
                )}
            </div>
        );
    };
    
    const actionButtonStyles = "w-full font-bold py-2 px-3 rounded-lg text-sm text-white transition-colors disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2";

    return (
        <div className={`p-3 rounded-xl border-2 transition-all duration-300 flex-grow-0 flex-shrink-0 basis-full sm:basis-[240px] md:basis-[260px] ${isCurrentPlayer ? 'bg-yellow-400/20 border-yellow-300 shadow-lg opacity-100' : 'bg-black/20 border-transparent opacity-75'} ${getOutcomeStyles()}`}>
            <div className="flex justify-between items-start mb-3">
                 <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-200">{playerLabel}</h3>
                        {isAutoPlayer && <span className="px-2 py-0.5 text-xs font-bold text-gray-200 bg-gray-600/70 rounded-full">AUTO</span>}
                    </div>
                    <span className={`mt-1 text-xs font-bold px-2 py-0.5 rounded-full ${player.payoutRule === '3:2' ? 'bg-yellow-400 text-black' : 'bg-purple-600 text-white'}`}>
                        BJ PAYS {player.payoutRule}
                    </span>
                </div>
            </div>
            
            <div className="relative flex justify-center items-center min-h-[140px]">
                {player.hand.map((card, index) => {
                    const totalCards = player.hand.length;
                    const offsetFromMid = index - (totalCards - 1) / 2;
                    
                    const angle = offsetFromMid * 6;
                    const translateY = Math.abs(offsetFromMid) * 5;
                    const translateX = offsetFromMid * 30;

                    return (
                        <div
                            key={index}
                            className="absolute transition-all duration-500 ease-out"
                            style={{
                                transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${angle}deg)`,
                                zIndex: index
                            }}
                        >
                            <Card card={card} />
                        </div>
                    );
                })}
                 {gamePhase === 'betting' && !player.isAuto && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                        <span className="text-gray-300 font-bold text-lg">Waiting for Deal...</span>
                    </div>
                )}
            </div>

            <div className="mt-3 flex items-center justify-center min-h-[60px]">
                {isPayoutPhase ? (
                    renderOutcomeInfo()
                ) : (
                    <div className="w-full flex justify-between items-center">
                        {gamePhase === 'betting' && !player.isAuto ? (
                             <div className="flex flex-col items-center gap-1 w-full justify-center">
                                <div className="flex items-center gap-2">
                                    <label htmlFor={`bet-${player.id}`} className="text-lg font-bold text-gray-300">Bet:</label>
                                    <span className="text-lg font-bold text-yellow-300">$</span>
                                    <input
                                        id={`bet-${player.id}`}
                                        type="number"
                                        value={player.bet || ''}
                                        onChange={(e) => onBetChange(player.id, e.target.value)}
                                        min="5"
                                        className={`w-24 bg-gray-900 border-2 rounded-lg text-yellow-300 text-center font-bold text-xl p-1 focus:outline-none focus:ring-2 ${hasBetError ? 'border-red-500 focus:ring-red-400' : 'border-gray-600 focus:ring-yellow-400'}`}
                                    />
                                </div>
                                {hasBetError && <p className="text-red-400 text-xs font-semibold">{player.betError}</p>}
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3">
                                     <div className="flex items-center space-x-[-25px]">
                                        {chips.map((chipValue, index) => (
                                        <div key={index} style={{transform: 'scale(0.7)'}}><Chip value={chipValue} /></div>
                                        ))}
                                    </div>
                                    <span className="text-lg font-bold text-gray-300">Bet: <span className="text-yellow-300">${player.bet}</span></span>
                                </div>
                                {handValue > 0 && (
                                    <span className="text-xl font-bold px-4 py-1 rounded-full bg-gray-800 text-yellow-300">
                                        {handValue}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

             {player.hasDoubledDown && !isPayoutPhase && (
                <div className="text-center -mt-4 mb-2">
                    <span className="px-1.5 py-0.5 text-xs font-bold text-black bg-yellow-400 rounded">DOUBLED DOWN</span>
                </div>
            )}
            {player.hasInsurance && !isPayoutPhase && (
                 <div className="text-center -mt-4 mb-2">
                    <span className="px-1.5 py-0.5 text-xs font-bold text-white bg-blue-600 rounded">INSURED</span>
                </div>
            )}

            {isInsurancePhase ? (
                 <div className="mt-4 grid grid-cols-2 gap-2">
                    <button onClick={() => onAcceptInsurance(player.id)} className={`${actionButtonStyles} bg-green-500 hover:bg-green-600`}>Accept</button>
                    <button onClick={() => onDeclineInsurance(player.id)} className={`${actionButtonStyles} bg-red-500 hover:bg-red-600`}>Decline</button>
                </div>
            ) : isCurrentPlayer && !isPayoutPhase && (
                 <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <button onClick={() => onHit(player.id)} disabled={!player.canHit} className={`${actionButtonStyles} bg-green-500 hover:bg-green-600`}><HitIcon /><span>Hit</span></button>
                    <button onClick={() => onStand(player.id)} disabled={!player.canStand} className={`${actionButtonStyles} bg-red-500 hover:bg-red-600`}><StandIcon /><span>Stand</span></button>
                    <button onClick={() => onDoubleDown(player.id)} disabled={!player.canDoubleDown} className={`${actionButtonStyles} bg-blue-500 hover:bg-blue-600`}><DoubleIcon /><span>Double</span></button>
                    <button onClick={() => onSplit(player.id)} disabled={!player.canSplit} className={`${actionButtonStyles} bg-purple-500 hover:bg-purple-600`}><SplitIcon /><span>Split</span></button>
                    <button onClick={() => onSurrender(player.id)} disabled={!player.canSurrender} className={`${actionButtonStyles} bg-gray-500 hover:bg-gray-400`}><SurrenderIcon /><span>Surrender</span></button>
                </div>
            )}
        </div>
    );
};

export default PlayerHand;