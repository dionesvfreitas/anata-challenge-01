import {Parking, Vehicle} from "../models";
import {ParkingRepository} from "../repository";
import {VehicleAlreadyParkedException, VehicleNotParkedException} from "../exceptions";

export class ParkingService {
  constructor(private readonly parkingRepository: ParkingRepository) {}

  public checkIn(plate: string): Parking {
    let parkingFound: Parking = this.findByPlate(plate);

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

  public checkOut(plate: string): Parking {
    let parkingFound: Parking = this.findByPlate(plate);
    if (!parkingFound) {
      throw new VehicleNotParkedException(plate);
    }

    parkingFound.executeCheckOut();
    this.parkingRepository.save(parkingFound);

    return parkingFound;
  }
}
