import {ParkingPriceRule} from "./ParkingPriceRule";

export class FirstHourRule extends ParkingPriceRule {
  static readonly HOUR_VALUE: number = 5;

  getAmountToPay(elapsedTimeInMinutes: number): number {
    const oneHourInMinutes: number = 60;
    if (elapsedTimeInMinutes <= oneHourInMinutes) {
      return FirstHourRule.HOUR_VALUE;
    }

    return FirstHourRule.HOUR_VALUE + this
      .nextRule
      .getAmountToPay(elapsedTimeInMinutes - oneHourInMinutes);
  }

}
