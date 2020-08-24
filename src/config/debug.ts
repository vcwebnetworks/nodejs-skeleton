import debug from 'debug';

const debugApp = (namespace = 'main') => debug(`app:${namespace}`);

export default debugApp;
