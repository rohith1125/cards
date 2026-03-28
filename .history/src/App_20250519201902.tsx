import { useState } from 'react'
import styled from '@emotion/styled'

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 2rem;
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
`

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <AppContainer>
      <Header>
        <Title>Card Master</Title>
      </Header>
      <Navigation>
        <NavButton onClick={() => setCurrentPage('home')}>Home</NavButton>
        <NavButton onClick={() => setCurrentPage('probability')}>Probability Calculator</NavButton>
        <NavButton onClick={() => setCurrentPage('games')}>Card Games</NavButton>
        <NavButton onClick={() => setCurrentPage('learn')}>Learn</NavButton>
      </Navigation>
      <Content>
        {currentPage === 'home' && <div>Welcome to Card Master! Choose a section to begin.</div>}
        {currentPage === 'probability' && <div>Probability Calculator Coming Soon</div>}
        {currentPage === 'games' && <div>Card Games Coming Soon</div>}
        {currentPage === 'learn' && <div>Learning Section Coming Soon</div>}
      </Content>
    </AppContainer>
  )
}

export default App
