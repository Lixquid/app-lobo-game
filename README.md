<h1><a href="https://lobo-game.lixquid.com">Lobo Game</a></h1>

An online implementation of the solitaire game Lobo, designed by James Ernest.

https://lobo-game.lixquid.com

## How to Use

Hit start to start with the default game settings.

Attempt to clear the wolf's hand by matching cards from the player's hand to the
wolf's hand. You score the sum of your hand if you clear the wolf's hand,
otherwise you score the sum of the wolf's hand.

The kinds of plays you can make are:

- **Perfect**: Match a card from your hand to an identical card in the wolf's
  hand; gain a card from the deck.
- **Sum**: Match multiple cards from your hand to a single card in the wolf's
  hand that is the sum of your cards; gain a card from the deck.
- **Split**: Match a card from your hand to multiple cards in the wolf's hand
  that sum to your card; the wolf gains a card from the deck.
- **Over**: Match a card from your hand to a single card in the wolf's hand that
  is smaller than your card; the wolf gains a number of cards from the deck
  equal to the difference between your card and the wolf's card.
- **Fold**: Give up; the wolf scores the sum of its hand.

Select or deselect cards in your hand and the wolf's hand by clicking on them.
If a valid play is available, a button with the name of the play will
appear. Click the button to make the play.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/)

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run start`
4. Open http://localhost:8080 in your browser

Changes to the source files will be automatically reloaded in the browser.

### Building for Production

1. Remove the `dist` folder:
    - \*nix: `rm -rf dist`
    - Windows: `rmdir /s /q dist`
2. Build the project: `npm run build`
3. The production files will be in the `dist` folder

Production files can be served from any static file server.
