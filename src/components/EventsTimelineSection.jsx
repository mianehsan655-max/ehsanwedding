import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Sparkles,
  CalendarPlus,
  ArrowRight,
} from 'lucide-react';
import {
  LoveBirdsPair,
  PremiumBoxCorners,
} from './BotanicalAndBirdsArt';

/**
 * Compact Mughal Royal Palace Cusped Arch Crown (Shahi Darwaza Header)
 * Integrates Event Number, Title, and Urdu Calligraphy directly inside the arch to keep height short
 */
function CompactMughalDoorCrown({ number, title, urduTitle }) {
  return (
    <div className="relative w-full select-none">
      {/* Compact Finial Spire (Kalash) */}
      <div className="flex flex-col items-center -mb-1.5 relative z-20">
        <div className="w-2 h-2 rounded-full bg-[#8A6012] border border-[#FFE5A3]" />
        <div className="w-3.5 h-3.5 rounded-full gold-foil-bg border border-[#FFE5A3] -mt-0.5 shadow" />
      </div>

      {/* Compact Scalloped Mughal Mehrab Header */}
      <div className="relative w-full overflow-hidden rounded-t-[2.25rem] gold-foil-bg px-4 pt-3.5 pb-3 border-b-2 border-[#E6C575] shadow">
        {/* Decorative Cusped Arch Outline SVG */}
        <svg
          viewBox="0 0 400 70"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-35"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 8 70 Q 12 36 45 30 Q 75 12 125 14 Q 165 2 200 2 Q 235 2 275 14 Q 325 12 355 30 Q 388 36 392 70"
            stroke="#FFFDF9"
            strokeWidth="2.5"
          />
          <path
            d="M 18 70 Q 22 42 52 36 Q 82 20 130 20 Q 168 9 200 9 Q 232 9 270 20 Q 318 20 348 36 Q 378 42 382 70"
            stroke="#FFFDF9"
            strokeWidth="1.2"
            strokeDasharray="3 2"
          />
        </svg>

        <div className="relative z-10 flex items-center justify-between gap-2">
          {/* Left: Event Number Medallion */}
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-ivory-pearl text-gold-deep font-display font-bold text-xs shadow border border-[#FFE5A3] shrink-0">
            {number}
          </span>

          {/* Center: Event Title */}
          <h3 className="font-display text-base sm:text-lg font-bold text-ivory-pearl tracking-wide text-center leading-tight">
            {title}
          </h3>

          {/* Right: Urdu Calligraphy Badge */}
          <span
            dir="rtl"
            lang="ur"
            className="font-arabic text-sm sm:text-base text-gold-deep bg-ivory-pearl font-bold px-2.5 py-0.5 rounded-full shadow border border-[#FFE5A3] shrink-0 leading-relaxed"
          >
            {urduTitle}
          </span>
        </div>
      </div>
    </div>
  );
}

export function EventsTimelineSection({ events, invitedEventIds }) {
  const visibleEvents =
    invitedEventIds && invitedEventIds.length > 0
      ? events.filter((ev) => invitedEventIds.includes(ev.id))
      : events;

  const handleDownloadICS = (event) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//EhsanWedsNadia//RoyalWedding2026//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${event.id}-2026-ehsan-nadia@royalwedding.pk`,
      `SUMMARY:${event.title} - Ehsan Ali Weds Nadia Asghar`,
      `DTSTART:${event.isoStart}`,
      `DTEND:${event.isoEnd}`,
      `LOCATION:${event.fullAddress}`,
      `DESCRIPTION:${event.tagline} | ${event.fullAddress}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P7D',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder (7 Days Left): ${event.title} — Ehsan Ali Weds Nadia Asghar`,
      'END:VALARM',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      `DESCRIPTION:Tomorrow: ${event.title} (${event.primaryTime}) — Ehsan Ali Weds Nadia Asghar`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}-ehsan-weds-nadia.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="wedding-events" className="relative mx-auto max-w-6xl px-4 sm:px-8 py-6">
      {/* Compact Section Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center -mb-2">
          <LoveBirdsPair size="sm" showHeart={true} />
        </div>
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full gold-foil-bg text-ivory-pearl text-[11px] font-sans uppercase tracking-[0.22em] font-bold shadow">
          <Sparkles className="w-3 h-3 text-[#FFF0B8]" />
          Royal Shahi Darwaza Itinerary
          <Sparkles className="w-3 h-3 text-[#FFF0B8]" />
        </span>
        <h2 className="font-display text-2xl sm:text-4xl font-bold gold-foil-text mt-2 py-0.5">
          Auspicious Celebrations
        </h2>
      </div>

      {/* Compact Mughal Royal Doors Grid */}
      <div
        className={`grid grid-cols-1 ${
          visibleEvents.length === 3
            ? 'lg:grid-cols-3'
            : visibleEvents.length === 2
            ? 'md:grid-cols-2 max-w-4xl mx-auto'
            : 'max-w-xl mx-auto'
        } gap-6 items-stretch`}
      >
        {visibleEvents.map((event) => (
          <div
            key={event.id}
            className="group relative flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5"
          >
            {/* 1. Compact Mughal Cusped Arch Header */}
            <CompactMughalDoorCrown
              number={event.number}
              title={event.title}
              urduTitle={event.urduTitle}
            />

            {/* 2. Compact Mughal Door Frame Body */}
            <div className="relative flex-1 flex flex-col justify-between ivory-card-surface border-x-[8px] border-b-[8px] border-[#9E711B] shadow-royal px-4 py-4 sm:px-5 sm:py-4 overflow-hidden">
              {/* Left & Right Carved Door Shutter Jamb Studs (Brass Bosses) */}
              <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-[#825910] via-[#D4A63E] to-[#825910] flex flex-col justify-around items-center py-3 pointer-events-none">
                {[1, 2, 3, 4].map((n) => (
                  <span key={n} className="w-1 h-1 rounded-full bg-[#FFFDF9] shadow" />
                ))}
              </div>
              <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-[#825910] via-[#D4A63E] to-[#825910] flex flex-col justify-around items-center py-3 pointer-events-none">
                {[1, 2, 3, 4].map((n) => (
                  <span key={n} className="w-1 h-1 rounded-full bg-[#FFFDF9] shadow" />
                ))}
              </div>

              {/* Inner Doorway Gold Border & 4-Corner Filigree */}
              <div className="absolute inset-2 border border-gold-DEFAULT/55 pointer-events-none" />
              <PremiumBoxCorners size="sm" offset="inset-2" />

              {/* Compact Content Inside the Doorway */}
              <div className="relative z-20 space-y-2.5">
                {/* Side-by-Side Date & Time Strip */}
                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-ivory-warm border border-gold-DEFAULT/55">
                    <div className="w-7 h-7 rounded-lg gold-foil-bg text-ivory-pearl flex items-center justify-center shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] font-sans uppercase tracking-wider text-gold-deep font-bold truncate">
                        {event.dayOfWeek}
                      </div>
                      <div className="font-display text-xs sm:text-[13px] font-bold text-espresso leading-tight">
                        {event.dateDisplay}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-xl bg-ivory-warm border border-gold-DEFAULT/55">
                    <div className="w-7 h-7 rounded-lg gold-foil-bg text-ivory-pearl flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] font-sans uppercase tracking-wider text-gold-deep font-bold truncate">
                        Timing
                      </div>
                      <div className="font-sans text-xs font-bold text-espresso leading-tight">
                        {event.primaryTime}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compact Schedule Steps */}
                <div className="space-y-1.5 text-left bg-ivory-pearl/95 p-2.5 rounded-xl border border-gold-DEFAULT/50">
                  {event.scheduleSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="relative pl-2.5 border-l-2 border-gold-DEFAULT py-0.5"
                    >
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.2 rounded gold-foil-bg text-ivory-pearl font-sans text-[10px] font-bold">
                          {step.time}
                        </span>
                        <span className="font-sans text-[11px] font-bold uppercase tracking-wide text-espresso">
                          {step.label}
                        </span>
                      </div>
                      <p className="font-serif text-xs sm:text-[13px] text-espresso font-medium mt-0.5 leading-snug">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compact Bottom Venue & Action Bar */}
              <div className="relative z-20 pt-2.5 mt-2.5 border-t border-gold-DEFAULT/40 space-y-2">
                <div className="flex items-center gap-1.5 text-left">
                  <MapPin className="w-4 h-4 text-gold-deep shrink-0" />
                  <div className="truncate font-sans text-[11px] font-bold text-espresso">
                    {event.venueName}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={event.mapQuery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg gold-foil-bg text-ivory-pearl font-sans text-[11px] font-bold uppercase tracking-wider shadow hover:opacity-95 transition"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>{event.id === 'barat' ? 'Arrival Map' : 'Venue Map'}</span>
                  </a>

                  {event.departureMapQuery && (
                    <a
                      href={event.departureMapQuery}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-lg bg-ivory-warm border border-gold-DEFAULT/70 text-gold-deep font-sans text-[11px] font-bold hover:bg-gold-champagne transition"
                      title="View Barat Departure Location on Google Maps"
                    >
                      <span>Depart</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDownloadICS(event)}
                    className="inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-lg bg-ivory-warm border border-gold-DEFAULT/70 text-espresso font-sans text-[11px] font-bold hover:bg-gold-champagne transition"
                    title="Save to Phone Calendar"
                  >
                    <CalendarPlus className="w-3 h-3 text-gold-deep" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Compact Stepped Mughal Threshold Plinth Base */}
            <div className="mx-auto w-[96%] h-2 gold-foil-bg border-x border-b border-[#825910] rounded-b" />
            <div className="mx-auto w-full h-1.5 bg-[#825910] rounded-b-lg shadow" />
          </div>
        ))}
      </div>
    </section>
  );
}
