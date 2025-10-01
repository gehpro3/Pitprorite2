
export enum Suit {
    HEARTS = '♥',
    DIAMONDS = '♦',
    CLUBS = '♣',
    SPADES = '♠',
}

export enum Rank {
    ACE = 'A',
    TWO = '2',
    THREE = '3',
    FOUR = '4',
    FIVE = '5',
    SIX = '6',
    SEVEN = '7',
    EIGHT = '8',
    NINE = '9',
    TEN = '10',
    JACK = 'J',
    QUEEN = 'Q',
    KING = 'K',
}

export interface Card {
    suit: Suit;
    rank: Rank;
    isFaceDown?: boolean;
}

export interface Player {
    id: number | string;
    hand: Card[];
    bet: number;
    betError?: string;
    outcome?: 'win' | 'loss' | 'push' | 'blackjack' | 'surrender';
    isBusted: boolean;
    hasBlackjack: boolean;
    canHit: boolean;
    canStand: boolean;
    canDoubleDown: boolean;
    canSplit: boolean;
    canSurrender: boolean;
    isFinished: boolean;
    hasDoubledDown?: boolean;
    hasInsurance?: boolean;
    payoutRule: '3:2' | '6:5';
    hasSplit?: boolean;
    isAuto?: boolean;
}

export interface Dealer {
    hand: Card[];
}

export interface GameState {
    dealer: Dealer;
    players: Player[];
    deck: Card[];
    prompt: string;
    rules: string;
    isPlayerTurn: boolean;
    isInsuranceOffered?: boolean;
}

export type TraineeAction = 'hit' | 'stand' | 'double' | 'split' | 'acceptInsurance' | 'declineInsurance' | 'surrender';
export type CueCategory = 'dealing' | 'payout' | 'change';
export type DealingSubCategory = 'initial_deal' | 'announce_bets' | 'check_actions' | 'announce_upcard' | 'announce_bets_open';
export type PayoutSubCategory = 'win' | 'blackjack';

export type PracticeMode = 'audition' | 'cardCounting' | 'chipPayout' | 'pitProRite' | 'hitStand' | 'dealerTalk' | 'virginiaRules';