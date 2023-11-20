import {Vehicle} from "../Vehicle";
import {ParkingState} from "./ParkingState";
import {OutsideState} from "./OutsideState";

export class InsideState extends ParkingState {
  goOutside(vehicle: Vehicle): void {
    vehicle.setParkingState(new OutsideState());
  }
}
