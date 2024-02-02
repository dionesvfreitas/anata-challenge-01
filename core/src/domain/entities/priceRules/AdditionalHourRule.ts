import { PriceRule } from './PriceRule';

const ONE_HOUR_IN_MINUTES = 60;
const PRICE_PER_HOUR = 3;

export class AdditionalHourRule extends PriceRule {
  getPrice(elapsedTimeInMinutes: number): number {
    return (
      Math.ceil(elapsedTimeInMinutes / ONE_HOUR_IN_MINUTES) * PRICE_PER_HOUR
    );
  }
}
