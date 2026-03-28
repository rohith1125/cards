import type { Suit, Value } from '../components/Card'

export interface CardData {
  suit: Suit
  value: Value
}

const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades']
const VALUES: Value[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

export const createDeck = (): CardData[] => {
  const deck: CardData[] = []
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({ suit, value })
    }
  }
  return deck
}

export const shuffleDeck = (deck: CardData[]): CardData[] => {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const dealCards = (deck: CardData[], numPlayers: number, cardsPerPlayer: number): CardData[][] => {
  const hands: CardData[][] = Array(numPlayers).fill(null).map(() => [])
  const shuffledDeck = shuffleDeck(deck)
  
  for (let i = 0; i < cardsPerPlayer; i++) {
    for (let j = 0; j < numPlayers; j++) {
      if (shuffledDeck.length > 0) {
        hands[j].push(shuffledDeck.pop()!)
      }
    }
  }
  
  return hands
}

export const calculateProbability = (deck: CardData[], targetCards: CardData[]): number => {
  const remainingCards = deck.length
  const targetCount = targetCards.length
  
  if (targetCount > remainingCards) return 0
  
  let probability = 1
  for (let i = 0; i < targetCount; i++) {
    probability *= (targetCount - i) / (remainingCards - i)
  }
  
  return probability
} 