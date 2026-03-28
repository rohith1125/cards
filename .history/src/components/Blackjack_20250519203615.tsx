import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Card from './Card'
import { createDeck, shuffleDeck, type CardData } from '../utils/deck'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
`

const PlayersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
`

const PlayerArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
`

const Hand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const HandTitle = styled.h3`
  color: #4ecdc4;
  margin: 0;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const PlayerStatus = styled.span<{ status: 'playing' | 'stand' | 'bust' | 'win' | 'lose' | 'draw' }>`
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  background: ${props => {
    switch (props.status) {
      case 'playing': return 'rgba(46, 213, 115, 0.1)';
      case 'stand': return 'rgba(255, 171, 0, 0.1)';
      case 'bust': return 'rgba(255, 71, 87, 0.1)';
      case 'win': return 'rgba(46, 213, 115, 0.2)';
      case 'lose': return 'rgba(255, 71, 87, 0.2)';
      case 'draw': return 'rgba(255, 171, 0, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'playing': return '#2ed573';
      case 'stand': return '#ffa502';
      case 'bust': return '#ff4757';
      case 'win': return '#2ed573';
      case 'lose': return '#ff4757';
      case 'draw': return '#ffa502';
    }
  }};
`

const Cards = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const Score = styled.div`
  font-size: 1.2rem;
  color: #a0a0a0;
`

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  background: #4ecdc4;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #45b7af;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
  }
`

const Message = styled.div<{ type: 'win' | 'lose' | 'draw' | null }>`
  text-align: center;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background: ${props => {
    switch (props.type) {
      case 'win': return 'rgba(46, 213, 115, 0.1)';
      case 'lose': return 'rgba(255, 71, 87, 0.1)';
      case 'draw': return 'rgba(255, 171, 0, 0.1)';
      default: return 'transparent';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'win': return '#2ed573';
      case 'lose': return '#ff4757';
      case 'draw': return '#ffa502';
      default: return 'white';
    }
  }};
`

interface Player {
  name: string
  hand: CardData[]
  status: 'playing' | 'stand' | 'bust' | 'win' | 'lose' | 'draw'
  isComputer: boolean
}

const calculateScore = (cards: CardData[]): number => {
  let score = 0
  let aces = 0

  cards.forEach(card => {
    if (card.value === 'A') {
      aces++
      score += 11
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      score += 10
    } else {
      score += parseInt(card.value)
    }
  })

  while (score > 21 && aces > 0) {
    score -= 10
    aces--
  }

  return score
}

const getStatusText = (status: Player['status']): string => {
  switch (status) {
    case 'playing': return 'Playing';
    case 'stand': return 'Stand';
    case 'bust': return 'Bust!';
    case 'win': return 'Win!';
    case 'lose': return 'Lose';
    case 'draw': return 'Push';
  }
}

export const Blackjack = () => {
  const [deck, setDeck] = useState<CardData[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [dealerHand, setDealerHand] = useState<CardData[]>([])
  const [gameState, setGameState] = useState<'playing' | 'dealer-turn' | 'ended'>('playing')
  const [message, setMessage] = useState<{ text: string; type: 'win' | 'lose' | 'draw' | null }>({ text: '', type: null })
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

  const startNewGame = () => {
    const newDeck = shuffleDeck(createDeck())
    setDeck(newDeck)
    
    // Initialize players
    const initialPlayers: Player[] = [
      { name: 'You', hand: [newDeck[0], newDeck[3]], status: 'playing', isComputer: false },
      { name: 'Computer 1', hand: [newDeck[1], newDeck[4]], status: 'playing', isComputer: true },
      { name: 'Computer 2', hand: [newDeck[2], newDeck[5]], status: 'playing', isComputer: true }
    ]
    
    setPlayers(initialPlayers)
    setDealerHand([newDeck[6], newDeck[7]])
    setDeck(newDeck.slice(8))
    setGameState('playing')
    setMessage({ text: '', type: null })
    setCurrentPlayerIndex(0)
  }

  const hit = () => {
    if (gameState !== 'playing' || currentPlayerIndex !== 0) return

    const newPlayers = [...players]
    newPlayers[0].hand = [...newPlayers[0].hand, deck[0]]
    setDeck(deck.slice(1))

    const score = calculateScore(newPlayers[0].hand)
    if (score > 21) {
      newPlayers[0].status = 'bust'
      setPlayers(newPlayers)
      setCurrentPlayerIndex(1)
      playComputerTurns()
    } else {
      setPlayers(newPlayers)
    }
  }

  const stand = () => {
    if (gameState !== 'playing' || currentPlayerIndex !== 0) return

    const newPlayers = [...players]
    newPlayers[0].status = 'stand'
    setPlayers(newPlayers)
    setCurrentPlayerIndex(1)
    playComputerTurns()
  }

  const playComputerTurns = () => {
    let newPlayers = [...players]
    let newDeck = [...deck]
    let currentIndex = currentPlayerIndex

    const playNextComputer = () => {
      if (currentIndex >= players.length) {
        setGameState('dealer-turn')
        dealerPlay()
        return
      }

      const player = newPlayers[currentIndex]
      if (!player.isComputer || player.status !== 'playing') {
        currentIndex++
        playNextComputer()
        return
      }

      // Simple AI: hit on 16 or below, stand on 17 or above
      const score = calculateScore(player.hand)
      if (score <= 16) {
        player.hand = [...player.hand, newDeck[0]]
        newDeck = newDeck.slice(1)
        
        const newScore = calculateScore(player.hand)
        if (newScore > 21) {
          player.status = 'bust'
        }
      } else {
        player.status = 'stand'
      }

      setPlayers(newPlayers)
      setDeck(newDeck)
      currentIndex++
      setTimeout(playNextComputer, 1000) // Add delay for better visualization
    }

    playNextComputer()
  }

  const dealerPlay = () => {
    let newDealerHand = [...dealerHand]
    let newDeck = [...deck]

    while (calculateScore(newDealerHand) < 17) {
      newDealerHand.push(newDeck[0])
      newDeck = newDeck.slice(1)
    }

    setDealerHand(newDealerHand)
    setDeck(newDeck)
    determineWinners(newDealerHand)
  }

  const determineWinners = (finalDealerHand: CardData[]) => {
    const dealerScore = calculateScore(finalDealerHand)
    const newPlayers = [...players]

    newPlayers.forEach(player => {
      if (player.status === 'bust') {
        player.status = 'lose'
      } else {
        const playerScore = calculateScore(player.hand)
        if (dealerScore > 21) {
          player.status = 'win'
        } else if (playerScore > dealerScore) {
          player.status = 'win'
        } else if (playerScore < dealerScore) {
          player.status = 'lose'
        } else {
          player.status = 'draw'
        }
      }
    })

    setPlayers(newPlayers)
    setGameState('ended')
  }

  useEffect(() => {
    startNewGame()
  }, [])

  return (
    <Container>
      <GameArea>
        <Hand>
          <HandTitle>
            Dealer's Hand
            {gameState !== 'playing' && (
              <PlayerStatus status={gameState === 'ended' ? 'stand' : 'playing'}>
                {gameState === 'ended' ? 'Stand' : 'Playing'}
              </PlayerStatus>
            )}
          </HandTitle>
          <Cards>
            {dealerHand.map((card, index) => (
              <Card
                key={`dealer-${card.suit}-${card.value}-${index}`}
                suit={card.suit}
                value={card.value}
                hidden={index === 1 && gameState === 'playing'}
              />
            ))}
          </Cards>
          <Score>
            Score: {gameState === 'playing' ? '?' : calculateScore(dealerHand)}
          </Score>
        </Hand>

        <PlayersGrid>
          {players.map((player, index) => (
            <PlayerArea key={player.name}>
              <Hand>
                <HandTitle>
                  {player.name}
                  <PlayerStatus status={player.status}>
                    {getStatusText(player.status)}
                  </PlayerStatus>
                </HandTitle>
                <Cards>
                  {player.hand.map((card, cardIndex) => (
                    <Card
                      key={`${player.name}-${card.suit}-${card.value}-${cardIndex}`}
                      suit={card.suit}
                      value={card.value}
                    />
                  ))}
                </Cards>
                <Score>Score: {calculateScore(player.hand)}</Score>
              </Hand>
            </PlayerArea>
          ))}
        </PlayersGrid>

        <Controls>
          <Button
            onClick={hit}
            disabled={gameState !== 'playing' || currentPlayerIndex !== 0}
          >
            Hit
          </Button>
          <Button
            onClick={stand}
            disabled={gameState !== 'playing' || currentPlayerIndex !== 0}
          >
            Stand
          </Button>
          <Button
            onClick={startNewGame}
            disabled={gameState === 'playing'}
          >
            New Game
          </Button>
        </Controls>
      </GameArea>
    </Container>
  )
} 