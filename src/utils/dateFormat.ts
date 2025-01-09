const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const dayFormatted = currentDay.toString().padStart(2, '0');
const monthFormatted = (currentMonth + 1).toString().padStart(2, '0');

export const getFullTime = `${dayFormatted}-${monthFormatted}-${currentYear}`;
