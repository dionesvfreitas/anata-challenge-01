import { PriceRule } from './PriceRule';

export class FirstHourRule extends PriceRule {
  getPrice(elapsedTimeInMinutes: number): number {
    let price = 5;
    elapsedTimeInMinutes -= 60;

    if (this.nextPriceRule && elapsedTimeInMinutes > 0) {
      price += this.nextPriceRule.getPrice(elapsedTimeInMinutes);
    }

    return price;
  }
}
