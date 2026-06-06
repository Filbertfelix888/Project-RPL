import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

const TZ_ASIA_JAKARTA = 'Asia/Jakarta';

const datetime = {
  format(dateValue, format = 'DD-MMM-YYYY') {
    return dayjs(dateValue).tz(TZ_ASIA_JAKARTA).format(format);
  },
  getIsoString(dateValue) {
    return dayjs(dateValue).tz(TZ_ASIA_JAKARTA).toISOString();
  },
  getDurationDays(startDate, endDate) {
    const start = dayjs(startDate).tz(TZ_ASIA_JAKARTA);
    const end = dayjs(endDate).tz(TZ_ASIA_JAKARTA);
    return end.diff(start, 'day') + 1;
  },
  getNow() {
    return dayjs().tz(TZ_ASIA_JAKARTA);
  },
  isSameOrAfter(startDate, endDate) {
    return dayjs(startDate).tz(TZ_ASIA_JAKARTA).isSameOrAfter(
      dayjs(endDate).tz(TZ_ASIA_JAKARTA)
    );
  },
  getDiff(startDate, endDate) {
    const start = dayjs(startDate).tz(TZ_ASIA_JAKARTA);
    const end = dayjs(endDate).tz(TZ_ASIA_JAKARTA);
    return end.diff(start, 'day');
  },
  getDiffCalendarDays(dueDate) {
    const now = dayjs().tz(TZ_ASIA_JAKARTA).startOf('day');
    const end = dayjs(dueDate).tz(TZ_ASIA_JAKARTA).startOf('day');
    return end.diff(now, 'day');
  }
};

export default datetime;
