import { ParkingLotRepository } from '../../domain/repositories';
import { ParkedVehicle } from '../../domain/entities';

export class InMemoryParkingLotRepository implements ParkingLotRepository {
  private readonly parkedVehicles: ParkedVehicle[];

  constructor() {
    this.parkedVehicles = [];
  }

  async getParkedVehicleByPlate(plate: string): Promise<ParkedVehicle> {
    const vehicleIndex = this.getVehicleIndexByPlate(plate);
    if (vehicleIndex === -1 || this.parkedVehicles[vehicleIndex].exitDate) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(this.parkedVehicles[vehicleIndex]);
  }

  getParkedVehicles(): Promise<ParkedVehicle[]> {
    return Promise.resolve(
      this.parkedVehicles.filter((vehicle) => !vehicle.exitDate)
    );
  }

  createParkedVehicle(parkedVehicle: ParkedVehicle): Promise<void> {
    this.parkedVehicles.push(parkedVehicle);
    return Promise.resolve(undefined);
  }

  deleteParkedVehicle(parkedVehicle: ParkedVehicle): Promise<void> {
    const index = this.getVehicleIndexByPlate(parkedVehicle.plate);
    this.parkedVehicles.splice(index, 1);
    return Promise.resolve(undefined);
  }

  updateParkedVehicle(parkedVehicle: ParkedVehicle): Promise<void> {
    const index = this.getVehicleIndexByPlate(parkedVehicle.plate);
    Object.assign(this.parkedVehicles[index], parkedVehicle);
    return Promise.resolve(undefined);
  }

  private getVehicleIndexByPlate(plate: string): number {
    return this.parkedVehicles.findIndex((vehicle) => vehicle.plate === plate);
  }
}
