export abstract class PriceRule {
  protected nextPriceRule: PriceRule | null;
  constructor(nextPriceRule: PriceRule | null = null) {
    this.nextPriceRule = nextPriceRule;
  }

  abstract getPrice(elapsedTimeInMinutes: number): number;
}
