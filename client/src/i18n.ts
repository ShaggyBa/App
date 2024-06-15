import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Импорт переводов
import en from '../public/locales/en.json';
import ru from '../public/locales/ru.json';

// Инициализация i18next
i18n
	.use(initReactI18next)
	.init({
		//@ts-ignore
		resources: {
			en: { translation: en },
			ru: { translation: ru },
		},
		lng: 'ru', // Язык по умолчанию
		keySeparator: false,
		fallbackLng: 'ru', // Язык резервной копии
		interpolation: {
			escapeValue: false // react already safes from xss
		}
	});

export default i18n;