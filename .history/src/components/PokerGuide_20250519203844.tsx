import styled from '@emotion/styled'
import Card from './Card'
import { type Suit, type Value } from './Card'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Title = styled.h2`
  color: #4ecdc4;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
`

const HandSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
`

const HandTitle = styled.h3`
  color: #4ecdc4;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const HandDescription = styled.p`
  color: #a0a0a0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`

const CardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`

const HandStrength = styled.div<{ strength: number }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: ${props => {
    const strength = props.strength;
    if (strength >= 0.9) return 'rgba(46, 213, 115, 0.1)';
    if (strength >= 0.7) return 'rgba(255, 171, 0, 0.1)';
    if (strength >= 0.5) return 'rgba(255, 171, 0, 0.1)';
    return 'rgba(255, 71, 87, 0.1)';
  }};
  color: ${props => {
    const strength = props.strength;
    if (strength >= 0.9) return '#2ed573';
    if (strength >= 0.7) return '#ffa502';
    if (strength >= 0.5) return '#ffa502';
    return '#ff4757';
  }};
  font-size: 0.9rem;
  display: inline-block;
`

const Tips = styled.div`
  background: rgba(78, 205, 196, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
`

const TipTitle = styled.h4`
  color: #4ecdc4;
  margin-bottom: 0.5rem;
`

const TipList = styled.ul`
  color: #a0a0a0;
  margin: 0;
  padding-left: 1.5rem;
`

interface PokerHand {
  name: string
  description: string
  cards: Array<{ suit: Suit; value: Value }>
  strength: number
  tips: string[]
}

const pokerHands: PokerHand[] = [
  {
    name: 'Royal Flush',
    description: 'The highest possible hand in poker. A straight flush from 10 to Ace, all in the same suit.',
    cards: [
      { suit: 'hearts', value: '10' },
      { suit: 'hearts', value: 'J' },
      { suit: 'hearts', value: 'Q' },
      { suit: 'hearts', value: 'K' },
      { suit: 'hearts', value: 'A' }
    ],
    strength: 1.0,
    tips: [
      'The rarest and strongest hand in poker',
      'Only 4 possible combinations in a deck',
      'Always play this hand aggressively'
    ]
  },
  {
    name: 'Straight Flush',
    description: 'Five consecutive cards of the same suit. The second-highest hand in poker.',
    cards: [
      { suit: 'spades', value: '5' },
      { suit: 'spades', value: '6' },
      { suit: 'spades', value: '7' },
      { suit: 'spades', value: '8' },
      { suit: 'spades', value: '9' }
    ],
    strength: 0.95,
    tips: [
      'Very rare hand, only beaten by a Royal Flush',
      'Higher straight flush beats lower straight flush',
      'Play aggressively when you have this hand'
    ]
  },
  {
    name: 'Four of a Kind',
    description: 'Four cards of the same rank, plus any other card. Also known as "Quads".',
    cards: [
      { suit: 'hearts', value: 'A' },
      { suit: 'diamonds', value: 'A' },
      { suit: 'clubs', value: 'A' },
      { suit: 'spades', value: 'A' },
      { suit: 'hearts', value: 'K' }
    ],
    strength: 0.9,
    tips: [
      'Extremely strong hand, rarely beaten',
      'Higher four of a kind beats lower four of a kind',
      'The kicker (fifth card) only matters if both players have four of a kind'
    ]
  },
  {
    name: 'Full House',
    description: 'Three cards of one rank and two cards of another rank. Also known as "Full Boat".',
    cards: [
      { suit: 'hearts', value: 'K' },
      { suit: 'diamonds', value: 'K' },
      { suit: 'clubs', value: 'K' },
      { suit: 'spades', value: 'Q' },
      { suit: 'hearts', value: 'Q' }
    ],
    strength: 0.85,
    tips: [
      'Strong hand that often wins in showdown',
      'The three of a kind determines the strength first',
      'If three of a kind is equal, the pair determines the winner'
    ]
  },
  {
    name: 'Flush',
    description: 'Five cards of the same suit, not in sequence.',
    cards: [
      { suit: 'diamonds', value: '2' },
      { suit: 'diamonds', value: '5' },
      { suit: 'diamonds', value: '7' },
      { suit: 'diamonds', value: '9' },
      { suit: 'diamonds', value: 'K' }
    ],
    strength: 0.8,
    tips: [
      'Strong hand that can win many pots',
      'Highest card in the flush determines the winner',
      'If highest cards are equal, compare second highest, and so on'
    ]
  },
  {
    name: 'Straight',
    description: 'Five consecutive cards of mixed suits.',
    cards: [
      { suit: 'hearts', value: '5' },
      { suit: 'diamonds', value: '6' },
      { suit: 'clubs', value: '7' },
      { suit: 'spades', value: '8' },
      { suit: 'hearts', value: '9' }
    ],
    strength: 0.75,
    tips: [
      'Medium-strength hand that can win pots',
      'Ace can be high (A-K-Q-J-10) or low (A-2-3-4-5)',
      'Higher straight beats lower straight'
    ]
  },
  {
    name: 'Three of a Kind',
    description: 'Three cards of the same rank, plus two unrelated cards. Also known as "Trips" or "Set".',
    cards: [
      { suit: 'hearts', value: 'Q' },
      { suit: 'diamonds', value: 'Q' },
      { suit: 'clubs', value: 'Q' },
      { suit: 'spades', value: '7' },
      { suit: 'hearts', value: '2' }
    ],
    strength: 0.7,
    tips: [
      'Decent hand that can win smaller pots',
      'Higher three of a kind beats lower three of a kind',
      'Kickers only matter if both players have the same three of a kind'
    ]
  },
  {
    name: 'Two Pair',
    description: 'Two different pairs of cards, plus one unrelated card.',
    cards: [
      { suit: 'hearts', value: 'J' },
      { suit: 'diamonds', value: 'J' },
      { suit: 'clubs', value: '8' },
      { suit: 'spades', value: '8' },
      { suit: 'hearts', value: '3' }
    ],
    strength: 0.65,
    tips: [
      'Medium-strength hand',
      'Higher pair determines the winner',
      'If higher pairs are equal, lower pair determines the winner'
    ]
  },
  {
    name: 'One Pair',
    description: 'Two cards of the same rank, plus three unrelated cards.',
    cards: [
      { suit: 'hearts', value: 'A' },
      { suit: 'diamonds', value: 'A' },
      { suit: 'clubs', value: 'K' },
      { suit: 'spades', value: 'Q' },
      { suit: 'hearts', value: 'J' }
    ],
    strength: 0.6,
    tips: [
      'Weak hand that often needs improvement',
      'Higher pair beats lower pair',
      'Kickers determine the winner if pairs are equal'
    ]
  },
  {
    name: 'High Card',
    description: 'No combination. The highest card in your hand determines its strength.',
    cards: [
      { suit: 'hearts', value: 'A' },
      { suit: 'diamonds', value: 'K' },
      { suit: 'clubs', value: 'Q' },
      { suit: 'spades', value: 'J' },
      { suit: 'hearts', value: '9' }
    ],
    strength: 0.5,
    tips: [
      'Weakest possible hand',
      'Highest card determines the winner',
      'If highest cards are equal, compare second highest, and so on'
    ]
  }
]

export const PokerGuide = () => {
  return (
    <Container>
      <Title>Poker Hand Rankings Guide</Title>
      {pokerHands.map((hand, index) => (
        <HandSection key={hand.name}>
          <HandTitle>
            {index + 1}. {hand.name}
            <HandStrength strength={hand.strength}>
              {hand.strength >= 0.9 ? 'Very Strong' :
               hand.strength >= 0.7 ? 'Strong' :
               hand.strength >= 0.5 ? 'Medium' : 'Weak'}
            </HandStrength>
          </HandTitle>
          <HandDescription>{hand.description}</HandDescription>
          <CardsContainer>
            {hand.cards.map((card, cardIndex) => (
              <Card
                key={`${hand.name}-${cardIndex}`}
                suit={card.suit}
                value={card.value}
              />
            ))}
          </CardsContainer>
          <Tips>
            <TipTitle>Key Points:</TipTitle>
            <TipList>
              {hand.tips.map((tip, tipIndex) => (
                <li key={`${hand.name}-tip-${tipIndex}`}>{tip}</li>
              ))}
            </TipList>
          </Tips>
        </HandSection>
      ))}
    </Container>
  )
} 