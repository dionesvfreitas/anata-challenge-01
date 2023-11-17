export class Vehicle {
  private plate: string;
  private _isParked: boolean = false;

  public getPlate(): string {
    return this.plate;
  }

  public setPlate(plate: string): Vehicle {
    this.plate = plate;
    return this;
  }

  public isParked(): boolean {
    return this._isParked;
  }

  public setParked(isParked: boolean): Vehicle {
    this._isParked = isParked;
    return this;
  }
}
