import React, { useState, useEffect } from 'react';
import { Crown, Heart, Sparkles, Calendar, MapPin } from 'lucide-react';
import {
  LoveBirdsPair,
  RoyalDivider,
  PremiumBoxCorners,
} from './BotanicalAndBirdsArt';

export function CouplePortraitSection({
  weddingData,
  guestProfile,
  portraitUrl,
}) {
  const [imgSrc, setImgSrc] = useState(portraitUrl || '/couple-portrait.png');
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setImgSrc(portraitUrl || '/couple-portrait.png');
  }, [portraitUrl]);

  useEffect(() => {
    const target = new Date(weddingData.weddingDateISO).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [weddingData.weddingDateISO]);

  const hasCustomGuest = Boolean(guestProfile.name && guestProfile.name.trim());
  const fullGuestDisplay = hasCustomGuest
    ? `${guestProfile.title ? guestProfile.title + ' ' : ''}${guestProfile.name.trim()}`
    : 'Honored Guest & Family';

  return (
    <section className="relative mx-auto max-w-5xl px-4 sm:px-8 py-6">
      <div className="relative ivory-card-surface gold-border-double rounded-3xl p-6 sm:p-12 md:p-16 text-center overflow-hidden">
        {/* 4-Corner Premium Filigree on Outer Box */}
        <PremiumBoxCorners size="lg" offset="inset-2" />

        {/* Personalized VIP Guest Banner Box with Premium Corners */}
        <div className="relative z-20 mx-auto max-w-xl mb-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-ivory-warm via-ivory-pearl to-ivory-warm border-2 border-gold-DEFAULT/75 shadow-royal overflow-hidden">
          <PremiumBoxCorners size="sm" offset="inset-1" />

          <div className="relative z-20">
            <div className="flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-gold-deep font-bold mb-1.5">
              <Crown className="w-4 h-4 text-gold-DEFAULT" />
              <span>Royal Personal Invitation For</span>
              <Crown className="w-4 h-4 text-gold-DEFAULT" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-espresso tracking-wide">
              {fullGuestDisplay}
            </h2>

            {guestProfile.party && (
              <div className="mt-2.5">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full gold-foil-bg text-ivory-pearl text-xs font-sans uppercase tracking-[0.18em] font-bold shadow">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFE8AD]" />
                  {guestProfile.party}
                </span>
              </div>
            )}

            {guestProfile.note && (
              <p className="mt-3 font-serif italic text-base sm:text-lg text-espresso-muted font-medium max-w-md mx-auto">
                “{guestProfile.note}”
              </p>
            )}
          </div>
        </div>

        {/* Parental Blessing Invitation Statement */}
        <p className="relative z-20 font-serif text-lg sm:text-xl md:text-2xl text-espresso font-medium max-w-2xl mx-auto leading-relaxed mb-8">
          {weddingData.invitationCopy.parentalBlessing}
        </p>

        {/* Centerpiece: Bride & Groom Portrait PNG in Ornate Mughal Gold Arch + Love Birds */}
        <div className="relative z-20 my-8 flex flex-col items-center justify-center">
          {/* Top Love Birds Pair */}
          <LoveBirdsPair size="lg" showHeart={true} className="-mb-5 z-20" />

          {/* Arch Portrait Frame */}
          <div className="relative group">
            <div
              className="absolute -inset-4 rounded-t-full rounded-b-3xl animate-halo pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(143,94,12,0.38) 0%, rgba(143,94,12,0) 70%)',
              }}
            />

            <div className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-t-full rounded-b-3xl p-2.5 gold-foil-bg shadow-royal-lg">
              <div className="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden bg-ivory-pearl border-2 border-ivory-pearl relative flex items-center justify-center">
                <img
                  src={imgSrc}
                  alt="Ehsan Ali & Nadia Asghar Royal Wedding Portrait"
                  onError={() => {
                    if (imgSrc !== '/couple-portrait.png') {
                      setImgSrc('/couple-portrait.png');
                    }
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/35 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 inset-x-0 text-center">
                  <span className="inline-block px-5 py-1 rounded-full gold-foil-bg font-script text-xl sm:text-2xl text-ivory-pearl shadow-lg border border-ivory-pearl/60">
                    Ehsan &amp; Nadia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Groom & Bride Lineage Cards with Premium 4-Corner Ornaments */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-11 gap-6 items-center max-w-4xl mx-auto my-10">
          {/* Groom Card */}
          <div className="relative md:col-span-5 p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-ivory-pearl to-ivory-warm border-2 border-gold-DEFAULT/70 shadow-royal overflow-hidden">
            <PremiumBoxCorners size="sm" offset="inset-1.5" />

            <div className="relative z-20">
              <span className="inline-block px-4 py-1 rounded-full gold-foil-bg text-ivory-pearl text-[11px] font-sans uppercase tracking-[0.22em] font-bold mb-3 shadow-sm">
                The Groom
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold gold-foil-text tracking-wide">
                {weddingData.groom.name}
              </h3>
              <div className="my-3 flex items-center justify-center gap-2 text-gold-DEFAULT">
                <span className="h-[1.5px] w-8 bg-gold-DEFAULT/60" />
                <Heart className="w-3.5 h-3.5 fill-gold-DEFAULT" />
                <span className="h-[1.5px] w-8 bg-gold-DEFAULT/60" />
              </div>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-deep font-bold">
                {weddingData.groom.shortPrefix} ({weddingData.groom.lineagePrefix})
              </p>
              <p className="font-display text-lg sm:text-xl font-bold text-espresso mt-1">
                {weddingData.groom.fatherName}
              </p>
              <p className="font-serif italic text-sm text-espresso-muted font-medium mt-2">
                {weddingData.groom.residence}
              </p>
            </div>
          </div>

          {/* Center Sacred Union Emblem */}
          <div className="md:col-span-1 flex flex-col items-center justify-center py-2">
            <div className="w-16 h-16 rounded-full gold-foil-bg text-ivory-pearl flex items-center justify-center shadow-royal-lg border-2 border-ivory-pearl">
              <span className="font-script text-3xl leading-none pt-1">weds</span>
            </div>
          </div>

          {/* Bride Card */}
          <div className="relative md:col-span-5 p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-ivory-pearl to-ivory-warm border-2 border-gold-DEFAULT/70 shadow-royal overflow-hidden">
            <PremiumBoxCorners size="sm" offset="inset-1.5" />

            <div className="relative z-20">
              <span className="inline-block px-4 py-1 rounded-full gold-foil-bg text-ivory-pearl text-[11px] font-sans uppercase tracking-[0.22em] font-bold mb-3 shadow-sm">
                The Bride
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold gold-foil-text tracking-wide">
                {weddingData.bride.name}
              </h3>
              <div className="my-3 flex items-center justify-center gap-2 text-gold-DEFAULT">
                <span className="h-[1.5px] w-8 bg-gold-DEFAULT/60" />
                <Heart className="w-3.5 h-3.5 fill-gold-DEFAULT" />
                <span className="h-[1.5px] w-8 bg-gold-DEFAULT/60" />
              </div>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-deep font-bold">
                {weddingData.bride.shortPrefix} ({weddingData.bride.lineagePrefix})
              </p>
              <p className="font-display text-lg sm:text-xl font-bold text-espresso mt-1">
                {weddingData.bride.fatherName}
              </p>
              <p className="font-serif italic text-sm text-espresso-muted font-medium mt-2">
                {weddingData.bride.residence}
              </p>
            </div>
          </div>
        </div>

        <RoyalDivider />

        {/* Dates Summary & Countdown Timer */}
        <div className="relative z-20 mt-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-2.5 rounded-full bg-ivory-warm border-2 border-gold-DEFAULT/60 text-xs sm:text-sm font-sans font-bold text-espresso mb-6 shadow-sm">
            <span className="inline-flex items-center gap-1.5 text-gold-deep">
              <Calendar className="w-4 h-4" />
              19, 20 &amp; 21 December 2026
            </span>
            <span className="text-gold-DEFAULT">•</span>
            <span className="inline-flex items-center gap-1.5 text-espresso-muted">
              <MapPin className="w-4 h-4 text-gold-deep" />
              Tehsil Jaranwala, District Faisalabad
            </span>
          </div>

          {/* 4-Box Countdown with Premium Corners */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-5 max-w-xl mx-auto">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="relative p-3.5 sm:p-5 rounded-2xl bg-gradient-to-b from-ivory-pearl to-ivory-warm border-2 border-gold-DEFAULT/65 shadow-sm overflow-hidden"
              >
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.18em] text-gold-deep mt-1 font-bold">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
