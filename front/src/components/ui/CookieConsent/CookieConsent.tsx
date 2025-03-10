'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Switch } from '@headlessui/react';
import { cookieConsentContent } from '@/content/cookieConsentContent';

type CookiePreferences = {
  [key: string]: boolean;
};

export const CookieConsent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    performance: false,
    social: false,
    advertising: false,
    privacy: false
  });

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = Object.keys(preferences).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    savePreferences(allAccepted);
  };

  const handleReject = () => {
    const onlyNecessary = Object.keys(preferences).reduce((acc, key) => ({
      ...acc,
      [key]: key === 'necessary'
    }), {});
    savePreferences(onlyNecessary);
  };

  const savePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    document.body.style.overflow = 'auto';
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white  max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {cookieConsentContent.mainModal.title}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {cookieConsentContent.mainModal.description}
          </p>

          {!showDetails ? (
            <div className="space-y-4">
              <button
                onClick={handleAcceptAll}
                className="w-full bg-[#242E61] text-white py-2 hover:bg-[#1a2347] transition-colors"
              >
                {cookieConsentContent.mainModal.buttons.accept}
              </button>
              
              <button
                onClick={handleReject}
                className="w-full border border-gray-300 py-2 hover:bg-gray-50 transition-colors"
              >
                {cookieConsentContent.mainModal.buttons.reject}
              </button>
              
              <button
                onClick={() => setShowDetails(true)}
                className="w-full text-[#242E61] underline py-2"
              >
                {cookieConsentContent.mainModal.buttons.customize}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(cookieConsentContent.cookieTypes).map(([key, value]) => (
                <div key={key} className="flex items-start justify-between gap-4 pb-4 border-b">
                  <div>
                    <h3 className="font-medium mb-1">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                  <Switch
                    checked={preferences[key]}
                    onChange={(checked) => value.required ? null : setPreferences(prev => ({
                      ...prev,
                      [key]: checked
                    }))}
                    disabled={value.required}
                    className={`${
                      preferences[key] ? 'bg-[#242E61]' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                  >
                    <span className="sr-only">Enable {value.title}</span>
                    <span
                      className={`${
                        preferences[key] ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4">
                <Link
                  href="/politique-confidentialite"
                  className="text-[#242E61] text-sm hover:underline"
                >
                  {cookieConsentContent.footer.moreInfo}
                </Link>
                <button
                  onClick={() => savePreferences(preferences)}
                  className="bg-[#242E61] text-white px-6 py-2 rounded-lg hover:bg-[#1a2347] transition-colors"
                >
                  {cookieConsentContent.mainModal.buttons.save}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 