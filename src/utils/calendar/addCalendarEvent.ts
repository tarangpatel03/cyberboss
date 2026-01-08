import RNCalendarEvents, { ISODateString } from 'react-native-calendar-events';
import CalenderEvents from 'react-native-calendar-events';
import { Utils } from '..';
import { Config } from '@config/index';

type AddToCalendarProps = {
  startDate: ISODateString;
  endDate: ISODateString;
  notes: string;
};

export const addToCalendar = async ({
  startDate,
  endDate,
  notes,
}: AddToCalendarProps) => {
  try {
    const permission = await CalenderEvents.requestPermissions();
    if (permission !== 'authorized') {
      return;
    }
    await RNCalendarEvents.saveEvent(notes, {
      startDate,
      endDate,
      calendarId: '2',
      alarms: [{ date: -10 }],
    });
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    Utils.showErrorToast({
      title: Config.appText.somethingWentWrong,
      subtitle: Config.appText.pleaseTryAgain,
    });
  }
};

export const convertToEventDate = (dateString: string, timeString: string) => {
  const datePart = dateString.split('T')[0];
  const [time, modifier] = timeString.split(/(AM|PM)/i);
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier.toUpperCase() === 'PM' && hours < 12) hours += 12;
  if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;

  const localDate = new Date(
    `${datePart}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:00`,
  );

  return localDate.toISOString();
};
