import { useState } from 'react'
import styled from '@emotion/styled'
import { Card, Suit, Value } from './Card'
import type { CardData } from '../utils/deck'
import { createDeck, calculateProbability } from '../utils/deck'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Description = styled.p`
  color: #a0a0a0;
  font-size: 1.1rem;
`

const CardSelection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  justify-content: center;
`

const SelectedCardsSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  margin: 1rem 0;
`

const SectionTitle = styled.h3`
  color: #4ecdc4;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`

const Result = styled.div<{ probability: number }>`
  font-size: 1.4rem;
  padding: 1.5rem;
  background: ${props => {
    const prob = props.probability;
    if (prob > 0.1) return 'rgba(46, 213, 115, 0.1)';
    if (prob > 0.01) return 'rgba(255, 171, 0, 0.1)';
    return 'rgba(255, 71, 87, 0.1)';
  }};
  border-radius: 12px;
  text-align: center;
  margin: 1rem 0;
  border: 1px solid ${props => {
    const prob = props.probability;
    if (prob > 0.1) return 'rgba(46, 213, 115, 0.3)';
    if (prob > 0.01) return 'rgba(255, 171, 0, 0.3)';
    return 'rgba(255, 71, 87, 0.3)';
  }};
`

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #4ecdc4;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;

  &:hover {
    background: #45b7af;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

const PresetButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0;
  justify-content: center;
`

const PresetButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  padding: 0.6rem 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  color: #4ecdc4;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  color: #a0a0a0;
  font-size: 0.9rem;
`

export const ProbabilityCalculator = () => {
  const [selectedCards, setSelectedCards] = useState<CardData[]>([])
  const [probability, setProbability] = useState<number | null>(null)
  const deck = createDeck()

  const handleCardClick = (card: CardData) => {
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

  const clearSelection = () => {
    setSelectedCards([])
    setProbability(null)
  }

  const selectRoyalFlush = () => {
    const royalFlush = deck.filter(card => 
      card.suit === 'spades' && 
      ['A', 'K', 'Q', 'J', '10'].includes(card.value)
    )
    setSelectedCards(royalFlush)
  }

  const selectFullHouse = () => {
    const threeOfAKind = deck.filter(card => card.value === 'A').slice(0, 3)
    const pair = deck.filter(card => card.value === 'K').slice(0, 2)
    setSelectedCards([...threeOfAKind, ...pair])
  }

  const selectFlush = () => {
    const flush = deck.filter(card => card.suit === 'hearts').slice(0, 5)
    setSelectedCards(flush)
  }

  const selectStraight = () => {
    const straight = deck.filter(card => 
      ['A', 'K', 'Q', 'J', '10'].includes(card.value)
    ).slice(0, 5)
    setSelectedCards(straight)
  }

  return (
    <Container>
      <Header>
        <Title>Card Probability Calculator</Title>
        <Description>
          Select cards to calculate the probability of drawing them in sequence from a fresh deck.
          Try the preset examples below to see common poker hand probabilities!
        </Description>
      </Header>

      <PresetButtons>
        <PresetButton onClick={selectRoyalFlush}>Royal Flush</PresetButton>
        <PresetButton onClick={selectFullHouse}>Full House</PresetButton>
        <PresetButton onClick={selectFlush}>Flush</PresetButton>
        <PresetButton onClick={selectStraight}>Straight</PresetButton>
        <PresetButton onClick={clearSelection}>Clear Selection</PresetButton>
      </PresetButtons>

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

      <SelectedCardsSection>
        <SectionTitle>Selected Cards ({selectedCards.length})</SectionTitle>
        <CardSelection>
          {selectedCards.map((card, index) => (
            <Card
              key={`selected-${card.suit}-${card.value}-${index}`}
              suit={card.suit}
              value={card.value}
            />
          ))}
        </CardSelection>
      </SelectedCardsSection>

      <Stats>
        <StatCard>
          <StatValue>{selectedCards.length}</StatValue>
          <StatLabel>Cards Selected</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{52 - selectedCards.length}</StatValue>
          <StatLabel>Cards Remaining</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>
            {selectedCards.length > 0 
              ? ((selectedCards.length / 52) * 100).toFixed(1)
              : '0'}%
          </StatValue>
          <StatLabel>Deck Coverage</StatLabel>
        </StatCard>
      </Stats>

      <Button onClick={calculate}>Calculate Probability</Button>

      {probability !== null && (
        <Result probability={probability}>
          <div>Probability of drawing these cards:</div>
          <div style={{ fontSize: '2rem', marginTop: '0.5rem' }}>
            {(probability * 100).toFixed(8)}%
          </div>
          <div style={{ fontSize: '1rem', marginTop: '0.5rem', color: '#a0a0a0' }}>
            1 in {Math.round(1 / probability).toLocaleString()} chance
          </div>
        </Result>
      )}
    </Container>
  )
} 