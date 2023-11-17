import {ParkingRepository} from "./ParkingRepository";
import {Parking} from "../models";

export class ParkingRepositoryInMemory implements ParkingRepository {
  private parkedVehicles: Parking[] = [];

  public save(parking: Parking): Parking {
    const plate: string = parking.getVehicle().getPlate();
    const index: number = this
      .parkedVehicles
      .findIndex((parkedVehicle: Parking): boolean => parkedVehicle.getVehicle().getPlate() === plate);

    if (index !== -1) {
      this.parkedVehicles[index] = parking;
      return parking;
    }

    this.parkedVehicles.push(parking);
    return parking;
  }

  public findByPlate(plate: string): Parking|null {
    return this
      .parkedVehicles
      .find((parking: Parking): boolean => parking.getVehicle().getPlate() === plate) || null;
  }
}
