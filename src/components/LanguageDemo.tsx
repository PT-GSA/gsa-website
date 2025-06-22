'use client';

import { useTranslation } from 'react-i18next';
import { useI18n } from './I18nProvider';

const LanguageDemo = () => {
  const { t } = useTranslation('common');
  const { language } = useI18n();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h3 className="text-xl font-bold mb-4">i18n Demo</h3>
      <div className="space-y-2">
        <p><strong>Current Language:</strong> {language.toUpperCase()}</p>
        <p><strong>Hero Title:</strong> {t('hero.title')}</p>
        <p><strong>Hero Subtitle:</strong> {t('hero.subtitle')}</p>
        <p><strong>CTA Button:</strong> {t('cta.getStarted')}</p>
      </div>
    </div>
  );
};

export default LanguageDemo; 