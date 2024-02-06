import {
  ParkingLotRepository,
  RepositoryFactory,
} from '../../domain/repositories';
import { ParkedVehicle } from '../../domain/entities';
import { DuplicateParkingEntryException } from '../../domain/exceptions';

export class RegisterParkingEntry {
  private readonly parkingLotRepository: ParkingLotRepository;
  constructor(repositoryFactory: RepositoryFactory) {
    this.parkingLotRepository = repositoryFactory.getParkingLotRepository();
  }

  async execute(plate: string): Promise<void> {
    if (await this.parkingLotRepository.getParkedVehicleByPlate(plate)) {
      throw new DuplicateParkingEntryException(plate);
    }
    const parkedVehicle = new ParkedVehicle(plate);
    parkedVehicle.entryDate = new Date();

    await this.parkingLotRepository.createParkedVehicle(parkedVehicle);
  }
}
