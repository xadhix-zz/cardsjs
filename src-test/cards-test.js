/**
 * Created with JetBrains WebStorm.
 * User: xadhix@gmail.com
 * Date: 2/24/13
 * Time: 8:14 PM
 * To change this template use File | Settings | File Templates.
 */

describe("Check Deck", function () {

    var deck;
    var jokerDeck;

    beforeEach(function () {
        deck = new Deck();
        jokerDeck = new Deck(true);
    });

    it("Check if current number of cards are present", function () {
        expect(deck.cards.length).toBe(52);
        expect(jokerDeck.cards.length).toBe(54);
    });

    //TODO : Check if all cards are present

    it("Check if shuffle is working", function () {
        var beforeString = deck.cards.join("");
        deck.shuffle();
        var deckAfterShuffling = deck.cards.slice(0);

        while (beforeString != "") {
            var card = beforeString[0] + beforeString[1];
            var indexOfCard = deckAfterShuffling.indexOf(card);
            expect(indexOfCard).toBeGreaterThan(-1);
            if (beforeString.length > 1) {
                beforeString = beforeString.substring(2);
                deckAfterShuffling.splice(indexOfCard, 1);
            }
            else {
                return false;
            }
        }
        expect(deckAfterShuffling.join("")).toBe("");
    });

    //TODO : Check Efficiency of Shuffling Algorithm

});

describe("Check Player", function () {
    it("Basic checks", function () {
        var p1 = new Player(0);
        expect(p1.id).toBe("Player");
        expect(p1.cardsState.length).toBe(Game.numberOfPlayers);
        var p2 = new Player(1, "xadhix");
        expect(p2.id).toBe("xadhix");
        expect(p2.cardsState.length).toBe(Game.numberOfPlayers);
    });
});

describe("Check Game", function () {
    it("Check Number Of Players", function () {
        expect(Game.numberOfPlayers).toBe(4);
        var n = 5;
        Game.setNumberOfPlayers(n);
        expect(Game.numberOfPlayers).toBe(n);
        Game.setNumberOfPlayers(4);
    });

    it("Check whether cards are dealt properly", function () {
        function checkDealtCards(dealt, num) {
            if (dealt.length != num) {
                return false;
            }
            var totalNumberOfCards = 0;
            for (var i = 0; i < num; i++) {
                if (!(typeof(dealt[i]) == "object" && typeof(dealt[i].length) == "number")) {
                    return false;
                }
                totalNumberOfCards += dealt[i].length;
            }
            return true;
        }

        var n = 4;
        var dealt1 = Game.deal({"shuffle":true});
        expect(checkDealtCards(dealt1, n)).toBe(true);
        var n = 6;
        var dealt2 = Game.deal({"n":6, "startingFrom":0});
        expect(checkDealtCards(dealt2, n)).toBe(true);
    });
});