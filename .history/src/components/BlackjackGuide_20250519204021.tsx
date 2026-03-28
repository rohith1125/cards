import styled from '@emotion/styled'
import Card from './Card'
import { type Suit, type Value } from './Card'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Title = styled.h2`
  color: #4ecdc4;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
`

const Section = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
`

const SectionTitle = styled.h3`
  color: #4ecdc4;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Description = styled.p`
  color: #a0a0a0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`

const CardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`

const HandLabel = styled.div`
  color: #4ecdc4;
  font-size: 1.1rem;
  min-width: 100px;
`

const Tips = styled.div`
  background: rgba(78, 205, 196, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
`

const TipTitle = styled.h4`
  color: #4ecdc4;
  margin-bottom: 0.5rem;
`

const TipList = styled.ul`
  color: #a0a0a0;
  margin: 0;
  padding-left: 1.5rem;
`

const StrategyTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  color: #a0a0a0;
`

const TableHeader = styled.th`
  background: rgba(78, 205, 196, 0.1);
  padding: 0.75rem;
  text-align: left;
  color: #4ecdc4;
`

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #4ecdc4;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;

  &:hover {
    background: #45b7af;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

interface Scenario {
  title: string
  description: string
  playerCards: Array<{ suit: Suit; value: Value }>
  dealerCard: { suit: Suit; value: Value }
  recommendedAction: string
  explanation: string
}

const scenarios: Scenario[] = [
  {
    title: 'Soft 18 vs Dealer 9',
    description: 'You have an Ace and a 7, giving you a soft 18. The dealer shows a 9.',
    playerCards: [
      { suit: 'hearts', value: 'A' },
      { suit: 'diamonds', value: '7' }
    ],
    dealerCard: { suit: 'spades', value: '9' },
    recommendedAction: 'Hit',
    explanation: 'With a soft 18 against dealer 9, you should hit because the dealer has a strong upcard and you can\'t bust with a soft hand.'
  },
  {
    title: 'Hard 16 vs Dealer 7',
    description: 'You have a 10 and a 6, giving you a hard 16. The dealer shows a 7.',
    playerCards: [
      { suit: 'hearts', value: '10' },
      { suit: 'diamonds', value: '6' }
    ],
    dealerCard: { suit: 'spades', value: '7' },
    recommendedAction: 'Stand',
    explanation: 'With a hard 16 against dealer 7, you should stand because the dealer has a high bust probability.'
  },
  {
    title: 'Pair of 8s vs Dealer 10',
    description: 'You have a pair of 8s. The dealer shows a 10.',
    playerCards: [
      { suit: 'hearts', value: '8' },
      { suit: 'diamonds', value: '8' }
    ],
    dealerCard: { suit: 'spades', value: '10' },
    recommendedAction: 'Split',
    explanation: 'Always split 8s, even against a dealer 10. A pair of 8s is a weak hand, but splitting gives you two chances to improve.'
  }
]

const basicStrategy = [
  { playerHand: 'Hard 20', dealer2: 'Stand', dealer3: 'Stand', dealer4: 'Stand', dealer5: 'Stand', dealer6: 'Stand', dealer7: 'Stand', dealer8: 'Stand', dealer9: 'Stand', dealer10: 'Stand', dealerA: 'Stand' },
  { playerHand: 'Hard 19', dealer2: 'Stand', dealer3: 'Stand', dealer4: 'Stand', dealer5: 'Stand', dealer6: 'Stand', dealer7: 'Stand', dealer8: 'Stand', dealer9: 'Stand', dealer10: 'Stand', dealerA: 'Stand' },
  { playerHand: 'Hard 18', dealer2: 'Stand', dealer3: 'Stand', dealer4: 'Stand', dealer5: 'Stand', dealer6: 'Stand', dealer7: 'Stand', dealer8: 'Stand', dealer9: 'Stand', dealer10: 'Stand', dealerA: 'Stand' },
  { playerHand: 'Hard 17', dealer2: 'Stand', dealer3: 'Stand', dealer4: 'Stand', dealer5: 'Stand', dealer6: 'Stand', dealer7: 'Stand', dealer8: 'Stand', dealer9: 'Stand', dealer10: 'Stand', dealerA: 'Stand' },
  { playerHand: 'Hard 16', dealer2: 'Stand', dealer3: 'Stand', dealer4: 'Stand', dealer5: 'Stand', dealer6: 'Stand', dealer7: 'Hit', dealer8: 'Hit', dealer9: 'Hit', dealer10: 'Hit', dealerA: 'Hit' },
  { playerHand: 'Hard 15', dealer2: 'Stand', dealer3: 'Stand', dealer4: 'Stand', dealer5: 'Stand', dealer6: 'Stand', dealer7: 'Hit', dealer8: 'Hit', dealer9: 'Hit', dealer10: 'Hit', dealerA: 'Hit' },
  { playerHand: 'Hard 13-14', dealer2: 'Stand', dealer3: 'Stand', dealer4: 'Stand', dealer5: 'Stand', dealer6: 'Stand', dealer7: 'Hit', dealer8: 'Hit', dealer9: 'Hit', dealer10: 'Hit', dealerA: 'Hit' },
  { playerHand: 'Hard 12', dealer2: 'Hit', dealer3: 'Hit', dealer4: 'Stand', dealer5: 'Stand', dealer6: 'Stand', dealer7: 'Hit', dealer8: 'Hit', dealer9: 'Hit', dealer10: 'Hit', dealerA: 'Hit' },
  { playerHand: 'Hard 11', dealer2: 'Double', dealer3: 'Double', dealer4: 'Double', dealer5: 'Double', dealer6: 'Double', dealer7: 'Double', dealer8: 'Double', dealer9: 'Double', dealer10: 'Double', dealerA: 'Hit' },
  { playerHand: 'Hard 10', dealer2: 'Double', dealer3: 'Double', dealer4: 'Double', dealer5: 'Double', dealer6: 'Double', dealer7: 'Double', dealer8: 'Double', dealer9: 'Double', dealer10: 'Hit', dealerA: 'Hit' },
  { playerHand: 'Hard 9', dealer2: 'Hit', dealer3: 'Double', dealer4: 'Double', dealer5: 'Double', dealer6: 'Double', dealer7: 'Hit', dealer8: 'Hit', dealer9: 'Hit', dealer10: 'Hit', dealerA: 'Hit' },
  { playerHand: 'Hard 8 or less', dealer2: 'Hit', dealer3: 'Hit', dealer4: 'Hit', dealer5: 'Hit', dealer6: 'Hit', dealer7: 'Hit', dealer8: 'Hit', dealer9: 'Hit', dealer10: 'Hit', dealerA: 'Hit' }
]

export const BlackjackGuide = () => {
  return (
    <Container>
      <Title>Blackjack Strategy Guide</Title>

      <Section>
        <SectionTitle>Basic Rules</SectionTitle>
        <Description>
          Blackjack is a card game where the goal is to get a hand value closer to 21 than the dealer's hand, without going over 21. 
          Number cards are worth their face value, face cards (J, Q, K) are worth 10, and Aces can be worth 1 or 11.
        </Description>
        <Tips>
          <TipTitle>Key Rules:</TipTitle>
          <TipList>
            <li>Dealer must hit on 16 and stand on 17</li>
            <li>Blackjack (Ace + 10-value card) pays 3:2</li>
            <li>You can double down on any two cards</li>
            <li>You can split pairs into two separate hands</li>
            <li>Insurance is offered when dealer shows an Ace</li>
          </TipList>
        </Tips>
      </Section>

      <Section>
        <SectionTitle>Common Scenarios</SectionTitle>
        {scenarios.map((scenario, index) => (
          <div key={index}>
            <SectionTitle>{scenario.title}</SectionTitle>
            <Description>{scenario.description}</Description>
            <CardsContainer>
              <HandLabel>Your Hand:</HandLabel>
              {scenario.playerCards.map((card, cardIndex) => (
                <Card
                  key={`player-${cardIndex}`}
                  suit={card.suit}
                  value={card.value}
                />
              ))}
            </CardsContainer>
            <CardsContainer>
              <HandLabel>Dealer Shows:</HandLabel>
              <Card
                suit={scenario.dealerCard.suit}
                value={scenario.dealerCard.value}
              />
            </CardsContainer>
            <Tips>
              <TipTitle>Recommended Action: {scenario.recommendedAction}</TipTitle>
              <Description>{scenario.explanation}</Description>
            </Tips>
          </div>
        ))}
      </Section>

      <Section>
        <SectionTitle>Basic Strategy</SectionTitle>
        <Description>
          Basic strategy is the mathematically optimal way to play blackjack. 
          It tells you the best action to take for any combination of your hand and the dealer's upcard.
        </Description>
        <StrategyTable>
          <thead>
            <tr>
              <TableHeader>Your Hand</TableHeader>
              <TableHeader>Dealer 2</TableHeader>
              <TableHeader>Dealer 3</TableHeader>
              <TableHeader>Dealer 4</TableHeader>
              <TableHeader>Dealer 5</TableHeader>
              <TableHeader>Dealer 6</TableHeader>
              <TableHeader>Dealer 7</TableHeader>
              <TableHeader>Dealer 8</TableHeader>
              <TableHeader>Dealer 9</TableHeader>
              <TableHeader>Dealer 10</TableHeader>
              <TableHeader>Dealer A</TableHeader>
            </tr>
          </thead>
          <tbody>
            {basicStrategy.map((row, index) => (
              <tr key={index}>
                <TableCell>{row.playerHand}</TableCell>
                <TableCell>{row.dealer2}</TableCell>
                <TableCell>{row.dealer3}</TableCell>
                <TableCell>{row.dealer4}</TableCell>
                <TableCell>{row.dealer5}</TableCell>
                <TableCell>{row.dealer6}</TableCell>
                <TableCell>{row.dealer7}</TableCell>
                <TableCell>{row.dealer8}</TableCell>
                <TableCell>{row.dealer9}</TableCell>
                <TableCell>{row.dealer10}</TableCell>
                <TableCell>{row.dealerA}</TableCell>
              </tr>
            ))}
          </tbody>
        </StrategyTable>
      </Section>

      <Section>
        <SectionTitle>Advanced Tips</SectionTitle>
        <Tips>
          <TipTitle>When to Double Down:</TipTitle>
          <TipList>
            <li>Double down on 11 against dealer 2-10</li>
            <li>Double down on 10 against dealer 2-9</li>
            <li>Double down on 9 against dealer 3-6</li>
            <li>Double down on soft 13-17 against dealer 3-6</li>
          </TipList>
        </Tips>
        <Tips>
          <TipTitle>When to Split:</TipTitle>
          <TipList>
            <li>Always split Aces and 8s</li>
            <li>Never split 5s or 10s</li>
            <li>Split 2s and 3s against dealer 2-7</li>
            <li>Split 4s against dealer 5-6</li>
            <li>Split 6s against dealer 2-6</li>
            <li>Split 7s against dealer 2-7</li>
            <li>Split 9s against dealer 2-9 (except 7)</li>
          </TipList>
        </Tips>
        <Tips>
          <TipTitle>Insurance and Surrender:</TipTitle>
          <TipList>
            <li>Never take insurance (it's a bad bet)</li>
            <li>Surrender hard 15 against dealer 10</li>
            <li>Surrender hard 15 against dealer 9</li>
            <li>Surrender hard 14 against dealer 10</li>
          </TipList>
        </Tips>
      </Section>
    </Container>
  )
} 