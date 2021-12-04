import { readFileSync } from 'fs';
import { join } from 'path';

export default function main() {
  const game: BingoGame = new BingoGame('../inputs/day4Input');
  const WiningPoints = game.getWinningPuntuation();
  const LosingPoints = game.getLastWinningPuntuation();
  console.log(`Day 4 - I = ${WiningPoints}`);
  console.log(`Day 4 - II = ${LosingPoints}`);
}

export class BingoGame {
  public readonly secuence: Array<number> = new Array<number>();
  public cards: Array<BingoCard> = new Array<BingoCard>();

  constructor(path: string) {
    this.LoadGame(path);
  }

  private LoadGame(path: string) {
    const buffer: Buffer = readFileSync(join(__dirname, path));

    const FileLines: string[] = buffer.toString().split('\n');

    const secuenceString: string | undefined = FileLines.shift();
    if (!secuenceString) return;
    this.SetUpSecuenceFromString(secuenceString);

    const numbersBuffer: string[] = FileLines.filter((string) => string != '');
    const cardsStrings: string[][] = this.splitNumberBuffer(numbersBuffer);

    this.setUpCardsFromStrings(cardsStrings);
    //this.SetUpCards(FileLines)
  }

  private SetUpSecuenceFromString(secuenceString: string): void {
    const stringArray: string[] = secuenceString.split(',');
    stringArray.map((numberString) => {
      this.secuence.push(parseInt(numberString));
    });
  }

  private splitNumberBuffer(numbersBuffer: string[]): string[][] {
    const cardsStrings: string[][] = new Array<Array<string>>();
    const cardsSize = 5;
    let indexInCard = 0;
    let cardIndex = 0;
    numbersBuffer.forEach((numberString) => {
      if (indexInCard == 0) cardsStrings.push(new Array<string>());
      cardsStrings[cardIndex].push(numberString);
      if (indexInCard < cardsSize - 1) indexInCard++;
      else {
        indexInCard = 0;
        cardIndex++;
      }
    });

    return cardsStrings;
  }

  private setUpCardsFromStrings(CardsStrings: string[][]): void {
    CardsStrings.forEach((StringArray) => {
      const bingoCard: Array<Array<BingoNumber>> = this.SetUpBingoCard(StringArray);
      this.cards.push(new BingoCard(bingoCard));
    });
  }

  private SetUpBingoCard(StringArray: string[]): Array<Array<BingoNumber>> {
    const response: Array<Array<BingoNumber>> = new Array<Array<BingoNumber>>();

    StringArray.forEach((String) => {
      const stringRow: string[] = String.split(' ').filter((string) => string != '');
      const row: Array<BingoNumber> = new Array<BingoNumber>();
      stringRow.forEach((stringNumber) => {
        row.push(new BingoNumber(parseInt(stringNumber)));
      });
      response.push(row);
    });
    return response;
  }

  public getWinningPuntuation() {
    const result: Result = this.play();
    if (result.WinnerIndex != -1) return this.cards[result.WinnerIndex].SumUnchecked() * result.LastNumber;
    return -1;
  }

  private play(): Result {
    const result: Result = { WinnerIndex: -1, LastNumber: -1 };

    for (let it = 0; it < this.secuence.length; it++) {
      const winner = this.playTheNumber(this.secuence[it]);

      if (winner != undefined) {
        return winner;
      }
    }
    return result;
  }

  private playTheNumber(number: number): Result | undefined {
    for (let it = 0; it < this.cards.length; it++) {
      if (!this.cards[it].hasWinned() && this.cards[it].CheckNumber(number)) {
        if (this.cards[it].HasFinished()) {
          return { WinnerIndex: it, LastNumber: number };
        }
      }
    }
    return undefined;
  }

  public getLastWinningPuntuation() {
    const result: Result = this.playTillLastWin();
    if (result.WinnerIndex != -1) return this.cards[result.WinnerIndex].SumUnchecked() * result.LastNumber;
    return -1;
  }

  private playTheNumberButGetLast(number: number): Result | undefined {
    let result: Result | undefined;
    for (let it = 0; it < this.cards.length; it++) {
      if (!this.cards[it].hasWinned() && this.cards[it].CheckNumber(number)) {
        if (this.cards[it].HasFinished()) {
          result = { WinnerIndex: it, LastNumber: number };
        }
      }
    }
    return result;
  }

  private playTillLastWin(): Result {
    let result: Result = { WinnerIndex: -1, LastNumber: -1 };

    for (let it = 0; it < this.secuence.length; it++) {
      const winner = this.playTheNumberButGetLast(this.secuence[it]);

      if (winner != undefined) {
        result = winner;
      }
    }
    return result;
  }
}

export interface Result {
  WinnerIndex: number;
  LastNumber: number;
}

export class BingoNumber {
  public readonly value: number;
  private checked?: boolean;

  constructor(value: number) {
    this.value = value;
  }

  public isChecked(): boolean {
    return this.checked ? true : false;
  }
  public Check(): void {
    this.checked = true;
  }
}

export interface Position {
  Row: number;
  Col: number;
}

export class BingoCard {
  public Card: Array<Array<BingoNumber>> = new Array<Array<BingoNumber>>(); // [Row][Col]
  private Winned = false;

  constructor(Card: Array<Array<BingoNumber>>) {
    this.Card = Card;
  }

  public hasWinned(): boolean {
    return this.Winned;
  }
  /**
   * Checking a number
   * @param number
   * @returns True if founded & checked
   */

  public CheckNumber(number: number): boolean {
    const pos: Position | undefined = this.FindNumber(number);
    if (!pos) return false;
    this.Card[pos.Row][pos.Col].Check();
    this.Winned = this.HasFinished();
    return true;
  }

  private FindNumber(number: number): Position | undefined {
    for (let row = 0; row < this.Card.length; row++) {
      const col = this.FindNumberInRow(number, row);
      if (col != -1) {
        return { Row: row, Col: col };
      }
    }
    return;
  }

  private FindNumberInRow(number: number, row: number): number {
    for (let col = 0; col < this.Card.length; col++) {
      if (this.Card[row][col].value == number) return col;
    }
    return -1;
  }

  /**
   * Check if the player has finished
   * @returns true if finished
   */

  public HasFinished(): boolean {
    if (this.HasColCompleted() || this.HasRowCompleted()) return true;
    return false;
  }

  private HasColCompleted(): boolean {
    for (let col = 0; col < this.Card.length; col++) {
      let flag = false;
      for (let row = 0; row < this.Card.length && !flag; row++) {
        if (!this.Card[row][col].isChecked()) flag = true;
      }
      if (!flag) return true;
    }
    return false;
  }

  private HasRowCompleted(): boolean {
    for (let row = 0; row < this.Card.length; row++) {
      let flag = false;
      for (let col = 0; col < this.Card.length && !flag; col++) {
        if (!this.Card[row][col].isChecked()) flag = true;
      }
      if (!flag) return true;
    }
    return false;
  }

  /**
   * Get Sumatory of te unChecked numbers, for calculating the winning points
   * @returns the sum
   */
  public SumUnchecked(): number {
    let sum = 0;
    for (let row = 0; row < this.Card.length; row++) {
      for (let col = 0; col < this.Card.length; col++) {
        if (!this.Card[row][col].isChecked()) sum += this.Card[row][col].value;
      }
    }
    return sum;
  }
}
