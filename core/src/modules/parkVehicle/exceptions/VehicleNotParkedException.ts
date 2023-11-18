export class VehicleNotParkedException extends Error {
    constructor(plate: string) {
        super(`Vehicle with plate ${plate} is not parked`);
        this.name = 'VehicleNotParkedException';
    }
}
