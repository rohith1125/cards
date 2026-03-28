import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Card } from './Card'
import { createDeck, dealCards, calculateHandValue, isBlackjack, type CardData } from '../utils/deck'

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

const PlayerStatus = styled.span<{ status: 'playing' | 'stand' | 'bust' | 'win' | 'lose' | 'draw' | 'blackjack' }>`
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
      case 'blackjack': return 'rgba(46, 213, 115, 0.2)';
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
      case 'blackjack': return '#2ed573';
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
  status: 'playing' | 'stand' | 'bust' | 'win' | 'lose' | 'draw' | 'blackjack'
  isComputer: boolean
  bet: number
}

const getStatusText = (status: Player['status']): string => {
  switch (status) {
    case 'playing': return 'Playing';
    case 'stand': return 'Stand';
    case 'bust': return 'Bust!';
    case 'win': return 'Win!';
    case 'lose': return 'Lose';
    case 'draw': return 'Push';
    case 'blackjack': return 'Blackjack!';
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
    const newDeck = createDeck()
    const { hands, remainingDeck } = dealCards(newDeck, 4, 2) // 3 players + dealer
    
    // Initialize players
    const initialPlayers: Player[] = [
      { name: 'You', hand: hands[0], status: 'playing', isComputer: false, bet: 10 },
      { name: 'Computer 1', hand: hands[1], status: 'playing', isComputer: true, bet: 10 },
      { name: 'Computer 2', hand: hands[2], status: 'playing', isComputer: true, bet: 10 }
    ]
    
    // Check for initial blackjacks
    initialPlayers.forEach(player => {
      if (isBlackjack(player.hand)) {
        player.status = 'blackjack'
      }
    })
    
    setPlayers(initialPlayers)
    setDealerHand(hands[3])
    setDeck(remainingDeck)
    setGameState('playing')
    setMessage({ text: '', type: null })
    setCurrentPlayerIndex(0)
  }

  const hit = () => {
    if (gameState !== 'playing' || currentPlayerIndex !== 0) return

    const newPlayers = [...players]
    const newDeck = [...deck]
    
    // Draw a card
    const newCard = newDeck.shift()
    if (!newCard) return
    
    newPlayers[0].hand = [...newPlayers[0].hand, newCard]
    setDeck(newDeck)

    // Check for bust or blackjack
    const score = calculateHandValue(newPlayers[0].hand)
    if (score > 21) {
      newPlayers[0].status = 'bust'
      setPlayers(newPlayers)
      setCurrentPlayerIndex(1)
      playComputerTurns()
    } else if (score === 21) {
      newPlayers[0].status = 'stand'
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

      // Improved AI strategy
      const score = calculateHandValue(player.hand)
      if (score <= 16) {
        const newCard = newDeck.shift()
        if (!newCard) return
        
        player.hand = [...player.hand, newCard]
        const newScore = calculateHandValue(player.hand)
        
        if (newScore > 21) {
          player.status = 'bust'
        } else if (newScore === 21) {
          player.status = 'stand'
        }
      } else {
        player.status = 'stand'
      }

      setPlayers(newPlayers)
      setDeck(newDeck)
      currentIndex++
      setTimeout(playNextComputer, 1000)
    }

    playNextComputer()
  }

  const dealerPlay = () => {
    let newDealerHand = [...dealerHand]
    let newDeck = [...deck]

    // Dealer must hit on soft 17
    while (calculateHandValue(newDealerHand) < 17) {
      const newCard = newDeck.shift()
      if (!newCard) break
      
      newDealerHand.push(newCard)
    }

    setDealerHand(newDealerHand)
    setDeck(newDeck)
    determineWinners(newDealerHand)
  }

  const determineWinners = (finalDealerHand: CardData[]) => {
    const dealerScore = calculateHandValue(finalDealerHand)
    const dealerHasBlackjack = isBlackjack(finalDealerHand)
    const newPlayers = [...players]

    newPlayers.forEach(player => {
      if (player.status === 'bust') {
        player.status = 'lose'
      } else if (player.status === 'blackjack') {
        if (dealerHasBlackjack) {
          player.status = 'draw'
        } else {
          player.status = 'win'
        }
      } else {
        const playerScore = calculateHandValue(player.hand)
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
            Score: {gameState === 'playing' ? '?' : calculateHandValue(dealerHand)}
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
                <Score>Score: {calculateHandValue(player.hand)}</Score>
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