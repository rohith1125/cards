import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { ProbabilityCalculator } from "./components/ProbabilityCalculator";
import { Blackjack } from "./components/Blackjack";
import { PokerGuide } from './components/PokerGuide'
import { BlackjackGuide } from './components/BlackjackGuide'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const signatureAnimation = keyframes`
  0% { opacity: 0; transform: scale(0.8) rotate(-5deg); }
  50% { opacity: 0.5; transform: scale(1.1) rotate(-3deg); }
  100% { opacity: 0.3; transform: scale(1) rotate(-5deg); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shineAnimation = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(46, 213, 115, 0.1) 0%, transparent 50%);
    pointer-events: none;
    animation: ${floatAnimation} 10s ease-in-out infinite;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 0;
  background: linear-gradient(45deg, #4ecdc4, #2ed573, #4ecdc4);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(78, 205, 196, 0.3);
  animation: ${shineAnimation} 3s linear infinite;
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  color: #a0a0a0;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const NavButton = styled.button<{ active: boolean }>`
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active 
    ? 'linear-gradient(45deg, #4ecdc4, #2ed573)'
    : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(78, 205, 196, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Signature = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  font-family: 'Brush Script MT', cursive;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.3);
  transform: rotate(-5deg);
  animation: ${signatureAnimation} 3s ease-in-out infinite;
  pointer-events: none;
  text-shadow: 0 0 10px rgba(78, 205, 196, 0.3);
  z-index: 1000;
`;

const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1a1a2e;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out;
`;

const LoadingText = styled.div`
  font-size: 2rem;
  color: #4ecdc4;
  text-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
  animation: ${fadeIn} 1s ease-out infinite alternate;
  position: relative;

  &::after {
    content: '...';
    position: absolute;
    animation: ${fadeIn} 1s ease-out infinite alternate;
  }
`;

type Page = 'calculator' | 'blackjack' | 'poker-guide' | 'blackjack-guide';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('calculator');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen>
        <LoadingText>Dealing Cards...</LoadingText>
      </LoadingScreen>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Card Master</Title>
        <Subtitle>Master the odds, play with confidence</Subtitle>
      </Header>

      <Nav>
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
      </Nav>

      {activePage === 'calculator' ? (
        <ProbabilityCalculator />
      ) : activePage === 'blackjack' ? (
        <Blackjack />
      ) : activePage === 'blackjack-guide' ? (
        <BlackjackGuide />
      ) : (
        <PokerGuide />
      )}

      <Signature>Sai Rohith Tanuku</Signature>
    </Container>
  );
}
