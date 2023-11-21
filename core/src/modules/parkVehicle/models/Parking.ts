import {Vehicle} from "./Vehicle";
import {DateTime} from "luxon";
import {DateTimeHelper} from "../../../shared/helpers";
import {AdditionalHourRule, FirstHourRule, FreePeriodRule} from "./parkingPriceRules";


export class Parking {
  private _vehicle: Vehicle;
  private startDate: DateTime;
  private endDate: DateTime;

  public getVehicle(): Vehicle {
    return this._vehicle;
  }

  public setVehicle(vehicle: Vehicle): Parking {
    this._vehicle = vehicle;
    return this;
  }

  public executeCheckIn(): void {
    this._vehicle.getParkingState().goInside(this._vehicle);
    this.startDate = DateTimeHelper.now();
  }

  public executeCheckOut(): void {
    this._vehicle.getParkingState().goOutside(this._vehicle)
    this.endDate = DateTimeHelper.now()
  }

  public getTotalElapsedTimeInMinutes(): number {
    if (!this.startDate || !this.endDate) {
      return 0;
    }

    return this.endDate.diff(this.startDate, 'minute').minutes;
  }

  public getTotalValue(): number {
    const totalElapsedTimeInMinutes: number = this.getTotalElapsedTimeInMinutes();
    if (totalElapsedTimeInMinutes <= 0) {
      return 0;
    }

    const additionalHourRule: AdditionalHourRule = new AdditionalHourRule();
    const firstHourRule: FirstHourRule = new FirstHourRule();
    const freePeriodRule: FreePeriodRule = new FreePeriodRule();

    firstHourRule.setNextRule(additionalHourRule);
    freePeriodRule.setNextRule(firstHourRule);

    return freePeriodRule.getAmountToPay(totalElapsedTimeInMinutes);
  }

  public getStartDate(): DateTime {
    return this.startDate;
  }

  public getEndDate(): DateTime {
    return this.endDate;
  }
}
