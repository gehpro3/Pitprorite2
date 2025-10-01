
import { Card } from '../types';

/**
 * Calculates the value of a hand in Blackjack.
 * Aces are counted as 11 unless that would cause a bust, in which case they are 1.
 * @param hand An array of Card objects.
 * @param options Optional settings.
 * @param options.countFaceDown If true, includes face-down cards in the calculation. Defaults to false.
 * @returns The numeric value of the hand.
 */
export const getHandValue = (hand: Card[], { countFaceDown = false } = {}): number => {
    let value = 0;
    let aces = 0;
    for (const card of hand) {
        if (card.isFaceDown && !countFaceDown) continue;
        
        if (['J', 'Q', 'K'].includes(card.rank)) {
            value += 10;
        } else if (card.rank === 'A') {
            aces += 1;
            value += 11;
        } else {
            value += parseInt(card.rank, 10);
        }
    }
    while (value > 21 && aces > 0) {
        value -= 10;
        aces -= 1;
    }
    return value;
};

/**
 * Calculates the value of a hand and determines if it's a "soft" hand (an Ace is counted as 11).
 * @param hand An array of Card objects.
 * @param options Optional settings.
 * @param options.countFaceDown If true, includes face-down cards in the calculation. Defaults to false.
 * @returns An object with the hand's value and an isSoft boolean.
 */
export const getHandDetails = (hand: Card[], { countFaceDown = false } = {}): { value: number; isSoft: boolean } => {
    let value = 0;
    let aces = 0;
    for (const card of hand) {
        if (card.isFaceDown && !countFaceDown) continue;
        
        if (['J', 'Q', 'K'].includes(card.rank)) {
            value += 10;
        } else if (card.rank === 'A') {
            aces += 1;
            value += 11;
        } else {
            value += parseInt(card.rank, 10);
        }
    }
    
    let usableAces = aces;
    while (value > 21 && usableAces > 0) {
        value -= 10;
        usableAces -= 1;
    }

    const isSoft = usableAces > 0;
    return { value, isSoft };
};
