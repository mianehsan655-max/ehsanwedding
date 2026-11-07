import React from 'react';
import { Sparkles, Volume2, Crown } from 'lucide-react';
import {
  LoveBirdsPair,
  PremiumBoxCorners,
} from './BotanicalAndBirdsArt';

/**
 * Golden Embossed Wax Seal SVG Emblem
 * Features realistic 3D metallic gold melted wax with embossed "EN" in the center
 */
function GoldenEmbossedWaxSeal() {
  return (
    <div className="relative inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 select-none">
      <svg
        viewBox="0 0 140 155"
        className="w-full h-full overflow-visible drop-shadow-[0_12px_22px_rgba(110,75,10,0.42)]"
      >
        <defs>
          {/* Realistic 3D Metallic Golden Melted Wax Gradient */}
          <radialGradient id="goldWaxOuter" cx="35%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#FFE89E" />
            <stop offset="32%" stopColor="#D9AC42" />
            <stop offset="68%" stopColor="#9E7118" />
            <stop offset="100%" stopColor="#634307" />
          </radialGradient>
          <radialGradient id="goldWaxInnerWell" cx="62%" cy="65%" r="65%">
            <stop offset="0%" stopColor="#75500A" />
            <stop offset="52%" stopColor="#AD7E20" />
            <stop offset="100%" stopColor="#E3BA54" />
          </radialGradient>
          <linearGradient id="goldWaxRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4C2" />
            <stop offset="48%" stopColor="#C99A32" />
            <stop offset="100%" stopColor="#6E4A08" />
          </linearGradient>
          <linearGradient id="embossedLettersGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9DF" />
            <stop offset="45%" stopColor="#F0C965" />
            <stop offset="100%" stopColor="#8A6012" />
          </linearGradient>
        </defs>

        {/* Twin Hanging Gold Silk Ribbons Under the Wax Seal */}
        <path
          d="M 54 108 L 38 150 L 52 142 L 62 152 L 68 110 Z"
          fill="#9E7118"
          stroke="#FFE89E"
          strokeWidth="1.2"
        />
        <path
          d="M 86 108 L 102 150 L 88 142 L 78 152 L 72 110 Z"
          fill="#7D570F"
          stroke="#FFE89E"
          strokeWidth="1.2"
        />

        {/* Irregular Organic Melted Golden Wax Outer Blob */}
        <path
          d="M 70 10
             C 84 9, 94 16, 105 21
             C 117 27, 126 36, 128 50
             C 130 63, 125 76, 126 88
             C 127 101, 116 113, 104 119
             C 92 125, 81 129, 69 128
             C 56 127, 43 125, 32 117
             C 21 109, 13 98, 12 84
             C 11 70, 15 57, 16 44
             C 17 30, 28 21, 41 16
             C 52 12, 58 11, 70 10 Z"
          fill="url(#goldWaxOuter)"
          stroke="#634307"
          strokeWidth="2"
        />

        {/* Melted Wax Specular Gloss Highlight */}
        <path
          d="M 28 38 C 36 24, 54 18, 72 18"
          stroke="#FFF5C8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <circle cx="114" cy="44" r="3.5" fill="#C4942D" opacity="0.85" />
        <circle cx="24" cy="92" r="4" fill="#7D570F" opacity="0.85" />

        {/* Pressed Stamp Inner Recess Ring */}
        <circle
          cx="70"
          cy="70"
          r="43"
          fill="url(#goldWaxInnerWell)"
          stroke="url(#goldWaxRim)"
          strokeWidth="3.2"
        />

        {/* Subtle Inner Stamp Beaded Rope Ring */}
        <circle
          cx="70"
          cy="70"
          r="37"
          fill="none"
          stroke="#FFF2B8"
          strokeWidth="1.5"
          strokeDasharray="3 2.5"
          opacity="0.85"
        />
      </svg>

      {/* Embossed "EN" Monogram in the Center of the Golden Seal */}
      <div className="absolute inset-0 flex items-center justify-center pb-2.5 pointer-events-none">
        <span
          className="font-display text-2xl sm:text-3xl font-black tracking-[0.12em] select-none"
          style={{
            background: 'linear-gradient(145deg, #FFFDF2 0%, #F5CF70 48%, #8F6310 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter:
              'drop-shadow(0px 2px 2px rgba(65, 42, 3, 0.88)) drop-shadow(0px -1px 1px rgba(255, 250, 215, 0.65))',
          }}
        >
          EN
        </span>
      </div>
    </div>
  );
}

export function SealedEnvelopeGate({
  isOpen,
  isOpening,
  onOpenInvitation,
  guestProfile,
  weddingData,
  portraitUrl,
}) {
  if (isOpen && !isOpening) {
    return null;
  }

  const hasCustomGuest = Boolean(guestProfile.name && guestProfile.name.trim());
  const fullGuestDisplay = hasCustomGuest
    ? `${guestProfile.title ? guestProfile.title + ' ' : ''}${guestProfile.name.trim()}`
    : 'Honored Guest & Family';

  const coupleImg = portraitUrl || '/couple-portrait.png';

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 overflow-y-auto overflow-x-hidden transition-opacity duration-1000 ${
        isOpening ? 'pointer-events-none' : ''
      }`}
      style={{
        background:
          'radial-gradient(circle at 50% 35%, rgba(255, 253, 249, 0.99) 0%, rgba(250, 246, 238, 0.99) 65%, rgba(238, 226, 204, 1) 100%)',
      }}
    >
      {/* Center Royal Invitation Card with Realistic Curtains ONLY in the Top Corners of This Box */}
      <div
        className={`relative z-20 max-w-2xl w-full my-auto mx-2 px-4 pt-6 pb-4 sm:px-10 sm:pt-12 sm:pb-9 ivory-card-surface gold-border-double rounded-3xl shadow-royal-lg text-center overflow-hidden transition-all duration-1000 ${
          isOpening ? 'scale-105 opacity-0 translate-y-4' : 'scale-100 opacity-100'
        }`}
      >
        {/* Top-Left & Top-Right Realistic Half-Covering Corner Curtains Inside the Box */}
        <div
          className={`absolute top-0 left-0 w-32 sm:w-52 md:w-64 z-30 pointer-events-none select-none drop-shadow-[0_10px_18px_rgba(110,75,15,0.28)] ${
            isOpening ? 'corner-curtain-opened-left' : 'corner-curtain-idle-left'
          }`}
        >
          <img
            src="/royal-curtain-corner.png"
            alt=""
            className="w-full h-auto block"
          />
        </div>

        <div
          className={`absolute top-0 right-0 w-32 sm:w-52 md:w-64 z-30 pointer-events-none select-none drop-shadow-[0_10px_18px_rgba(110,75,15,0.28)] ${
            isOpening ? 'corner-curtain-opened-right' : 'corner-curtain-idle-right'
          }`}
        >
          <img
            src="/royal-curtain-corner.png"
            alt=""
            className="w-full h-auto block scale-x-[-1]"
          />
        </div>

        {/* 4-Corner Premium Royal Filigree Ornaments */}
        <PremiumBoxCorners size="md" offset="inset-1.5" />

        <div className="relative z-20">
          {/* Bismillah Header — Full Unclipped Diacritics (zer, zabar, pesh) */}
          <div className="pt-0.5 pb-0.5 overflow-visible">
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-xl sm:text-3xl gold-foil-text font-bold arabic-calligraphy-safe"
            >
              {weddingData.invitationCopy.bismillahArabic}
            </p>
          </div>
          <p className="text-[9px] sm:text-xs font-sans uppercase tracking-[0.22em] text-espresso-muted font-bold">
            The Royal Wedding Celebration Of
          </p>

          {/* Animated Love Birds Crest */}
          <div className="flex justify-center -my-3.5 sm:-my-3">
            <LoveBirdsPair size="sm" showHeart={true} />
          </div>

          {/* Groom & Bride Small Cameo Portraits + Names on the Curtain Cover Step */}
          <div className="mt-1 mb-3 sm:mt-2 sm:mb-5 grid grid-cols-11 gap-1 sm:gap-2 items-center">
            {/* Groom Small Portrait & Lineage */}
            <div className="col-span-5 flex flex-col items-center">
              <div className="relative mb-1.5 sm:mb-2">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full p-1 gold-foil-bg shadow-royal">
                  <div className="w-full h-full rounded-full overflow-hidden bg-ivory-pearl border-2 border-ivory-pearl">
                    <img
                      src={coupleImg}
                      alt={weddingData.groom.name}
                      className="w-full h-full object-cover scale-125"
                      style={{ objectPosition: '28% 22%' }}
                    />
                  </div>
                </div>
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 sm:px-2.5 py-0.5 rounded-full gold-foil-bg text-[8px] sm:text-[9px] font-sans uppercase tracking-widest font-bold whitespace-nowrap shadow">
                  The Groom
                </span>
              </div>
              <h1 className="font-display text-base sm:text-2xl font-bold gold-foil-text tracking-wide mt-0.5 sm:mt-1 py-0.5 leading-tight">
                {weddingData.groom.name}
              </h1>
              <p className="text-[10px] sm:text-xs font-serif italic text-espresso-muted font-medium leading-tight">
                ({weddingData.groom.shortPrefix} {weddingData.groom.fatherName})
              </p>
            </div>

            {/* Center Weds Emblem */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <span className="font-script text-xl sm:text-3xl text-gold-deep font-bold">
                weds
              </span>
            </div>

            {/* Bride Small Portrait & Lineage */}
            <div className="col-span-5 flex flex-col items-center">
              <div className="relative mb-1.5 sm:mb-2">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full p-1 gold-foil-bg shadow-royal">
                  <div className="w-full h-full rounded-full overflow-hidden bg-ivory-pearl border-2 border-ivory-pearl">
                    <img
                      src={coupleImg}
                      alt={weddingData.bride.name}
                      className="w-full h-full object-cover scale-125"
                      style={{ objectPosition: '72% 24%' }}
                    />
                  </div>
                </div>
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 sm:px-2.5 py-0.5 rounded-full gold-foil-bg text-[8px] sm:text-[9px] font-sans uppercase tracking-widest font-bold whitespace-nowrap shadow">
                  The Bride
                </span>
              </div>
              <h1 className="font-display text-base sm:text-2xl font-bold gold-foil-text tracking-wide mt-0.5 sm:mt-1 py-0.5 leading-tight">
                {weddingData.bride.name}
              </h1>
              <p className="text-[10px] sm:text-xs font-serif italic text-espresso-muted font-medium leading-tight">
                ({weddingData.bride.shortPrefix} {weddingData.bride.fatherName})
              </p>
            </div>
          </div>

          {/* Personalized Guest VIP Nameplate with Corner Filigree */}
          <div className="relative mx-auto max-w-md mb-2.5 sm:mb-4 px-4 py-2 sm:px-5 sm:py-3.5 rounded-2xl bg-gradient-to-r from-ivory-warm via-ivory-pearl to-ivory-warm border-2 border-gold-DEFAULT/75 shadow-sm overflow-hidden">
            <PremiumBoxCorners size="sm" offset="inset-0.5" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-gold-deep font-bold mb-0.5">
                <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-DEFAULT" />
                <span>Exclusively Invited</span>
                <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-DEFAULT" />
              </div>
              <p className="font-display text-base sm:text-2xl font-bold text-espresso tracking-wide leading-snug">
                {fullGuestDisplay}
              </p>
              {guestProfile.party && (
                <span className="inline-block mt-0.5 sm:mt-1 px-3 py-0.5 rounded-full gold-foil-bg text-ivory-pearl text-[10px] sm:text-xs font-sans font-semibold shadow-sm">
                  {guestProfile.party}
                </span>
              )}
            </div>
          </div>

          {/* Golden Embossed Wax Seal ("EN") & Open Curtains Button */}
          <div className="flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={onOpenInvitation}
              className="group relative flex flex-col items-center focus:outline-none"
            >
              <div className="transition-transform duration-500 group-hover:scale-105 group-active:scale-95">
                <GoldenEmbossedWaxSeal />
              </div>

              {/* Balanced Rich 22K Gold CTA Bar Below Golden Wax Seal */}
              <div className="mt-1 sm:mt-2 inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full gold-foil-bg text-ivory-pearl font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] shadow-royal-lg group-hover:scale-[1.02] transition-all">
                <Sparkles className="w-4 h-4 text-[#FFF3D1]" />
                <span>Open Wedding Invitation</span>
                <Volume2 className="w-4 h-4 text-[#FFF3D1] animate-pulse" />
              </div>
            </button>

            <p className="mt-1.5 sm:mt-2.5 text-[11px] sm:text-xs font-serif italic text-espresso-muted font-medium">
              Opens Curtains with Floral Shower, Royal Fireworks &amp; Sacred Quranic Tilawat
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
