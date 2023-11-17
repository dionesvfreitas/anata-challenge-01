import {Parking} from "../models";

export interface ParkingRepository {
  save(parking: Parking): Parking;
  findByPlate(plate: string): Parking|null;
}
