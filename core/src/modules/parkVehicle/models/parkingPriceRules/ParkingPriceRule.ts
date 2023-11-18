export abstract class ParkingPriceRule {
  protected nextRule: ParkingPriceRule|null = null;
  abstract getAmountToPay(elapsedTimeInMinutes: number): number;
  public setNextRule(rule: ParkingPriceRule): void {
    this.nextRule = rule;;
  }
}
