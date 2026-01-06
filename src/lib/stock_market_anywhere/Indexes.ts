/**
 * @author Witse Panneels, Marc Bresson
 *
 * this file is based on the indexes.js file from Marc Bresson. All functions and classes are rewritten to typescript. Where possible function logic was not touched
 */

export default class Indexes {
  party_index: Index[] = [];
  // party_index = [
  //     [time_start, time_end, is_krach],
  //     [time_start, time_end, is_krach],
  // ]
  refresh_period: number;

  constructor(refresh_period = 60) {
    this.refresh_period = refresh_period;
  }

  load() {}

  toCSV() {}

  is_time_for_next(): boolean {
    return this.time_until_next() < 0;
  }

  time_until_next(ms = false): number {
    const milliseconds_remaining = this.last().time_start.getTime() + this.refresh_period * 1000 - Date.now();
    if (ms) {
      return milliseconds_remaining;
    } else {
      return Math.ceil(milliseconds_remaining / 1000);
    }
  }

  new(set_krach?: boolean) {
    if (this.party_index.length > 0) {
      if (this.ongoing()) {
        this.end();
      }
      if (set_krach === undefined) {
        set_krach = this.last().is_krach;
      }
    }

    this.party_index.push(new Index(new Date(), set_krach as boolean));
  }

  // stop current index
  end() {
    const last_index = this.party_index.length - 1;

    this.party_index[last_index].time_end = new Date();
  }

  // check if current index is still active
  ongoing(): boolean {
    const last_index = this.party_index.length - 1;

    return this.party_index[last_index].time_end === undefined;
  }

  is_krach(): boolean {
    const last_index = this.party_index.length - 1;

    return this.party_index[last_index].is_krach;
  }

  toggle_krach() {
    if (this.is_krach()) {
      this.new(false);
    } else {
      this.new(true);
    }
  }

  last(): Index {
    const last_index = this.party_index.length - 1;
    return this.party_index[last_index];
  }

  last_non_krach_party_index(): Index {
    const i = this.last_non_krach_index();

    return this.party_index[i];
  }

  last_non_krach_index(): number {
    let i = this.party_index.length - 1;

    if (this.ongoing()) {
      i--;
    }

    while (this.party_index[i].is_krach) {
      i--;
    }

    return i;
  }
}

export class Index {
  time_start: Date;
  time_end: Date | undefined;
  is_krach: boolean;

  /**
   *
   * @param s start time
   * @param e end time
   * @param k is crash?
   */
  constructor(s: Date, k: boolean, e?: Date) {
    this.time_start = s;
    this.time_end = e;
    this.is_krach = k;
  }
}
