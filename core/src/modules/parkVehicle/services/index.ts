import {ParkingRepository, ParkingRepositoryInMemory} from "../repository";
import {ParkingService} from "./ParkingService";

const parkingRepository: ParkingRepository = new ParkingRepositoryInMemory();
export const parkingService: ParkingService = new ParkingService(parkingRepository);

export * from './ParkingReceiptService';
