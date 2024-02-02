export class VehicleIsNotParkedException extends Error {
  constructor(plate: string) {
    super();
    this.name = 'VehicleIsNotParkedError';
    this.message = 'The vehicle with plate ' + plate + ' is not parked.';
  }
}
