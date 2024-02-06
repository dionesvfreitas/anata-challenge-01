import { InMemoryParkingLotRepository } from './InMemoryParkingLotRepository';
import {
  ParkingLotRepository,
  RepositoryFactory,
} from '../../domain/repositories';

export class InMemoryRepositoryFactory implements RepositoryFactory {
  private readonly repositories = new Map();
  getParkingLotRepository(): ParkingLotRepository {
    if (!this.repositories.has('ParkingLotRepository')) {
      this.repositories.set(
        'ParkingLotRepository',
        new InMemoryParkingLotRepository()
      );
    }

    return this.repositories.get('ParkingLotRepository');
  }
}
