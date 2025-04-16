export default {
  expo: {
    name: 'SpeedyCard',
    slug: 'SpeedyCard',
    version: '0.0.2',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'speedycard',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: ['**/*'],
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      }
    },
    web: {
      favicon: './assets/images/favicon.png'
    }
  }
}