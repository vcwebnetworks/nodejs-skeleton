import moment from 'moment-timezone';

import configApp from '@/config/app';

const supportedTimezones = moment.tz.names();

if (!supportedTimezones.includes(configApp.timezone)) {
  throw new Error(`Timezone ${configApp.timezone} not supported.`);
}

moment.tz.setDefault(configApp.timezone);
moment.locale(configApp.locale);
