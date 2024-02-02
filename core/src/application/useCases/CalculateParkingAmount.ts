import { Period } from '../../domain/entities';
import {
  AdditionalHourRule,
  FirstHourRule,
  FreeRule,
} from '../../domain/entities/priceRules';

type CalculateParkingAmountInput = {
  startTime: Date;
  endTime?: Date;
};

type CalculateParkingAmountOutput = {
  amount: number;
  elapsedTimeInMinutes: number;
};

export class CalculateParkingAmount {
  execute(
    input: CalculateParkingAmountInput
  ): Promise<CalculateParkingAmountOutput> {
    const elapsedTimeInMinutes = Period.between(
      input.startTime,
      input.endTime || new Date()
    ).elapsedTimeInMinutes;

    const additionalHourRule = new AdditionalHourRule();
    const firstHourRule = new FirstHourRule(additionalHourRule);
    const rulePriceChain = new FreeRule(firstHourRule);

    return Promise.resolve({
      amount: rulePriceChain.getPrice(elapsedTimeInMinutes),
      elapsedTimeInMinutes: elapsedTimeInMinutes,
    });
  }
}
