import { LABELS } from "../assests.config";
import * as trans from "i18n-js";
import main from "./default";
import * as moment from "moment";
import "moment/locale/be";
import "moment/locale/es";
import "moment/locale/fr";

import { environment } from "src/environments/environment";

import countriesEn from "./default/countries-en";

function resolve(label: string): any {
  switch (label) {
    case LABELS.main:
      return main;
  }
}

interface Countries {
  countries: typeof countriesEn;
}

function createTranslationKeys<T extends { [key: string]: any }>(object: T): T {
  function recurse(object: any, prefix?: string): any {
    const res: any = {};
    let name: any;
    let value: any;
    Object.keys(object).forEach(key => {
      value = object[key];
      name = prefix ? `${prefix}.${key}` : key;
      res[key] =
        null !== value && "object" === typeof value
          ? recurse(value, name)
          : name;
    });
    return res;
  }
  return recurse(object) as T;
}

const translations = resolve(environment.LABEL);

if (translations.hasOwnProperty("en")) {
  // @ts-ignore
  translations.en["countries"] = countriesEn;
}

export const TRANS: typeof main.en & Countries = createTranslationKeys(
  translations.en
);

export const i18n = trans;

export function setAppLanguage(languagePlusArea: string) {
  const language = languagePlusArea.toLowerCase();
  i18n.locale = language;
  moment.locale(language);
}

i18n.translations = translations;
i18n.defaultLocale = "en";
i18n.fallbacks = true;

export default i18n;
