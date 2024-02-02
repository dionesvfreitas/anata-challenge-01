import { Period } from '../../src/domain/entities';

describe('Period', () => {
  it('should be able to get the elapsed time in minutes', () => {
    const date1 = new Date('2023-02-01T00:00:00Z');
    const date2 = new Date('2023-02-01T00:01:10Z');
    const period = new Period(date1, date2);

    expect(period.elapsedTimeInMinutes).toBe(1);
  });

  it('should be able to get the elapsed time in seconds', () => {
    const date1 = new Date('2023-02-01T00:00:00Z');
    const date2 = new Date('2023-02-01T00:00:31Z');
    const period = new Period(date1, date2);

    expect(period.elapsedTimeInSeconds).toBe(31);
  });
});
