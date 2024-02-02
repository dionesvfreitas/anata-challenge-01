import {
  RegisterParkingEntry,
  RegisterParkingExit,
} from '../../src/application/useCases';
import { InMemoryRepositoryFactory } from '../../src/infra/repositories';
import { VehicleIsNotParkedException } from '../../src/domain/exceptions';

describe('RegisterParkingExit', () => {
  it('should be able to register a vehicle exit from the parking lot', async () => {
    const plate = 'ABC-1234';
    const plate2 = 'ABC-1233';
    const parkingLotRepository =
      InMemoryRepositoryFactory.getParkingLotRepository();
    const registerParkingEntry = new RegisterParkingEntry(parkingLotRepository);
    await registerParkingEntry.execute(plate);
    await registerParkingEntry.execute(plate2);
    const registerParkingExit = new RegisterParkingExit(parkingLotRepository);
    await registerParkingExit.execute(plate);
    const parkedVehicles = await parkingLotRepository.getParkedVehicles();

    expect(parkedVehicles.length).toBe(1);
  });

  it('should be able to prevent a vehicle from exiting the parking lot if it is not parked', async () => {
    const plate = 'ABC-1234';
    const parkingLotRepository =
      InMemoryRepositoryFactory.getParkingLotRepository();
    const registerParkingExit = new RegisterParkingExit(parkingLotRepository);

    await expect(registerParkingExit.execute(plate)).rejects.toThrow(
      VehicleIsNotParkedException
    );
  });
});
