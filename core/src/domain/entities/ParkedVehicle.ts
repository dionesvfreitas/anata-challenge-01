export class ParkedVehicle {
  public readonly plate: string;
  public entryDate: Date;
  public exitDate: Date;
  public expectedExitDate: Date;

  constructor(plate: string) {
    this.plate = plate;
  }
}
