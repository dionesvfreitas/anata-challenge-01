import { InMemoryRepositoryFactory } from '../../src/infra/repositories';
import {
  CalculateParkingAmount,
  RegisterParkingEntry,
} from '../../src/application/useCases';

describe('CalculateParkingAmount', () => {
  const FIRST_HOUR_RATE = 5;
  const ADDITIONAL_HOUR_RATE = 3;

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be able to calculate the parking amount for 15 minutes', async () => {
    const plate = 'ABC-1234';
    const parkingLotRepository =
      InMemoryRepositoryFactory.getParkingLotRepository();
    const registerParkingEntry = new RegisterParkingEntry(parkingLotRepository);
    const calculateParkingAmount = new CalculateParkingAmount();

    jest.useFakeTimers().setSystemTime(new Date('2024-02-01T10:00:00Z'));
    await registerParkingEntry.execute(plate);

    jest.useFakeTimers().setSystemTime(new Date('2024-02-01T10:15:00Z'));

    const parkedVehicle = await parkingLotRepository.getParkedVehicleByPlate(
      plate
    );

    const calculatedAmountOutPut = await calculateParkingAmount.execute({
      startTime: parkedVehicle.entryDate,
    });

    expect(calculatedAmountOutPut.amount).toBe(0);
  });

  it('should be able to calculate the parking amount for 20 minutes', async () => {
    const plate = 'ABC-1234';
    const parkingLotRepository =
      InMemoryRepositoryFactory.getParkingLotRepository();
    const registerParkingEntry = new RegisterParkingEntry(parkingLotRepository);
    const calculateParkingAmount = new CalculateParkingAmount();

    jest.useFakeTimers().setSystemTime(new Date('2024-02-01T10:00:00Z'));
    await registerParkingEntry.execute(plate);

    jest.useFakeTimers().setSystemTime(new Date('2024-02-01T10:20:00Z'));

    const parkedVehicle = await parkingLotRepository.getParkedVehicleByPlate(
      plate
    );

    const calculatedAmountOutPut = await calculateParkingAmount.execute({
      startTime: parkedVehicle.entryDate,
    });

    expect(calculatedAmountOutPut.amount).toBe(FIRST_HOUR_RATE);
  });

  it('should be able to calculate the parking amount for 1 hour', async () => {
    const plate = 'ABC-1234';
    const parkingLotRepository =
      InMemoryRepositoryFactory.getParkingLotRepository();
    const registerParkingEntry = new RegisterParkingEntry(parkingLotRepository);
    const calculateParkingAmount = new CalculateParkingAmount();

    jest.useFakeTimers().setSystemTime(new Date('2024-02-01T10:00:00Z'));
    await registerParkingEntry.execute(plate);

    jest.useFakeTimers().setSystemTime(new Date('2024-02-01T11:00:00Z'));

    const parkedVehicle = await parkingLotRepository.getParkedVehicleByPlate(
      plate
    );

    const calculatedAmountOutPut = await calculateParkingAmount.execute({
      startTime: parkedVehicle.entryDate,
    });

    expect(calculatedAmountOutPut.amount).toBe(FIRST_HOUR_RATE);
  });

  it('should be able to calculate the parking amount for more than 1 hour', async () => {
    const plate = 'ABC-1234';
    const parkingLotRepository =
      InMemoryRepositoryFactory.getParkingLotRepository();
    const registerParkingEntry = new RegisterParkingEntry(parkingLotRepository);
    const calculateParkingAmount = new CalculateParkingAmount();

    jest.useFakeTimers().setSystemTime(new Date('2024-02-01T10:00:00Z'));
    await registerParkingEntry.execute(plate);

    jest.useFakeTimers().setSystemTime(new Date('2024-02-01T11:01:00Z'));

    const parkedVehicle = await parkingLotRepository.getParkedVehicleByPlate(
      plate
    );

    const calculatedAmountOutPut = await calculateParkingAmount.execute({
      startTime: parkedVehicle.entryDate,
    });

    expect(calculatedAmountOutPut.amount).toBe(
      FIRST_HOUR_RATE + ADDITIONAL_HOUR_RATE
    );
  });
});
