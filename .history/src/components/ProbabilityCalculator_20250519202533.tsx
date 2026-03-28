import { useState } from 'react'
import styled from '@emotion/styled'
import Card from './Card'
import { Card as CardType, createDeck, calculateProbability } from '../utils/deck'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const CardSelection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`

const Result = styled.div`
  font-size: 1.2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-align: center;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: #4ecdc4;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #45b7af;
  }
`

export const ProbabilityCalculator = () => {
  const [selectedCards, setSelectedCards] = useState<CardType[]>([])
  const [probability, setProbability] = useState<number | null>(null)
  const deck = createDeck()

  const handleCardClick = (card: CardType) => {
    if (selectedCards.some(c => c.suit === card.suit && c.value === card.value)) {
      setSelectedCards(selectedCards.filter(c => !(c.suit === card.suit && c.value === card.value)))
    } else {
      setSelectedCards([...selectedCards, card])
    }
  }

  const calculate = () => {
    const prob = calculateProbability(deck, selectedCards)
    setProbability(prob)
  }

  return (
    <Container>
      <h2>Card Probability Calculator</h2>
      <p>Select the cards you want to calculate the probability of drawing:</p>
      
      <CardSelection>
        {deck.map((card, index) => (
          <Card
            key={`${card.suit}-${card.value}-${index}`}
            suit={card.suit}
            value={card.value}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </CardSelection>

      <div>
        <h3>Selected Cards:</h3>
        <CardSelection>
          {selectedCards.map((card, index) => (
            <Card
              key={`selected-${card.suit}-${card.value}-${index}`}
              suit={card.suit}
              value={card.value}
            />
          ))}
        </CardSelection>
      </div>

      <Button onClick={calculate}>Calculate Probability</Button>

      {probability !== null && (
        <Result>
          Probability of drawing these cards: {(probability * 100).toFixed(2)}%
        </Result>
      )}
    </Container>
  )
} 