import { validatePassword } from "@react-native-firebase/auth";
import { addToCalendar, convertToEventDate } from "./calendar/addCalendarEvent";
import { extractImageUri, getProfilePicture } from "./extractURI/extractImageURI";
import { getFontFamily } from "./fonts/getFontFamily";
import {formatBooking, formatFirebaseTimestamp, getDate, getFullDate, getTime} from "./format/formatDate.ts";
import { getGradientColor, getServiceImage } from "./gradientColor/gradientColor";
import normalize from "./normalize/normalize";
import { isDarkMode } from "./theme/darkMode";
import { showErrorToast, showSuccessToast } from "./toast/toast";
import { validateEmail } from "./validation/validation";

export const Utils = {
    addToCalendar,
    extractImageUri,
    getProfilePicture,
    getFontFamily,
    getDate,
    getFullDate,
    getTime,
    formatBooking,
    formatFirebaseTimestamp,
    getGradientColor,
    getServiceImage,
    normalize,
    convertToEventDate,
    isDarkMode,
    showSuccessToast,
    showErrorToast,
    validatePassword,
    validateEmail,
}