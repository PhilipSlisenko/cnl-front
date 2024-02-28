"use client";

import { useState } from "react";

function DateTimeDisplay() {
  const [locale, setLocale] = useState(navigator.language);
  const [timeZone, setTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const date = new Date(); // Use the current date and time
  const formattedDate = new Intl.DateTimeFormat(locale, {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timeZone,
  }).format(date);

  const handleLocaleChange = (event: any) => {
    setLocale(event.target.value);
  };

  const handleTimeZoneChange = (event: any) => {
    setTimeZone(event.target.value);
  };

  return (
    <div>
      <div>Current Date and Time: {formattedDate}</div>
      <div>
        <label>
          Choose your locale:
          <select value={locale} onChange={handleLocaleChange}>
            <option value="en-US">English (United States)</option>
            <option value="fr-FR">French (France)</option>
            <option value="es-ES">Spanish (Spain)</option>
            {/* Add more locales as needed */}
          </select>
        </label>
      </div>
      <div>
        <label>
          Choose your time zone:
          <select value={timeZone} onChange={handleTimeZoneChange}>
            {/* List of time zones */}
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/Paris">Europe/Paris</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
            {/* Add more time zones as needed */}
          </select>
        </label>
      </div>
    </div>
  );
}

export default DateTimeDisplay;
