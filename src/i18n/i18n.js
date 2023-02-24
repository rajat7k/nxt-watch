import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

i18n.use(initReactI18next).init({
    resources:{
      en:{
        translation: require('./locales/en/translation.json')
      },
      fr:{
        translation: require('./locales/fr/translation.json')
      },
      de:{
        translation: require('./locales/de/translation.json')
      },
      hi:{
        translation: require('./locales/hi/translation.json')
      }
    },
    lng:'en',
    fallbackLng:'en'
});
export default i18n