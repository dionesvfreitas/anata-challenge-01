import {Vehicle} from "../Vehicle";
import {VehicleAlreadyParkedException, VehicleNotParkedException} from "../../exceptions";

export abstract class ParkingState {
  goInside(vehicle: Vehicle): void {
    throw new VehicleAlreadyParkedException(vehicle.getPlate())
  }

  goOutside(vehicle: Vehicle): void {
    throw new VehicleNotParkedException(vehicle.getPlate());
  }
}
