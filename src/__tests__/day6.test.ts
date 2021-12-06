import { lanterFishSchool, LanterFish } from '../day6-bruteApproach';
import { LFGroup } from '../day6-cleaner';

test('loading good from input', () => {
  const example: lanterFishSchool = new lanterFishSchool('../inputs/mockedDay6');
  expect(example.getCurrent()).toBe(5);
});

test('passDay logic in LanterFish works', () => {
  const lanterFish1 = new LanterFish();
  expect(lanterFish1.passDay()).toStrictEqual(undefined);
  expect(lanterFish1.getTimer()).toBe(7);

  const lanterFish2 = new LanterFish(0);
  expect(lanterFish2.getTimer()).toBe(0);
  expect(lanterFish2.passDay()).toStrictEqual(new LanterFish());
  expect(lanterFish2.getTimer()).toBe(6);
});

test('passDays logic in LanterFishSchool works', () => {
  const example: lanterFishSchool = new lanterFishSchool('../inputs/mockedDay6');
  expect(example.getCurrent()).toBe(5);

  example.passDays(18);
  expect(example.getCurrent()).toBe(26);
});

test('Both approachs working the same', () => {
  const brute: lanterFishSchool = new lanterFishSchool('../inputs/mockedDay6');
  const clear: LFGroup = new LFGroup('../inputs/mockedDay6');
  brute.passDays(18);
  const bruteRes = brute.getCurrent();
  const clearRes = clear.getFishCountPastDays(18);
  expect(bruteRes).toBe(clearRes);
});
