import moment, { Moment } from "moment";
import "moment-timezone";

const isWeekend = ({ day }: Moment): boolean => day() === 0 || day() === 6;
const isBeforeMarket = ({ hour, minute }: Moment): boolean => hour() < 9 || (hour() === 9 && minute() < 30);
const isAfterMarket = ({ hour, minute }: Moment): boolean => hour() > 16 || (hour() === 16 && minute() > 0);

const isNewYearsDay = ({ date, month }: Moment): boolean => date() === 1 && month() === 0;
const isMartinLutherKingDay = ({ date, month, day }: Moment): boolean =>
  day() === 1 && month() === 0 && date() >= 15 && date() <= 21;
const isPresidentsDay = ({ date, month, day }: Moment): boolean =>
  day() === 1 && month() === 1 && date() >= 15 && date() <= 21;
const isMemorialDay = ({ date, month, day }: Moment): boolean => day() === 1 && month() === 4 && date() >= 25;
const isIndependenceDay = ({ date, month }): boolean => date() === 4 && month() == 6;
const isLaborDay = ({ date, month, day }: Moment): boolean => day() === 1 && month() === 8 && date() <= 7;
const isThanksgivingDay = ({ date, month, day }: Moment): boolean =>
  day() === 4 && month() === 10 && date() >= 22 && date() <= 28;
const isChristmas = ({ date, month }: Moment): boolean => date() === 25 && month() === 11;
const isBankHoliday = (moment: Moment): boolean =>
  [
    isNewYearsDay,
    isMartinLutherKingDay,
    isPresidentsDay,
    isMemorialDay,
    isIndependenceDay,
    isLaborDay,
    isThanksgivingDay,
    isChristmas,
  ].some((fn) => fn(moment));

const isBlackFriday = ({ date, month, day }: Moment): boolean =>
  day() === 5 && month() === 10 && date() >= 23 && date() <= 29;
const isChristmasEve = ({ date, month }: Moment): boolean => date() === 24 && month() === 11;
const isEarlyCloseDay = (moment: Moment): boolean => [isBlackFriday, isChristmasEve].some((fn) => fn(moment));
export const isMarketOpen = (): boolean => {
  const nowInEastern = moment().tz("America/New_York");
  if (isBankHoliday(nowInEastern)) return false;
  if (isWeekend(nowInEastern)) return false;
  if (isBeforeMarket(nowInEastern)) return false;
  if (isAfterMarket(nowInEastern)) return false;
  if (isEarlyCloseDay(nowInEastern) && nowInEastern.hours() >= 13) return false;
  return true;
};
