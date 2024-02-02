import { ParkingLotRepository } from '../../domain/repositories';
import { ParkedVehicle } from '../../domain/entities';
import { DuplicateParkingEntryException } from '../../domain/exceptions';

export class RegisterParkingEntry {
  constructor(private readonly parkingLotRepository: ParkingLotRepository) {}

  async execute(plate: string): Promise<void> {
    if (await this.parkingLotRepository.getParkedVehicleByPlate(plate)) {
      throw new DuplicateParkingEntryException(plate);
    }
    const parkedVehicle = new ParkedVehicle(plate);
    parkedVehicle.entryDate = new Date();

    await this.parkingLotRepository.createParkedVehicle(parkedVehicle);
  }
}
