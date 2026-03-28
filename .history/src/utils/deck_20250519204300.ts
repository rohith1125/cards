import type { Suit, Value } from '../components/Card'

// Card data interface for representing a playing card
export type CardData = {
  suit: Suit
  value: Value
}

const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades']
const VALUES: Value[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

// Create a new deck of 52 cards
export const createDeck = (): CardData[] => {
  const deck: CardData[] = []
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({ suit, value })
    }
  }
  return deck
}

// Fisher-Yates shuffle algorithm
export const shuffleDeck = (deck: CardData[]): CardData[] => {
  if (!deck.length) return []
  
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Deal cards to multiple players
export const dealCards = (deck: CardData[], numPlayers: number, cardsPerPlayer: number): { hands: CardData[][], remainingDeck: CardData[] } => {
  if (!deck.length || numPlayers <= 0 || cardsPerPlayer <= 0) {
    return { hands: [], remainingDeck: deck }
  }

  const hands: CardData[][] = Array(numPlayers).fill(null).map(() => [])
  const shuffledDeck = shuffleDeck(deck)
  const totalCardsNeeded = numPlayers * cardsPerPlayer
  
  if (totalCardsNeeded > shuffledDeck.length) {
    throw new Error('Not enough cards in deck for all players')
  }
  
  for (let i = 0; i < cardsPerPlayer; i++) {
    for (let j = 0; j < numPlayers; j++) {
      const card = shuffledDeck.pop()
      if (card) {
        hands[j].push(card)
      }
    }
  }
  
  return { hands, remainingDeck: shuffledDeck }
}

// Calculate probability of drawing specific cards in sequence
export const calculateProbability = (deck: CardData[], targetCards: CardData[]): number => {
  if (!deck.length || !targetCards.length) return 0
  
  const remainingCards = deck.length
  const targetCount = targetCards.length
  
  if (targetCount > remainingCards) return 0
  
  let probability = 1
  for (let i = 0; i < targetCount; i++) {
    probability *= (targetCount - i) / (remainingCards - i)
  }
  
  return probability
}

// Calculate blackjack hand value
export const calculateHandValue = (cards: CardData[]): number => {
  if (!cards.length) return 0
  
  let value = 0
  let aces = 0

  cards.forEach(card => {
    if (card.value === 'A') {
      aces++
      value += 11
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      value += 10
    } else {
      value += parseInt(card.value)
    }
  })

  // Adjust for aces
  while (value > 21 && aces > 0) {
    value -= 10
    aces--
  }

  return value
}

// Check if a hand is a blackjack (Ace + 10-value card)
export const isBlackjack = (cards: CardData[]): boolean => {
  if (cards.length !== 2) return false
  
  const hasAce = cards.some(card => card.value === 'A')
  const hasTenValue = cards.some(card => ['10', 'J', 'Q', 'K'].includes(card.value))
  
  return hasAce && hasTenValue
} 