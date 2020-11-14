import moment from 'moment';

const dateTimeFormat = 'HH:mm:ss DD/MM/YYYY';

export const formatDateTime = (dateTimeStr, format = dateTimeFormat) => (dateTimeStr ? moment(dateTimeStr).format(format) : null);

export const nowDateTime = (format = dateTimeFormat) => moment().format(format);
