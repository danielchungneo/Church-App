import Constants from 'expo-constants';

function getEnvironment() {
  let releaseChannel = Constants?.expoConfig?.releaseChannel;

  if (releaseChannel === undefined  || releaseChannel.indexOf('default') !== -1) {
    // no releaseChannel (is undefined) in dev
    return {
      ...process.env,
      APP_ENV: 'development',
      isDev: true,
      isStaging: false,
      isProduction: false,
    }; // dev env settings
  }

  if (releaseChannel.indexOf('prod') !== -1) {
    return {
      ...process.env,
      APP_ENV: 'production',
      isDev: false,
      isStaging: false,
      isProduction: true,
    };
  }

  if (releaseChannel.indexOf('staging') !== -1) {
    return {
      ...process.env,
      APP_ENV: 'staging',
      isDev: false,
      isStaging: true,
      isProduction: false,
    };
  }
}

const env = getEnvironment();
export default env;
