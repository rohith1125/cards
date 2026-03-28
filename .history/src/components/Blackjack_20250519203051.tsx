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

const Hand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const HandTitle = styled.h3`
  color: #4ecdc4;
  margin: 0;
  font-size: 1.3rem;
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

export const Blackjack = () => {
  const [deck, setDeck] = useState<CardData[]>([])
  const [playerHand, setPlayerHand] = useState<CardData[]>([])
  const [dealerHand, setDealerHand] = useState<CardData[]>([])
  const [gameState, setGameState] = useState<'playing' | 'dealer-turn' | 'ended'>('playing')
  const [message, setMessage] = useState<{ text: string; type: 'win' | 'lose' | 'draw' | null }>({ text: '', type: null })

  const startNewGame = () => {
    const newDeck = shuffleDeck(createDeck())
    setDeck(newDeck)
    setPlayerHand([newDeck[0], newDeck[2]])
    setDealerHand([newDeck[1], newDeck[3]])
    setDeck(newDeck.slice(4))
    setGameState('playing')
    setMessage({ text: '', type: null })
  }

  const hit = () => {
    if (gameState !== 'playing') return

    const newPlayerHand = [...playerHand, deck[0]]
    setPlayerHand(newPlayerHand)
    setDeck(deck.slice(1))

    const score = calculateScore(newPlayerHand)
    if (score > 21) {
      setGameState('ended')
      setMessage({ text: 'Bust! Dealer wins.', type: 'lose' })
    }
  }

  const stand = () => {
    if (gameState !== 'playing') return
    setGameState('dealer-turn')
    dealerPlay()
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
    determineWinner(newDealerHand)
  }

  const determineWinner = (finalDealerHand: CardData[]) => {
    const playerScore = calculateScore(playerHand)
    const dealerScore = calculateScore(finalDealerHand)

    if (dealerScore > 21) {
      setMessage({ text: 'Dealer busts! You win!', type: 'win' })
    } else if (playerScore > dealerScore) {
      setMessage({ text: 'You win!', type: 'win' })
    } else if (playerScore < dealerScore) {
      setMessage({ text: 'Dealer wins!', type: 'lose' })
    } else {
      setMessage({ text: 'Push! It\'s a tie.', type: 'draw' })
    }

    setGameState('ended')
  }

  useEffect(() => {
    startNewGame()
  }, [])

  return (
    <Container>
      <GameArea>
        <Hand>
          <HandTitle>Dealer's Hand</HandTitle>
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

        <Hand>
          <HandTitle>Your Hand</HandTitle>
          <Cards>
            {playerHand.map((card, index) => (
              <Card
                key={`player-${card.suit}-${card.value}-${index}`}
                suit={card.suit}
                value={card.value}
              />
            ))}
          </Cards>
          <Score>Score: {calculateScore(playerHand)}</Score>
        </Hand>

        {message.text && (
          <Message type={message.type}>
            {message.text}
          </Message>
        )}

        <Controls>
          <Button
            onClick={hit}
            disabled={gameState !== 'playing'}
          >
            Hit
          </Button>
          <Button
            onClick={stand}
            disabled={gameState !== 'playing'}
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