import styled from '@emotion/styled'

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades'
export type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'

interface CardProps {
  suit: Suit
  value: Value
  hidden?: boolean
}

const CardContainer = styled.div<{ hidden?: boolean }>`
  width: 100px;
  height: 140px;
  background: ${props => props.hidden ? 'linear-gradient(135deg, #2c3e50, #34495e)' : 'white'};
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
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
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
  }
`

const TopValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`

const CenterSuit = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

const BottomValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
  transform: rotate(180deg);
`

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
`

export const Card = ({ suit, value, hidden }: CardProps) => {
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
      <CardContainer hidden>
        <HiddenPattern />
      </CardContainer>
    )
  }

  return (
    <CardContainer suit={suit}>
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