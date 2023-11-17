export class VehicleAlreadyParkedException extends Error {
  constructor(plate: string) {
    super(`Vehicle with plate ${plate} is already parked`);
  }
}
