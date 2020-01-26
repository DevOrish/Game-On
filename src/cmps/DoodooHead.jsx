import React from 'react';
import { connect } from 'react-redux';
import doodooService from '../services/games/doodoohead.service'
import utilsService from '../services/utils.service'

class DoodooHead extends React.Component {
    state = {
        cards: null,
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
        },
    }
    isMultipleCards = false
    board = [];
    last4Cards = [];
    currPlayer = null;
    magicCards = [1, 2, 3, 10]
    isPlayButton = false

    async componentDidMount() {
        await this.setState({ cards: doodooService.createCards() })
        await this.drawStartingHands()
        const firstPlayer = utilsService.getRandomIntInclusive(1, 2)
        this.currPlayer = 'p' + firstPlayer;
        console.log(this.state, this.currPlayer);
    }

    drawCard = (player, cardDest = 'inHand') => {
        const cards = this.state.cards
        const currCardIdx = utilsService.getRandomIntInclusive(0, cards.length - 1)
        const card = cards.splice(currCardIdx, 1)

        if (cardDest === 'onTable') card[0].isShown = false
        let newHand = JSON.parse(JSON.stringify(this.state[player][cardDest]))
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
        if (currPlayer.onTable.length === 6) return this.playCard(currPlayer, currCardIdx)
        const card = handCards.splice(currCardIdx, 1)
        const tableCards = currPlayer.onTable
        tableCards.push(card[0])
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

    playCard = (currPlayer, currCardIdx) => {
        if (this.state.p1.onTable.length < 6 || this.state.p2.onTable.length < 6) return
        let isEruped = false
        const handCards = currPlayer.inHand
        let card = handCards.slice(currCardIdx, currCardIdx + 1)
        if (this.board.length === 0 && card[0].num === 4) {
            this.currPlayer = currPlayer._id;
            isEruped = true;
        }
        if (!isEruped && currPlayer._id === this.currPlayer) return
        if (!isEruped && card[0].num !== 1) {
            const isCardValid = this.checkCard(card[0])
            if (!isCardValid) {
                console.log('Card Not Valid');
                return
            }
        }
        const sameCardsIdxs = this.findDuplicates(handCards, card[0])
        if (sameCardsIdxs.length > 1) {
            this.isPlayButton = true
            this.isMultipleCards = true
            return
        } else if (!sameCardsIdxs.length) return

        card = handCards.splice(currCardIdx, 1)

        switch (card[0].num) {
            case 10:
                this.board = [];
                break;
            case 8:
                this.board.unshift(card[0]);
                break;
            case 1:
                let player = (this.state[this.currPlayer]._id === 'p1') ? this.state['p1'] : this.state['p2']
                this.pickUpCards(player, 'joker')
                this.currPlayer = currPlayer._id;
                break;
            default:
                this.board.unshift(card[0]);
                this.currPlayer = currPlayer._id;
                break;
        }
        const isSame4 = this.checkLast4();
        console.log(isSame4);

        if (this.state.cards.length > 0 && handCards.length < 3) this.drawCard(currPlayer._id);
        else this.setUpdatedHand(currPlayer._id, handCards)
    }

    checkCard = (card) => {
        let currCardOnBoard = this.board[0]
        if (currCardOnBoard && currCardOnBoard.num === 3) {
            currCardOnBoard = this.board[1]
            if (currCardOnBoard && currCardOnBoard.num === 3) currCardOnBoard = this.board[2]
        }
        if (!currCardOnBoard) return true;
        switch (currCardOnBoard.num) {
            case 7:
                if (card.num <= 7) return true;
                else return false;
            case 12:
                if (card.num >= 12 || card.num === 1) return true;
                else return false;
            case 2:
                if (card.suit === currCardOnBoard.suit || card.num === 2) return true;
                else return false;
            default:
                break;
        }
        const isMagicCard = this.isMagic(card.num)
        if (isMagicCard || currCardOnBoard.num <= card.num) return true;
        else return false;
    }
    checkLast4 = () => {
        const board = this.board;
        if (board.length > 3 && board[0].num === board[1].num === board[2].num === board[3].num) return true
        else return false
    }

    findDuplicates = (hand, card) => {
        let sameCardIdx = [];
        if (card.isSelected || this.isMultipleCards) {
            card.isSelected = !card.isSelected // CHANGE IT WITH SETSTATE
            return []
        }
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].num === card.num) {
                hand[i].isSelected = true
                sameCardIdx.push(i)
            }
        }
        return sameCardIdx;
    }
    isMagic = (card) => {
        return this.magicCards.includes(card)
    }

    setUpdatedHand = (player, playerHand) => {
        this.setState(prevState => (
            {
                ...prevState,
                [player]: {
                    ...prevState[player],
                    inHand: playerHand
                }
            }
        ))
    }

    renderCards = (player, cardDest = 'inHand') => {
        return player[cardDest].map(card => {
            if (cardDest === 'onTable') return <button key={card._id} disabled>{card.num + card.suit}</button>
            return <button className={(card.isSelected ? " selectedCard " : "")} onClick={() => this.moveCardsToTable(card._id, player._id)} key={card._id}>{card.num + card.suit}</button>
        })
    }
    renderBoardCards = () => {
        if (this.board.length > 0) return this.board.map(card => {
            return <button key={card._id} disabled>{card.num + card.suit}</button>
        })
    }
    pickUpCards = (currPlayer, cause = 'noCards') => {
        let handCards = currPlayer.inHand;
        let boardCards = this.board;
        const newHand = handCards.concat(boardCards)
        newHand.concat(handCards)
        this.setState(prevState => (
            {
                ...prevState,
                [currPlayer._id]: {
                    ...prevState[currPlayer._id],
                    inHand: newHand
                }
            }
        ))
        this.board = [];
        if (cause === 'noCards') this.currPlayer = (this.state[this.currPlayer]._id === 'p1') ? 'p2' : 'p1';

    }
    renderPickupBtn = () => {
        if (this.currPlayer) {
            const currPlayer = (this.state[this.currPlayer]._id === 'p1') ? this.state['p2'] : this.state['p1']
            const hasValidCard = currPlayer.inHand.some(card => this.checkCard(card))
            console.log(hasValidCard);

            if (hasValidCard) return <button disabled>Use Your Cards</button>
            else return <button onClick={() => this.pickUpCards(currPlayer)} >PICKUP</button>
        } else return <button disabled>no cards yet</button>

    }

    isCardSelect = true
    render() {
        const p1 = this.state.p1
        const p2 = this.state.p2
        return (
            <>
                <h1 className='header'>DoodooHead</h1>
                <main className='game flex col'>
                    {this.isPlayButton && <button> Play Cards</button>}
                    <section className='p1'>
                        p1
                        <div className='hiddenCards'>
                            {this.renderCards(p1, 'onTable')}
                        </div>
                        {this.renderCards(p1)}
                    </section>
                    <section className='board'>
                        {/* {this.state.cardSelectorCount > 0 && <h3>Pick {this.state.cardSelectorCount} cards to put on the table</h3>} */}
                        <div className='cardBank'>{this.renderBoardCards()}</div>
                        <div className='pickup-btn'>{this.renderPickupBtn()}</div>

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