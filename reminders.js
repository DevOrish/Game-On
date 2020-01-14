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