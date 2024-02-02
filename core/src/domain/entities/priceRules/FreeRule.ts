import { PriceRule } from './PriceRule';

export class FreeRule extends PriceRule {
  getPrice(elapsedTimeInMinutes: number): number {
    if (elapsedTimeInMinutes <= 15) {
      return 0;
    }

    if (this.nextPriceRule) {
      return this.nextPriceRule.getPrice(elapsedTimeInMinutes);
    }

    return 0;
  }
}
