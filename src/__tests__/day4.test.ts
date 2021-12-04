import { BingoGame } from '../day4';

test('Loading function', () => {
  const game: BingoGame = new BingoGame('../inputs/day4Input');
  expect(game.secuence.length).toBeGreaterThan(0);
  expect(game.secuence[2]).toBe(74);
  expect(game.cards.length).toBeGreaterThan(0);
  expect(game.cards[game.cards.length - 1].CheckNumber(83)).toBe(true);
});
