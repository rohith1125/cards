import { useState } from 'react'
import styled from '@emotion/styled'
import { ProbabilityCalculator } from './components/ProbabilityCalculator'
import { Blackjack } from './components/Blackjack'
import { PokerGuide } from './components/PokerGuide'
import { BlackjackGuide } from './components/BlackjackGuide'

const Container = styled.div`
  min-height: 100vh;
  background: #1a1a1a;
  color: white;
  padding: 2rem;
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Description = styled.p`
  color: #a0a0a0;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`

const NavButton = styled.button<{ active: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#4ecdc4' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#45b7af' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

function App() {
  const [activePage, setActivePage] = useState<'calculator' | 'blackjack' | 'poker-guide' | 'blackjack-guide'>('calculator')

  return (
    <Container>
      <Header>
        <Title>Card Master</Title>
        <Description>
          Your ultimate card game companion. Calculate probabilities, play classic blackjack, and learn poker hands.
        </Description>
      </Header>

      <Navigation>
        <NavButton 
          active={activePage === 'calculator'} 
          onClick={() => setActivePage('calculator')}
        >
          Probability Calculator
        </NavButton>
        <NavButton 
          active={activePage === 'blackjack'} 
          onClick={() => setActivePage('blackjack')}
        >
          Blackjack
        </NavButton>
        <NavButton 
          active={activePage === 'blackjack-guide'} 
          onClick={() => setActivePage('blackjack-guide')}
        >
          Blackjack Guide
        </NavButton>
        <NavButton 
          active={activePage === 'poker-guide'} 
          onClick={() => setActivePage('poker-guide')}
        >
          Poker Guide
        </NavButton>
      </Navigation>

      {activePage === 'calculator' ? (
        <ProbabilityCalculator />
      ) : activePage === 'blackjack' ? (
        <Blackjack />
      ) : activePage === 'blackjack-guide' ? (
        <BlackjackGuide />
      ) : (
        <PokerGuide />
      )}
    </Container>
  )
}

export default App
