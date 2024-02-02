import { ParkedVehicle } from '../entities';

export interface ParkingLotRepository {
  getParkedVehicles(): Promise<ParkedVehicle[]>;
  getParkedVehicleByPlate(plate: string): Promise<ParkedVehicle>;
  createParkedVehicle(parkedVehicle: ParkedVehicle): Promise<void>;
  updateParkedVehicle(parkedVehicle: ParkedVehicle): Promise<void>;
  deleteParkedVehicle(parkedVehicle: ParkedVehicle): Promise<void>;
}
