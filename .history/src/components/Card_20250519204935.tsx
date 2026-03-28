import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades'
export type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'

interface CardProps {
  suit: Suit
  value: Value
  hidden?: boolean
  onClick?: () => void
}

const cardFlip = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(180deg); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(78, 205, 196, 0.3); }
  50% { box-shadow: 0 0 20px rgba(78, 205, 196, 0.5); }
  100% { box-shadow: 0 0 5px rgba(78, 205, 196, 0.3); }
`;

const CardContainer = styled.div<{ hidden?: boolean }>`
  width: 100px;
  height: 140px;
  background: ${props => props.hidden 
    ? 'linear-gradient(135deg, #2c3e50, #34495e)'
    : 'linear-gradient(135deg, #ffffff, #f8f9fa)'};
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${props => {
    if (props.hidden) return 'white';
    return props.suit === 'hearts' || props.suit === 'diamonds' ? '#e74c3c' : '#2c3e50';
  }};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;

  &:hover {
    transform: translateY(-5px) rotateX(5deg);
    animation: ${glowAnimation} 2s infinite;
  }

  &::after {
    content: 'SRT';
    position: absolute;
    bottom: 2px;
    right: 2px;
    font-size: 6px;
    opacity: 0.1;
    font-family: monospace;
    transform: rotate(-45deg);
    text-shadow: 0 0 2px rgba(78, 205, 196, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.1) 49%, transparent 50%);
    background-size: 20px 20px;
    opacity: 0.1;
    pointer-events: none;
  }
`;

const TopValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const CenterSuit = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BottomValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
  transform: rotate(180deg);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const HiddenPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.1) 49%, rgba(255, 255, 255, 0.1) 51%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, rgba(255, 255, 255, 0.1) 49%, rgba(255, 255, 255, 0.1) 51%, transparent 52%);
  background-size: 20px 20px;
  animation: ${cardFlip} 0.6s ease-in-out;
`;

export const Card = ({ suit, value, hidden, onClick }: CardProps) => {
  const getSuitSymbol = (suit: Suit) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
    }
  }

  if (hidden) {
    return (
      <CardContainer hidden onClick={onClick}>
        <HiddenPattern />
      </CardContainer>
    )
  }

  return (
    <CardContainer suit={suit} onClick={onClick}>
      <TopValue>
        {value}
        {getSuitSymbol(suit)}
      </TopValue>
      <CenterSuit>
        {getSuitSymbol(suit)}
      </CenterSuit>
      <BottomValue>
        {value}
        {getSuitSymbol(suit)}
      </BottomValue>
    </CardContainer>
  )
} 