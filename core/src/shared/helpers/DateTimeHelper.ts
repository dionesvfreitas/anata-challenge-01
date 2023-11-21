import {DateTime} from "luxon";

export class DateTimeHelper {
  static now(): DateTime {
    return DateTime
      .now()
      .setZone('GMT');
  }
}
