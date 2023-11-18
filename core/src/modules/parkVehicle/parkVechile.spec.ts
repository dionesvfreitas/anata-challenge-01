import {Parking} from "./models";
import {VehicleAlreadyParkedException, VehicleNotParkedException} from "./exceptions";
import {ParkingService} from "./services/ParkingService";
import {ParkingRepositoryInMemory} from "./repository";
import {DateTime, Duration, Settings} from "luxon";
import {FirstHourRule} from "./models/parkingPriceRules/FirstHourRule";
import {AdditionalHourRule} from "./models/parkingPriceRules/AdditionalHourRule";

describe('ParkVehicle', (): void => {
  describe('ParkingRepositoryInMemory', (): void => {
    let parkingService: ParkingService;

    beforeEach((): void => {
      parkingService = new ParkingService(new ParkingRepositoryInMemory());
    });

    it('should be able to register check-in of vehicle', (): void => {
      const plate = 'ABC1234';
      const plate2 = 'ABC1235';
      const parkedVehicle: Parking = parkingService.checkIn(plate);
      const parkedVehicle2: Parking = parkingService.checkIn(plate2);

      expect(parkedVehicle.getVehicle().isParked()).toBeTruthy();
      expect(parkedVehicle2.getVehicle().isParked()).toBeTruthy();

      const parkingFound: Parking = parkingService.findByPlate(plate);
      const parkingFound2: Parking = parkingService.findByPlate(plate2);
      expect(parkingFound).not.toBeNull();
      expect(parkingFound.getVehicle().isParked()).toBeTruthy();
      expect(parkingFound.getVehicle().getPlate()).toBe(plate);

      expect(parkingFound2).not.toBeNull();
      expect(parkingFound2.getVehicle().isParked()).toBeTruthy();
      expect(parkingFound2.getVehicle().getPlate()).toBe(plate2);
    });

    it('should be able to prevent the entry of an already parked vehicle', (): void => {
      const plate = 'ABC1234';
      const parkedVehicle: Parking = parkingService.checkIn(plate);
      expect(parkedVehicle.getVehicle().isParked()).toBeTruthy();

      const parkingFound: Parking = parkingService.findByPlate(plate);
      expect(parkingFound).not.toBeNull();
      expect(parkingFound.getVehicle().isParked()).toBeTruthy();
      expect(parkingFound.getVehicle().getPlate()).toBe(plate);

      expect(() => parkingService.checkIn(plate)).toThrow();
      expect(() => parkingService.checkIn(plate)).toThrow(new VehicleAlreadyParkedException(plate));
    });

    it('should be able to register check-out of vehicle', (): void => {
      const plate = 'ABC1234';
      let parkedVehicle: Parking = parkingService.checkIn(plate);

      expect(parkedVehicle.getVehicle().isParked()).toBeTruthy();
      parkedVehicle = parkingService.checkOut(plate);

      expect(parkedVehicle.getVehicle().isParked()).toBeFalsy();
    });

    it('should be able to prevent the exit of an un-parked vehicle', (): void => {
      const plate = 'ABC1234';
      expect(() => parkingService.checkOut(plate)).toThrow();
      expect(() => parkingService.checkOut(plate)).toThrow(new VehicleNotParkedException(plate));
    });

    describe('Parking Amount', (): void => {
      describe('Free Period Rule', (): void => {
        it('should not charge for parking for vehicles parked within the free period', (): void => {
          const plate = 'ABC1234';

          parkingService.checkIn(plate);
          let dateInTheFuture: DateTime = DateTime.now().plus(Duration.fromObject({minutes: 2}));
          Settings.now = () => dateInTheFuture.toMillis();
          let parkedVehicle: Parking = parkingService.checkOut(plate);
          expect(parkedVehicle.getTotalValue()).toBe(0);

          parkingService.checkIn(plate);
          dateInTheFuture = DateTime.now().plus(Duration.fromObject({minutes: 10}));
          Settings.now = () => dateInTheFuture.toMillis();
          parkedVehicle = parkingService.checkOut(plate);
          expect(parkedVehicle.getTotalValue()).toBe(0);

          parkingService.checkIn(plate);
          dateInTheFuture = DateTime.now().plus(Duration.fromObject({minutes: 15}));
          Settings.now = () => dateInTheFuture.toMillis();
          parkedVehicle = parkingService.checkOut(plate);
          expect(parkedVehicle.getTotalValue()).toBe(0);
        });

        it('should charge for parking for vehicles parked after the free period', (): void => {
          const plate = 'ABC1234';

          parkingService.checkIn(plate);
          let dateInTheFuture: DateTime = DateTime.now().plus(Duration.fromObject({minutes: 16}));
          Settings.now = () => dateInTheFuture.toMillis();
          let parkedVehicle: Parking = parkingService.checkOut(plate);
          expect(parkedVehicle.getTotalValue()).toBe(FirstHourRule.HOUR_VALUE);

          parkingService.checkIn(plate);
          dateInTheFuture = DateTime.now().plus(Duration.fromObject({minutes: 20}));
          Settings.now = () => dateInTheFuture.toMillis();
          parkedVehicle = parkingService.checkOut(plate);
          expect(parkedVehicle.getTotalValue()).toBe(FirstHourRule.HOUR_VALUE);

          parkingService.checkIn(plate);
          dateInTheFuture = DateTime.now().plus(Duration.fromObject({minutes: 30}));
          Settings.now = () => dateInTheFuture.toMillis();
          parkedVehicle = parkingService.checkOut(plate);
          expect(parkedVehicle.getTotalValue()).toBe(FirstHourRule.HOUR_VALUE);

          parkingService.checkIn(plate);
          dateInTheFuture = DateTime.now().plus(Duration.fromObject({minutes: 60}));
          Settings.now = () => dateInTheFuture.toMillis();
          parkedVehicle = parkingService.checkOut(plate);
          expect(parkedVehicle.getTotalValue()).toBe(FirstHourRule.HOUR_VALUE);

          parkingService.checkIn(plate);
          dateInTheFuture = DateTime.now().plus(Duration.fromObject({hours: 1, minutes: 1}));
          Settings.now = () => dateInTheFuture.toMillis();
          parkedVehicle = parkingService.checkOut(plate);
          expect(parkedVehicle.getTotalValue()).toBe(FirstHourRule.HOUR_VALUE + AdditionalHourRule.HOUR_VALUE);

          parkingService.checkIn(plate);
          dateInTheFuture = DateTime.now().plus(Duration.fromObject({hours: 1, minutes: 59}));
          Settings.now = () => dateInTheFuture.toMillis();
          parkedVehicle = parkingService.checkOut(plate);
          expect(parkedVehicle.getTotalValue()).toBe(FirstHourRule.HOUR_VALUE + AdditionalHourRule.HOUR_VALUE);
        });
      });
    });
  });
});
