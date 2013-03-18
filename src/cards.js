/**
 * Created with JetBrains WebStorm.
 * User: xadhix@gmail.com
 * Date: 2/24/13
 * Time: 7:57 PM
 * To change this template use File | Settings | File Templates.
 */

var Cards = {
}
var Game = {}

function Deck(withJoker) {
    this.cards = ["H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "HX", "HJ", "HQ", "HK", "HA", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "CX", "CJ", "CQ", "CK", "CA", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "SX", "SJ", "SQ", "SK", "SA", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "DX", "DJ", "DQ", "DK", "DA"];
    if (withJoker === true) {
        this.cards.push("J1");
        this.cards.push("J2");
    }

    this.shuffle = function () {
        for (var i = 0; i < this.cards.length; i++) {
            var rand = Math.round(Math.random() * (this.cards.length - i - 1) + i);
            var a = this.cards[i];
            this.cards[i] = this.cards[rand];
            this.cards[rand] = a;
        }
        return this;
    }
    return this;
}

function Player(idx, id) {
    this.id = (id) ? id : "Player";
    this.idx = idx;
    this.cardsState = new Array(Game.numberOfPlayers);
    this.setState = function setState(owncards) {
        for (var i = 0; i < this.cardsState.length; i++) {
            this.cardsState[i] = {};
        }
        var deckOfCards = Game.deck.cards;
        for (var i = 0; i < deckOfCards.length; i++) {
            var self, others;
            if (owncards.indexOf(deckOfCards[i]) >= 0) {
                self = 1;
                others = -1;
            }
            else {
                self = -1;
                others = 0;
            }
            for (var j = 0; j < this.cardsState.length; j++) {
                this.cardsState[j][deckOfCards[i]] = (this.idx == j) ? self : others;
            }
        }
        return this;
    }

    this.cards = function cards() {
        var hasThese = [];
        for (var card in this.cardsState[this.idx]) {
            if (this.cardsState[this.idx][card] == 1) {
                hasThese.push(card);
            }
        }
        return hasThese;
    }
    return this;
}

Game.deck = new Deck();
Game.numberOfPlayers = 4;
Game.setNumberOfPlayers = function setNumberOfPlayers(n) {
    Game.numberOfPlayers = n;
    return this;
}

Game.deal = function deal(config) {
    var n = Game.numberOfPlayers;
    var startingFrom = 0;
    //TODO : Accomodate config.
    if (!config) {
        config = {};
    }
    if (config["shuffle"] === true) {
        Game.deck.shuffle();
    }
    if (config["n"] && typeof(config["n"]) == "number" && config["n"] > 0) {
        n = config["n"];
    }
    if (config["startingFrom"] !== "undefined" && typeof(config["startingFrom"]) == "number" && config["startingFrom"] >= 0 && config["startingFrom"] < n) {
        startingFrom = config["startingFrom"];
    }
    var cards = new Array();
    for (var i = 0; i < n; i++) {
        cards.push(new Array());
    }

    for (var i = 0; i < Game.deck.cards.length; i++) {
        cards[startingFrom].push(Game.deck.cards[i]);
        startingFrom = (startingFrom + 1) % n;
    }
    return cards;
}

Game.init = function init() {
    var dealtCards = Game.deal({"shuffle":true});
    var players = [];
    for (var i = 0; i < this.numberOfPlayers; i++) {
        players.push((new Player(i, "Player" + (i + 1))).setState(dealtCards[i]));
    }
    Game.players = players;
    return this;
}