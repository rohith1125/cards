import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades'
export type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'

interface CardProps {
  suit: Suit
  value: Value
  faceUp?: boolean
  onClick?: () => void
}

const CardContainer = styled(motion.div)<{ faceUp: boolean }>`
  width: 120px;
  height: 180px;
  background: ${props => props.faceUp ? 'white' : '#2c3e50'};
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
`

const CardValue = styled.div<{ suit: Suit }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.suit === 'hearts' || props.suit === 'diamonds' ? '#e74c3c' : '#2c3e50'};
`

const CardSuit = styled.div<{ suit: Suit }>`
  font-size: 2rem;
  color: ${props => props.suit === 'hearts' || props.suit === 'diamonds' ? '#e74c3c' : '#2c3e50'};
`

const getSuitSymbol = (suit: Suit): string => {
  switch (suit) {
    case 'hearts': return '♥'
    case 'diamonds': return '♦'
    case 'clubs': return '♣'
    case 'spades': return '♠'
  }
}

export const Card = ({ suit, value, faceUp = true, onClick }: CardProps) => {
  return (
    <CardContainer
      faceUp={faceUp}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {faceUp ? (
        <>
          <CardValue suit={suit}>{value}</CardValue>
          <CardSuit suit={suit}>{getSuitSymbol(suit)}</CardSuit>
        </>
      ) : (
        <div style={{ 
          background: 'linear-gradient(45deg, #2c3e50, #34495e)',
          width: '100%',
          height: '100%',
          borderRadius: '5px'
        }} />
      )}
    </CardContainer>
  )
} 