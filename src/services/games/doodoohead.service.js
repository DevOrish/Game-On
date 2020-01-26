function createCards() {
    var cards = []
    var num = 2;
    var suits = ['spade', 'heart', 'club', 'diamond']
    var count = 1
    for (let i = 0; i < 52; i++) {
        cards.push({
            _id: `${num}${suits[count - 1].charAt(0)}`,
            num,
            suit: suits[count - 1],
            isShown: true,
            isSelected: false,
        })
        if (count === 4) {
            count = 0
            num++
        }
        count++
    }
    count = 1
    while (count < 3) {
        cards.unshift(
            {
                num: 1,
                suit: 'joker',
                isShown: true,
                isSelected: false,
                _id: `j${count}`
            })
        count++;
    }
    return cards
}

export default {
    createCards
}