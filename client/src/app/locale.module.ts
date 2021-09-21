import { registerLocaleData } from '@angular/common';
import localeUa from '@angular/common/locales/uk';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

registerLocaleData(localeUa);

@NgModule({
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'uk_UA',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'GRN',
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'uk_UA',
    },
  ],
})
export class LocaleModule { }
