import pt from './pt.json';
import en from './en.json';
import es from './es.json';
import sapPt from './sap.pt.json';
import sapEn from './sap.en.json';
import sapEs from './sap.es.json';
import dynPt from './dynamics.pt.json';
import dynEn from './dynamics.en.json';
import dynEs from './dynamics.es.json';
import privPt from './privacy.pt.json';
import privEn from './privacy.en.json';
import privEs from './privacy.es.json';
import type { Locale } from './locales';

export const home: Record<Locale, typeof pt> = { pt, en: en as typeof pt, es: es as typeof pt };
export const sap: Record<Locale, typeof sapPt> = { pt: sapPt, en: sapEn as typeof sapPt, es: sapEs as typeof sapPt };
export const dynamics: Record<Locale, typeof dynPt> = { pt: dynPt, en: dynEn as typeof dynPt, es: dynEs as typeof dynPt };
export const privacy: Record<Locale, typeof privPt> = { pt: privPt, en: privEn as typeof privPt, es: privEs as typeof privPt };
