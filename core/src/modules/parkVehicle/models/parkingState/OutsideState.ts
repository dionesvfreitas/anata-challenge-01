import {Vehicle} from "../Vehicle";
import {ParkingState} from "./ParkingState";
import {InsideState} from "./InsideState";

export class OutsideState extends ParkingState {
  goInside(vehicle: Vehicle): void {
    vehicle.setParkingState(new InsideState());
  }
}
