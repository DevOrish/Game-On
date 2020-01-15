import React from 'react';
import { connect } from 'react-redux';
import doodooService from '../services/games/doodoohead.service'
import utilsService from '../services/utils.service'

class DoodooHead extends React.Component {
    state = {
        cards: null,
        p1: {
            lossCount: 0,
            inHand: [],
            onTable: [],
        },
        p2: {
            lossCount: 0,
            inHand: [],
            onTable: [],
        }

    }

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

    moveCardsToTable = (card) => {
        //WRITE IT HERE EHH
        //just set new state with the chosen cards
    }

    renderCards = (player, cardDest = 'inHand') => {
        return player[cardDest].map(card => {
            if (cardDest === 'onTable') {
                return <button key={card._id} disabled>{card.num + card.suit}</button>
            }
            return <button key={card._id}>{card.num + card.suit}</button>
        })
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