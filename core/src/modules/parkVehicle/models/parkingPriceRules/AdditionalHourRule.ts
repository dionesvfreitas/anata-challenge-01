import {ParkingPriceRule} from "./ParkingPriceRule";

export class AdditionalHourRule extends ParkingPriceRule {
  static readonly HOUR_VALUE: number = 3;

  getAmountToPay(elapsedTimeInMinutes: number): number {
    const oneHourInMinutes: number = 60;
    const hourValue: number = AdditionalHourRule.HOUR_VALUE;
    return hourValue * Math.ceil(elapsedTimeInMinutes / oneHourInMinutes);
  }

}
