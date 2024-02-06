import {
  ParkingLotRepository,
  RepositoryFactory,
} from '../../domain/repositories';
import { VehicleIsNotParkedException } from '../../domain/exceptions';

export class RegisterParkingExit {
  private readonly parkingLotRepository: ParkingLotRepository;
  constructor(repositoryFactory: RepositoryFactory) {
    this.parkingLotRepository = repositoryFactory.getParkingLotRepository();
  }

  async execute(plate: string): Promise<void> {
    const parkedVehicle =
      await this.parkingLotRepository.getParkedVehicleByPlate(plate);

    if (!parkedVehicle) {
      throw new VehicleIsNotParkedException(plate);
    }

    parkedVehicle.exitDate = new Date();
    await this.parkingLotRepository.updateParkedVehicle(parkedVehicle);
  }
}
