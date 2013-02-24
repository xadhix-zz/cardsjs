/**
 * Created with JetBrains WebStorm.
 * User: xadhix@gmail.com
 * Date: 2/24/13
 * Time: 7:57 PM
 * To change this template use File | Settings | File Templates.
 */

Cards = {};

Cards.deck = new Deck();

function Deck(withJoker) {
    this.cards = ["H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "HJ", "HQ", "HK", "HA", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "CJ", "CQ", "CK", "CA", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "SJ", "SQ", "SK", "SA", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "DJ", "DQ", "DK", "DA"];
    if (withJoker) {
        this.cards.push("J1");
        this.cards.push("J2");
    }
    this.shuffle = function () {
        for (var i = 0; i < this.cards.length; i++) {
            var rand = Math.round(Math.random() * (this.cards.length - i) + i);
            console.log(rand);
            var a = this.cards[i];
            this.cards[i] = this.cards[rand];
            this.cards[rand] = a;
        }
    }
}
