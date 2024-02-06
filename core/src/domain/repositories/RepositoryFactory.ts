import { ParkingLotRepository } from './ParkingLotRepository';

export interface RepositoryFactory {
  getParkingLotRepository(): ParkingLotRepository;
}
