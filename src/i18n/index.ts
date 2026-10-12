import pt from './pt.json';
import en from './en.json';
import es from './es.json';
import sapPt from './sap.pt.json';
import sapEn from './sap.en.json';
import sapEs from './sap.es.json';
import type { Locale } from './locales';

export const home: Record<Locale, typeof pt> = { pt, en: en as typeof pt, es: es as typeof pt };
export const sap: Record<Locale, typeof sapPt> = { pt: sapPt, en: sapEn as typeof sapPt, es: sapEs as typeof sapPt };
