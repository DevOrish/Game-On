import React from 'react';
import { connect } from 'react-redux';
import doodooService from '../services/games/doodoohead.service'
import utilsService from '../services/utils.service'
import { get } from 'http';

class DoodooHead extends React.Component {
    state = {
        cards: null,
        cardSelectorCount: 3,
        p1: {
            _id: 'p1',
            lossCount: 0,
            inHand: [],
            onTable: [],
        },
        p2: {
            _id: 'p2',
            lossCount: 0,
            inHand: [],
            onTable: [],
        }
    }

    board=[];

    async componentDidMount() {
        await this.setState({ cards: doodooService.createCards() })
        await this.drawStartingHands()
        console.log(this.state);
    }

    drawCard = (player, cardDest = 'inHand') => {
        const cards = this.state.cards
        const currCardIdx = utilsService.getRandomIntInclusive(0, cards.length - 1)
        const card = cards.splice(currCardIdx, 1)

        if (cardDest === 'onTable') card[0].isShown = false
        const newHand = JSON.parse(JSON.stringify(this.state[player][cardDest]))
        newHand.push(card[0])
        this.setState({ cards })
        this.setState(prevState => (
            {
                ...prevState,
                [player]: {
                    ...prevState[player],
                    [cardDest]: newHand
                }
            }
        ))
    }

    drawStartingHands = () => {
        for (let i = 0; i < 6; i++) {
            this.drawCard('p1')
            this.drawCard('p2')
        }
        for (let i = 0; i < 3; i++) {
            this.drawCard('p1', 'onTable')
            this.drawCard('p2', 'onTable')
        }
    }

    moveCardsToTable = async (cardId, playerId) => {
        const currPlayer = this.state[playerId]
        const handCards = currPlayer.inHand
        const currCardIdx = currPlayer.inHand.findIndex(card => card._id === cardId)
        const card = handCards.splice(currCardIdx, 1)
        const tableCards = currPlayer.onTable
        if(this.state.cardSelectorCount===0)return this.playCard(card, currPlayer,handCards)
        this.state.cardSelectorCount --
        // this.setState({ cardSelectCount: this.state.cardSelectorCount -- })        
        tableCards.push(card[0])
        this.setState({ cards: handCards })
        this.setState(prevState => (
            {
                ...prevState,
                [currPlayer]: {
                    ...prevState[currPlayer],
                    inHand: handCards,
                    onTable: tableCards
                }
            }
        ))
    }

    playCard=(card, currPlayer, playerHeand)=>{
        this.board.push(card);
        this.setState(prevState => (
            {
                ...prevState,
                [currPlayer]: {
                    ...prevState[currPlayer],
                    inHand: playerHeand
                }
            }
        ))
        // this.drawCard(currPlayer)
        console.log(this.state[currPlayer._id]);
    }

    renderCards = (player, cardDest = 'inHand') => {
        return player[cardDest].map(card => {
            if (cardDest === 'onTable') {
                return <button key={card._id} disabled>{card.num + card.suit}</button>
            }
            return <button onClick={() => this.moveCardsToTable(card._id, player._id)} key={card._id}>{card.num + card.suit}</button>
        })
    }

    isCardSelect = true

    get cardSelectCount() {
        return this.state.cardSelectorCount
    }
    render() {
        const p1 = this.state.p1
        const p2 = this.state.p2
        return (
            <>
                <h1 className='header'>DoodooHead</h1>
                <main className='game flex col'>
                    <section className='p1'>
                        p1
                        <div className='hiddenCards'>
                            {this.renderCards(p1, 'onTable')}
                        </div>
                        {this.renderCards(p1)}
                    </section>
                    <section className='board'>
                        {this.state.cardSelectorCount > 0 && <h3>Pick {this.state.cardSelectorCount} cards to put on the table</h3>}
                        <div className='cardBank'></div>
                    </section>
                    <section className='p2'>
                        p2
                    {this.renderCards(p2)}
                        <div className='hiddenCards'>
                            {this.renderCards(p2, 'onTable')}
                        </div>
                    </section>
                </main>
            </>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//     }
// }

// const mapDispatchToProps = {
// }

export default connect(

)(DoodooHead)