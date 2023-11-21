import {Parking} from "../models";

export class ParkingReceiptService {
  constructor(private readonly parking: Parking) {}

  execute(): string[] {
    return [
      `Plate: ${this.parking.getVehicle().getPlate()}`,
      `CheckIn: ${this.parking.getStartDate()}`,
      `CheckOut: ${this.parking.getEndDate().toISO()}`,
      `Total elapsed time: ${this.parking.getTotalElapsedTimeInMinutes()} minutes`,
      `Total value: ${this.parking.getTotalValue().toFixed(2)}`
    ];
  }
}
