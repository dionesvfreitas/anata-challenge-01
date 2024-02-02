import { InMemoryParkingLotRepository } from './InMemoryParkingLotRepository';
import { ParkingLotRepository } from '../../domain/repositories';

export class InMemoryRepositoryFactory {
  static getParkingLotRepository(): ParkingLotRepository {
    return new InMemoryParkingLotRepository();
  }
}
