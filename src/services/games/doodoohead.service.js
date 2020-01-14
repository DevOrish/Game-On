function createCards() {
    var cards = []
    var num = 2;
    var suits = ['spade', 'heart', 'club', 'diamond']
    var count = 1

    for (let i = 0; i < 52; i++) {
        cards.push({ num, suits: suits[count - 1] })
        if (count === 4) {
            count = 0
            num++
        }
        count++
    }
    cards.unshift({ num: 1, suit: 'joker' }, { num: 1, suit: 'joker' })
    return cards
}