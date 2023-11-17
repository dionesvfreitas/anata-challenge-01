import {Parking} from "./models";
import {VehicleAlreadyParkedException} from "./exceptions";
import {ParkingService} from "./services/ParkingService";
import {ParkingRepositoryInMemory} from "./repository";

describe('ParkVehicle', (): void => {
  describe('ParkingRepositoryInMemory', (): void => {
    let parkingService: ParkingService;

    beforeEach((): void => {
      parkingService = new ParkingService(new ParkingRepositoryInMemory());
    });

    it('should be able to register check-in of vehicle', async (): Promise<void> => {
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

    it('should be able to prevent the entry of an already parked vehicle', async (): Promise<void> => {
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
  });
});
