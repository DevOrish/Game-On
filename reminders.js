var card = {
    num: 1,
    suit: 'spade'
}

var suits = ['spade', 'heart', 'club', 'diamond']

var gCards = []
function createCards() {
    var cards = []
    var num = 2;
    var suits = ['spade', 'heart', 'club', 'diamond']
    var count = 0

    for (let i = 0; i < 52; i++) {
        cards.push({ num, suits: suits[count] })
        if (count === 3) {
            count = 0
            num++
        }
        count++
    }
    console.log(cards);
    
    return cards
}

// var moveCardsToTable = async (cardId, playerId) => {
//     if(this.state.cardSelectorCount===0)return this.playCard(cardId, playerId)
//     this.state.cardSelectorCount --
//     // this.setState({ cardSelectCount: this.state.cardSelectorCount -- })        
//     const currPlayer = this.state[playerId]
//     const currCardIdx = currPlayer.inHand.findIndex(card => card._id === cardId)
//     const handCards = currPlayer.inHand
//     const card = handCards.splice(currCardIdx, 1)
//     const tableCards = currPlayer.onTable
//     tableCards.push(card[0])
//     this.setState({ cards: handCards })
//     this.setState(prevState => (
//         {
//             ...prevState,
//             [currPlayer]: {
//                 ...prevState[currPlayer],
//                 inHand: handCards,
//                 onTable: tableCards
//             }
//         }
//     ))
// }