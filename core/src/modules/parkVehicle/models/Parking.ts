import {Vehicle} from "./Vehicle";

export class Parking {
  private _vehicle: Vehicle;
  private startDate: Date;
  private endDate: Date;

  public getVehicle(): Vehicle {
    return this._vehicle;
  }

  public setVehicle(vehicle: Vehicle): Parking {
    this._vehicle = vehicle;
    return this;
  }

  public executeCheckIn(): void {
    this._vehicle.setParked(true);
    this.startDate = new Date();
  }

  public executeCheckOut(): void {
    this._vehicle.setParked(false);
    this.endDate = new Date();
  }

  public getElapsedTime(): number {
    if (!this.startDate || !this.endDate) {
      return 0;
    }

    return this.endDate.getTime() - this.startDate.getTime();
  }
}
