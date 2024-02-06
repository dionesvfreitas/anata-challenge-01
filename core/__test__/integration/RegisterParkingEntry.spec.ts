import { InMemoryRepositoryFactory } from '../../src/infra/repositories';
import {
  RegisterParkingEntry,
  RegisterParkingExit,
} from '../../src/application/useCases';
import { DuplicateParkingEntryException } from '../../src/domain/exceptions';
import { RepositoryFactory } from '../../src/domain/repositories';

describe('RegisterParkingEntry', () => {
  let repositoryFactory: RepositoryFactory;
  beforeEach(() => {
    repositoryFactory = new InMemoryRepositoryFactory();
  });

  it('should be able to register 1 vehicle entry into the parking lot', async () => {
    const parkingLotRepository = repositoryFactory.getParkingLotRepository();
    const registerParkingEntry = new RegisterParkingEntry(repositoryFactory);
    await registerParkingEntry.execute('ABC-1234');

    const quantityOfVehiclesParked =
      await parkingLotRepository.getParkedVehicles();

    expect(quantityOfVehiclesParked.length).toBe(1);
  });

  it('should be able to register 2 vehicle entry into the parking lot', async () => {
    const parkingLotRepository = repositoryFactory.getParkingLotRepository();
    const registerParkingEntry = new RegisterParkingEntry(repositoryFactory);
    await registerParkingEntry.execute('ABC-1233');
    await registerParkingEntry.execute('ABC-1234');

    const quantityOfVehiclesParked =
      await parkingLotRepository.getParkedVehicles();
    expect(quantityOfVehiclesParked.length).toBe(2);
  });

  it('should be able to prevent duplicate plate entry', async () => {
    const plate = 'ABC-1234';
    const plate2 = 'ABC-1233';

    const parkingLotRepository = repositoryFactory.getParkingLotRepository();
    const registerParkingEntry = new RegisterParkingEntry(repositoryFactory);
    await registerParkingEntry.execute(plate);
    await registerParkingEntry.execute(plate2);

    await expect(registerParkingEntry.execute(plate)).rejects.toThrow(
      DuplicateParkingEntryException
    );

    const quantityOfVehiclesParked =
      await parkingLotRepository.getParkedVehicles();
    expect(quantityOfVehiclesParked.length).toBe(2);
  });

  it('should be able to register 1 vehicle entry after the same vehicle left', async () => {
    const plate = 'ABC-1234';
    const parkingLotRepository = repositoryFactory.getParkingLotRepository();
    const registerParkingEntry = new RegisterParkingEntry(repositoryFactory);
    const registerParkingExit = new RegisterParkingExit(repositoryFactory);
    await registerParkingEntry.execute(plate);
    await registerParkingExit.execute(plate);

    await registerParkingEntry.execute(plate);

    const quantityOfVehicleParked =
      await parkingLotRepository.getParkedVehicles();
    expect(quantityOfVehicleParked.length).toBe(1);
  });
});
