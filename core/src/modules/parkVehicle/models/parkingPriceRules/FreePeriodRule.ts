import {ParkingPriceRule} from "./ParkingPriceRule";

export class FreePeriodRule extends ParkingPriceRule {
  getAmountToPay(elapsedTimeInMinutes: number): number {
    if (elapsedTimeInMinutes <= 15) {
      return 0;
    }

    return this.nextRule.getAmountToPay(elapsedTimeInMinutes);
  }
}
