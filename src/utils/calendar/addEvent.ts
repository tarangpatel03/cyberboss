import RNCalendarEvents, { ISODateString } from 'react-native-calendar-events';
import { showErrorToast } from '../toast/toast';
import { appText } from '../../config/text/constantsText';
import CalanderEvents from 'react-native-calendar-events';

export const addToCalendar = async ({
  startDate,
  endDate,
  notes,
}: {
  startDate: ISODateString;
  endDate: ISODateString;
  notes: string;
}) => {
  try {
    const permission = await CalanderEvents.requestPermissions();
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
    showErrorToast({
      title: appText.somethingWentWrong,
      subtitle: appText.pleaseTryAgain,
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
