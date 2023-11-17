import {Parking, Vehicle} from "../models";
import {ParkingRepository} from "../repository";
import {VehicleAlreadyParkedException} from "../exceptions";

export class ParkingService {
  constructor(private readonly parkingRepository: ParkingRepository) {}

  public checkIn(plate: string): Parking {
    let parkingFound: Parking = this.parkingRepository.findByPlate(plate);
    if (parkingFound && parkingFound.getVehicle().isParked()) {
      throw new VehicleAlreadyParkedException(plate);
    }

    if (parkingFound === null) {
      const vehicle: Vehicle = new Vehicle();
      vehicle.setPlate(plate);

      parkingFound = new Parking();
      parkingFound.setVehicle(vehicle);
    }

    parkingFound.executeCheckIn();
    this.parkingRepository.save(parkingFound);

    return parkingFound;
  }

  public findByPlate(plate: string): Parking|null {
    return this.parkingRepository.findByPlate(plate);
  }
}
