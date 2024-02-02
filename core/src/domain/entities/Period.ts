const ONE_MINUTE_IN_MILLIS = 60000;
const ONE_SECOND_IN_MILLIS = 1000;

export class Period {
  constructor(
    private readonly startDateTime: Date,
    private readonly endDateTime: Date
  ) {}

  public static between(startDateTime: Date, endDateTime: Date): Period {
    return new Period(startDateTime, endDateTime);
  }

  public get elapsedTimeInMinutes(): number {
    return Math.floor(
      (this.endDateTime.getTime() - this.startDateTime.getTime()) /
        ONE_MINUTE_IN_MILLIS
    );
  }

  public get elapsedTimeInSeconds(): number {
    return Math.floor(
      (this.endDateTime.getTime() - this.startDateTime.getTime()) /
        ONE_SECOND_IN_MILLIS
    );
  }
}
