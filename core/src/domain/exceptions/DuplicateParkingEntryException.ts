export class DuplicateParkingEntryException extends Error {
  constructor(plate: string) {
    super();
    this.name = 'DuplicateParkingEntryError';
    this.message = 'The parking entry for plate ' + plate + ' already exists.';
  }
}
