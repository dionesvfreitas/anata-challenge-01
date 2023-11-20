import {OutsideState, ParkingState} from "./parkingState";

export class Vehicle {
  private plate: string;
  private _parkingState: ParkingState = new OutsideState();

  public getPlate(): string {
    return this.plate;
  }

  public setPlate(plate: string): Vehicle {
    this.plate = plate;
    return this;
  }

  public getParkingState(): ParkingState {
    return this._parkingState;
  }

  public setParkingState(parkingState: ParkingState): Vehicle {
    this._parkingState = parkingState;
    return this;
  }
}
