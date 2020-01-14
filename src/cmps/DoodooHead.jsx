import React from 'react';
import { connect } from 'react-redux';
import doodooService from '../services/games/doodoohead.service'
import utilsService from '../services/utils.service'

class DoodooHead extends React.Component {
    state = {
        cards: null,
        players: {
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
    }

    cards = 1

    async componentDidMount() {
        this.state.cards = doodooService.createCards()
        
        const cards = this.state.cards
        console.log(cards);
        // for (let i = 0; i < 6; i++) {
        //     const currCard = utilsService.getRandomIntInclusive(0, cards.length - 1)
        //     this.setState(prevState=>players:{...prevState.players})

        // }
    }

    render() {
        return (
            <>
                <h1>DoodooHead</h1>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = {
}

export default connect(

)(DoodooHead)