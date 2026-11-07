import React from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, BookOpen } from 'lucide-react';
import {
  LoveBirdsPair,
  RoyalDivider,
  PremiumBoxCorners,
} from './BotanicalAndBirdsArt';

export function QuranRecitationSection({
  verses,
  nikkahDua,
  activeVerseIndex,
  onSelectVerse,
  isPlaying,
  recitationStage,
  onTogglePlay,
  onReplay,
  isMuted,
  onToggleMute,
}) {
  const currentVerse = verses[activeVerseIndex] || verses[0];

  return (
    <section
      id="sacred-nikkah-verses"
      className="relative mx-auto max-w-5xl px-4 sm:px-8 pt-8 pb-10"
    >
      {/* Ornate Sacred Calligraphy Frame with 4-Corner Premium Filigree */}
      <div className="relative ivory-card-surface gold-border-double rounded-3xl p-6 sm:p-12 md:p-16 text-center overflow-hidden">
        <PremiumBoxCorners size="lg" offset="inset-2" />

        {/* Subtle Background Radial Glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(179,135,40,0.16) 0%, rgba(255,253,249,0) 70%)',
          }}
        />

        {/* Animated Golden Love Birds Above the Sacred Calligraphy */}
        <div className="relative z-20 flex flex-col items-center justify-center mb-3">
          <LoveBirdsPair size="md" showHeart={true} />
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gold-foil-bg text-ivory-pearl text-xs font-sans uppercase tracking-[0.22em] font-bold shadow">
            <Sparkles className="w-3.5 h-3.5 text-[#FFF3D1]" />
            Sacred Quranic Tilawat • Ayah of Nikkah
            <Sparkles className="w-3.5 h-3.5 text-[#FFF3D1]" />
          </span>
        </div>

        {/* Bismillah Calligraphy — Generous Vertical Padding & Line Height so Zer/Zabar/Pesh Never Clip */}
        <div className="relative z-20 my-5 py-2 overflow-visible">
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-3xl sm:text-4xl md:text-5xl gold-foil-text font-bold select-all arabic-calligraphy-safe"
          >
            {currentVerse.bismillah}
          </p>
          <p className="font-serif italic text-espresso-muted text-sm sm:text-base tracking-wide mt-1 font-medium">
            In the Name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Interactive Verse Selector Pills */}
        <div className="relative z-20 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 my-5">
          {verses.map((v, idx) => {
            const active = idx === activeVerseIndex;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onSelectVerse(idx)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 flex items-center gap-2 ${
                  active
                    ? 'gold-foil-bg text-ivory-pearl font-bold shadow-md scale-105'
                    : 'bg-ivory-warm text-espresso font-semibold border border-gold-DEFAULT/55 hover:border-gold-deep'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>
                  {v.surah} ({v.ayahNumber})
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Quranic Nikkah Verse in Illuminated Arabic Calligraphy with Premium Corners */}
        <div className="relative z-20 my-6 px-5 py-8 sm:px-10 sm:py-10 rounded-2xl bg-gradient-to-b from-ivory-pearl via-ivory to-ivory-warm/80 border-2 border-gold-DEFAULT/65 shadow-inner overflow-visible">
          <PremiumBoxCorners size="sm" offset="inset-1" />

          <div className="relative z-20 overflow-visible">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold-deep font-bold">
                {currentVerse.surah} • {currentVerse.ayahNumber} — {currentVerse.title}
              </span>
            </div>

            <div className="py-3 overflow-visible">
              <p
                dir="rtl"
                lang="ar"
                className="font-arabic text-2xl sm:text-3xl md:text-4xl text-espresso font-normal tracking-wide arabic-calligraphy-safe"
                style={{
                  textShadow: '0 2px 10px rgba(179, 135, 40, 0.18)',
                }}
              >
                {currentVerse.arabic}
              </p>
            </div>

            <RoyalDivider className="my-4" />

            {/* Transliteration */}
            <p className="font-serif italic text-sm sm:text-base text-gold-deep font-semibold max-w-2xl mx-auto mb-3 leading-relaxed">
              “{currentVerse.transliteration}”
            </p>

            {/* English Translation */}
            <p className="font-serif text-base sm:text-lg md:text-xl text-espresso font-semibold max-w-2xl mx-auto leading-relaxed">
              {currentVerse.english}
            </p>

            {/* Urdu Translation */}
            {currentVerse.urdu && (
              <div className="pt-3 pb-1 overflow-visible">
                <p
                  dir="rtl"
                  lang="ur"
                  className="font-arabic text-base sm:text-lg text-espresso-muted max-w-2xl mx-auto font-medium arabic-calligraphy-safe"
                >
                  {currentVerse.urdu}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Inline Royal Recitation Audio Player Bar */}
        <div className="relative z-20 mt-6 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-5 py-3.5 rounded-2xl bg-ivory-warm border-2 border-gold-DEFAULT/60 shadow-sm">
          {/* Equalizer Bars */}
          <div className="flex items-end gap-1 h-6 px-1">
            <span
              className={`w-1 rounded-full bg-gold-deep transition-all ${
                isPlaying && !isMuted ? 'eq-bar-1' : 'h-2 opacity-40'
              }`}
            />
            <span
              className={`w-1 rounded-full bg-gold-DEFAULT transition-all ${
                isPlaying && !isMuted ? 'eq-bar-2' : 'h-3 opacity-40'
              }`}
            />
            <span
              className={`w-1 rounded-full bg-gold-deep transition-all ${
                isPlaying && !isMuted ? 'eq-bar-3' : 'h-1.5 opacity-40'
              }`}
            />
            <span
              className={`w-1 rounded-full bg-gold-DEFAULT transition-all ${
                isPlaying && !isMuted ? 'eq-bar-2' : 'h-2.5 opacity-40'
              }`}
            />
          </div>

          <div className="text-left mr-2">
            <div className="text-xs font-sans font-bold text-espresso flex items-center gap-1.5">
              <span>
                {isPlaying
                  ? recitationStage === 'bismillah'
                    ? 'Reciting Bismillah-ir-Rahman-ir-Rahim...'
                    : `Reciting ${currentVerse.surah} (${currentVerse.ayahNumber})...`
                  : 'Sacred Quranic Tilawat Ready'}
              </span>
            </div>
            <div className="text-[11px] font-sans text-espresso-muted font-medium">
              Reciter: {currentVerse.reciter}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onTogglePlay}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl gold-foil-bg text-ivory-pearl text-xs font-sans font-bold shadow hover:opacity-95 transition"
              title={isPlaying ? 'Pause Tilawat' : 'Play Tilawat'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Recite Tilawat</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onReplay}
              className="p-2 rounded-xl bg-ivory-pearl border border-gold-DEFAULT/60 text-gold-deep hover:bg-gold-champagne/60 transition"
              title="Replay from Bismillah"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onToggleMute}
              className="p-2 rounded-xl bg-ivory-pearl border border-gold-DEFAULT/60 text-gold-deep hover:bg-gold-champagne/60 transition"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Prophetic Nikkah Blessing Dua */}
        {nikkahDua && (
          <div className="relative z-20 mt-8 pt-6 border-t border-gold-DEFAULT/35 max-w-2xl mx-auto overflow-visible">
            <p className="text-xs font-sans uppercase tracking-[0.22em] text-gold-deep mb-1 font-bold">
              Prophetic Blessing for the Newlyweds
            </p>
            <div className="py-1 overflow-visible">
              <p
                dir="rtl"
                lang="ar"
                className="font-arabic text-xl sm:text-2xl text-gold-deep font-bold arabic-calligraphy-safe"
              >
                {nikkahDua.arabic}
              </p>
            </div>
            <p className="font-serif italic text-sm sm:text-base text-espresso-muted mt-1 font-medium">
              {nikkahDua.english}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
