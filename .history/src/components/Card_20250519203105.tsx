import styled from '@emotion/styled'

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades'
export type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'

export interface CardProps {
  suit: Suit
  value: Value
  onClick?: () => void
  hidden?: boolean
}

const CardContainer = styled.div<{ suit: Suit; hidden?: boolean }>`
  width: 100px;
  height: 140px;
  background: ${props => props.hidden ? '#2a2a2a' : 'white'};
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${props => {
    if (props.hidden) return 'transparent';
    return props.suit === 'hearts' || props.suit === 'diamonds' ? '#ff4757' : '#2f3542';
  }};
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  transition: transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: ${props => props.onClick ? 'translateY(-5px)' : 'none'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.hidden ? 'repeating-linear-gradient(45deg, #2a2a2a, #2a2a2a 10px, #333 10px, #333 20px)' : 'none'};
    border-radius: 8px;
  }
`

const TopValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`

const CenterSuit = styled.div`
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

const BottomValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  transform: rotate(180deg);
`

const Card = ({ suit, value, onClick, hidden }: CardProps) => {
  const getSuitSymbol = (suit: Suit) => {
    switch (suit) {
      case 'hearts': return '♥'
      case 'diamonds': return '♦'
      case 'clubs': return '♣'
      case 'spades': return '♠'
    }
  }

  return (
    <CardContainer suit={suit} onClick={onClick} hidden={hidden}>
      <TopValue>{hidden ? '?' : value}</TopValue>
      <CenterSuit>{hidden ? '?' : getSuitSymbol(suit)}</CenterSuit>
      <BottomValue>{hidden ? '?' : value}</BottomValue>
    </CardContainer>
  )
}

export default Card 