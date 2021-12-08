import { readFileSync } from 'fs';
import { join } from 'path';

export default function main() {
  const display: Display = new Display('../inputs/day8Input');
  console.log(`Day 8 - I = ${display.firstpluzzle()}`);
  console.log(`Day 8 - II = ${display.getSumOutputs()}`);
}

/**
 *      aa aa
 *     b     c
 *     b     c
 *      dd dd
 *     e     f
 *     e     f
 *      gg gg
 */

/**
 * Original signal pattern is
 * 0 uses       a,b,c,e,f,g     6 segments
 * 1 uses only  c,f             2 segments
 * 2 uses       a,c,d,e,g       5 segments
 * 3 uses       a,c,d,f,g       5 segments
 * 4 uses only  b,c,d,f         4 segments
 * 5 uses       a,b,d,f,g       5 segments
 * 6 uses       a,b,d,e,f,g     6 segments
 * 7 uses only  a,c,f           3 segments
 * 8 uses all   a,b,c,d,e,f,g   7 segments
 * 9 uses       a,b,c,d,f,g     6 segments
 * Easiest numbers to recognize are 1,4,7,8 because they use a unique number of segments
 */

export class Entry {
  public signal_patterns: Array<string>; // these are 10    => 1 for each digit from 0 to 9
  public decoded_signals: Array<string>; // these are the same signals as above but sorted from 0 to 9
  public digit_output: Array<string>; // these are 4        => the 4digit number we are looking for

  constructor(InputLine: string) {
    const separedInput = InputLine.split(' | ');
    this.signal_patterns = separedInput[0].split(' ');
    this.digit_output = separedInput[1].split(' ');
    this.decoded_signals = this.decode();
  }
  public searchSpeficiedNumberOfSegmentsInOutput(howMuch: number): number {
    let thisMuch = 0;
    this.digit_output.forEach((output) => {
      if (output.length == howMuch) thisMuch++;
    });
    return thisMuch;
  }

  public getOututToNumber(): number {
    let outputNumber = 0;
    this.digit_output.forEach((signal, index) => {
      const decodedSignal = this.decoded_signals.find((sig) => this.isTheSameSignal(signal, sig));
      const number = this.decoded_signals.findIndex((signal) => signal == decodedSignal);
      const base = 10 ** (this.digit_output.length - 1 - index);
      outputNumber += number * base;
    });
    return outputNumber;
  }

  /**
   * 1 has 2 segments
   * 7 has 3 segments
   * 4 has 4 segments
   * 2,3,5 has 5 segments
   * 0,6,9 has 6 segments
   * 8 has 7 segments
   */

  private decode(): Array<string> {
    const decoded_signals: Array<string> = ['', '', '', '', '', '', '', '', '', ''];
    let fivedigits: Array<string> = new Array<string>(),
      sixdigits: Array<string> = new Array<string>();
    //get uniques and separe fivedigits from sixdigits
    this.signal_patterns.forEach((pattern) => {
      if (pattern.length == 2) {
        decoded_signals[1] = pattern;
        return;
      }
      if (pattern.length == 3) {
        decoded_signals[7] = pattern;
        return;
      }
      if (pattern.length == 4) {
        decoded_signals[4] = pattern;
        return;
      }
      if (pattern.length == 7) {
        decoded_signals[8] = pattern;
        return;
      }
      if (pattern.length == 5) {
        fivedigits.push(pattern);
        return;
      }
      sixdigits.push(pattern);
    });

    /*
     * Between 5 segments' signals, a, d, and g are shared
     * 4 has only d shared with 5 segments' signals
     * 0 dont has d
     * 9 and 6 has d
     * so 0 is the only 7segments' signal without d
     * and d is the only shared segment between 5 segments' signals and 4 signal
     */
    fivedigits.push(decoded_signals[4]);
    decoded_signals[0] = this.whoDontHasThisSegment(sixdigits, this.segmentInCommon(fivedigits));

    sixdigits = sixdigits.filter((signal) => signal != decoded_signals[0]);

    /**
     * 9 uses       a,b,c,d,f,g     6 segments
     * 6 uses       a,b,d,e,f,g     6 segments
     *
     * Diference on c and e
     * 9 uses c and f but 6 only uses f
     * 1 uses c and f
     *
     */
    decoded_signals[6] = sixdigits.find((candidate) => this.hasOnly1InCommon(candidate, decoded_signals[1])) || '';
    decoded_signals[9] = sixdigits.find((signal) => signal != decoded_signals[6]) || '';

    /**
     * 2 uses       a,c,d,e,g       5 segments
     * 3 uses       a,c,d,f,g       5 segments
     * 5 uses       a,b,d,f,g       5 segments
     * 5 has only 1 not in common with 6
     */
    decoded_signals[5] = fivedigits.find((candidate) => this.hasOnly1NotInCommon(candidate, decoded_signals[6])) || '';
    fivedigits = fivedigits.filter((signal) => signal != decoded_signals[5]);

    /**
     * Now only 2 has 1 in common with 1
     */
    decoded_signals[2] = fivedigits.find((candidate) => this.hasOnly1InCommon(candidate, decoded_signals[1])) || '';
    decoded_signals[3] = fivedigits.find((signal) => signal != decoded_signals[2]) || '';
    return decoded_signals;
  }

  private segmentInCommon(signals: Array<string>): string {
    let shared: Array<string> = new Array<string>();
    signals.map((signal, index) => {
      const segments = signal.split('');
      if (index == 0) {
        shared = segments;
        return;
      }
      shared = shared.filter((seg) => segments.find((s) => s == seg) != undefined);
    });
    return shared[0];
  }

  private hasOnly1InCommon(candidate: string, signal: string): boolean {
    const segments = candidate.split('');
    const signalsegments = signal.split('');

    if (segments.filter((seg) => signalsegments.find((s) => s == seg)).length == 1) return true;
    return false;
  }

  private hasOnly1NotInCommon(candidate: string, signal: string): boolean {
    const segments = candidate.split('');
    const signalsegments = signal.split('');
    const expectedLength = (segments.length > signalsegments.length ? segments.length : signalsegments.length) - 1;

    if (segments.filter((seg) => signalsegments.find((s) => s == seg)).length == expectedLength) return true;
    return false;
  }

  private whoDontHasThisSegment(signals: Array<string>, segment: string): string {
    let response = '';
    signals.forEach((signal) => {
      if (this.hasThisSegment(signal, segment)) return;
      response = signal;
    });

    return response;
  }

  private hasThisSegment(signal: string, segment: string): boolean {
    const segments = signal.split('');
    if (segments.find((s) => s == segment) != undefined) return true;
    return false;
  }

  public isTheSameSignal(signal: string, signalToCompare: string): boolean {
    const segments = signal.split('');
    const segmentsToCompare = signalToCompare.split('');
    if (segments.length != segmentsToCompare.length) return false;
    let response = true;

    segments.forEach((segment) => {
      if (segmentsToCompare.find((seg) => seg == segment) == undefined) response = false;
    });

    return response;
  }
}

export class Display {
  public entry_array: Array<Entry> = new Array<Entry>();

  constructor(path: string) {
    this.entry_array = this.readInput(path);
  }
  private readInput(path: string): Array<Entry> {
    const buffer = readFileSync(join(__dirname, path));
    const lines = buffer.toString().split('\n');
    const entry_input = new Array<Entry>();
    lines.forEach((line) => {
      entry_input.push(new Entry(line));
    });
    return entry_input;
  }
  public searchForSpecifiedNumberOfSegments(howMuch: number): number {
    let thisMuch = 0;
    this.entry_array.forEach((entry) => {
      thisMuch += entry.searchSpeficiedNumberOfSegmentsInOutput(howMuch);
    });
    return thisMuch;
  }
  public firstpluzzle(): number {
    let thisMuch = 0;

    thisMuch += this.searchForSpecifiedNumberOfSegments(2);
    thisMuch += this.searchForSpecifiedNumberOfSegments(3);
    thisMuch += this.searchForSpecifiedNumberOfSegments(4);
    thisMuch += this.searchForSpecifiedNumberOfSegments(7);

    return thisMuch;
  }
  public getSumOutputs(): number {
    return this.entry_array
      .map((entry) => {
        return entry.getOututToNumber();
      })
      .reduce((previous, current) => previous + current);
  }
}
