import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { getISOWeek, getISODay, getMonth } from 'date-fns';
import { DatePipe } from '@angular/common';

export class CustomDateFormatter extends CalendarDateFormatter {
  public dayViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new DatePipe(locale).transform(date, 'y', locale);
    const dayNumber: string = new DatePipe(locale).transform(date, 'd', locale);
    const month: string = new DatePipe(locale).transform(date, 'LLLL', locale);
    const weekday: string = new DatePipe(locale).transform(date, 'EEEE', locale);
    return `${weekday}, ${dayNumber} de ${month} de ${year}`;
  }
}
