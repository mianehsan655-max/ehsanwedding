import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Crown,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Heart,
  Lock,
  BookOpen,
  Calendar,
  Download,
  Check,
} from 'lucide-react';
import { WEDDING_DATA } from './data/weddingData';
import {
  AmbientGoldPetalCanvas,
  LoveBirdsPair,
  RoyalDivider,
  PremiumBoxCorners,
  FlowerSprinkleAndFireworksOverlay,
} from './components/BotanicalAndBirdsArt';
import { SealedEnvelopeGate } from './components/SealedEnvelopeGate';
import { QuranRecitationSection } from './components/QuranRecitationSection';
import { CouplePortraitSection } from './components/CouplePortraitSection';
import { EventsTimelineSection } from './components/EventsTimelineSection';
import { HostStudioDrawer, buildPersonalizedUrl } from './components/HostStudioDrawer';
import {
  verifyGuestParams,
  saveLockedGuestSession,
  getLockedGuestSession,
  isVerifiedHostDevice,
  verifyAndUnlockHostPasscode,
  triggerAutoCalendarWithReminders,
  downloadPersonalizedInvitationImage,
} from './utils/calendarAndCardExport';

const STORAGE_KEY_GUESTS = 'ehsan_nadia_royal_guests_v1';

/**
 * Parses URL parameters and enforces the Guest URL Lock:
 * - If a guest opens their personalized URL (?guest=...), we lock their browser to that custom URL.
 * - If the guest later removes the custom URL parameters to visit the main URL (/), or tampers
 *   with the guest name in the URL (invalid &sig=), we automatically force/restore their locked
 *   custom URL back into the browser address bar and prevent them from accessing Host Mode.
 */
function parseAndEnforceGuestUrlLock() {
  const params = new URLSearchParams(window.location.search);
  const rawGuestName = params.get('guest') || '';
  const hasGuestParam = Boolean(rawGuestName && rawGuestName.trim());
  const title = params.get('title') ?? (hasGuestParam ? 'Respected' : 'Honored');
  const party = params.get('party') ?? 'With Family';
  const eventsRaw = params.get('events');
  const events = eventsRaw
    ? eventsRaw.split(',').filter(Boolean)
    : ['mehndi', 'barat', 'waleema'];
  const note =
    params.get('note') ||
    'Your gracious presence and heartfelt prayers will be our greatest blessing.';
  const img = params.get('img') || '/couple-portrait.png';
  const sig = params.get('sig') || '';
  const isExplicitHostParam = params.get('mode') === 'host' || params.get('admin') === '2026';

  const existingLockedSession = getLockedGuestSession();
  const hostVerified = isVerifiedHostDevice();

  // Case 1: Guest visits with a valid personalized URL (?guest=...)
  if (hasGuestParam) {
    const isSignatureValid = verifyGuestParams({
      title,
      name: rawGuestName,
      party,
      events,
      sig,
    });

    // If the guest tampered with the URL parameters (invalid signature) and has a previously locked session,
    // revert them immediately to their original locked custom URL!
    if (!isSignatureValid && existingLockedSession && !hostVerified) {
      window.history.replaceState(
        {},
        '',
        window.location.pathname + existingLockedSession.searchString
      );
      return {
        guestProfile: existingLockedSession.guestData,
        portraitUrl: img,
        isExplicitHostParam: false,
        canSeeHostControls: false,
      };
    }

    const validGuestProfile = {
      title,
      name: rawGuestName.trim(),
      party,
      events,
      note,
    };

    // Lock this guest's browser to their custom URL so they cannot strip the URL later
    if (!hostVerified) {
      const canonicalUrl = buildPersonalizedUrl({
        baseUrl: window.location.origin + window.location.pathname,
        title: validGuestProfile.title,
        name: validGuestProfile.name,
        party: validGuestProfile.party,
        events: validGuestProfile.events,
        note: validGuestProfile.note,
        portraitUrl: img,
      });
      const canonicalSearch = new URL(canonicalUrl).search;
      saveLockedGuestSession(validGuestProfile, canonicalSearch);
      window.history.replaceState({}, '', window.location.pathname + canonicalSearch);
    }

    return {
      guestProfile: validGuestProfile,
      portraitUrl: img,
      isExplicitHostParam: false,
      canSeeHostControls: hostVerified && isExplicitHostParam,
    };
  }

  // Case 2: User removed the custom URL and tried to visit the main root URL (/)!
  // If they have a locked guest session on their device (and are not the verified Host),
  // force them right back to their custom URL!
  if (existingLockedSession && !hostVerified && !isExplicitHostParam) {
    window.history.replaceState(
      {},
      '',
      window.location.pathname + existingLockedSession.searchString
    );
    return {
      guestProfile: existingLockedSession.guestData,
      portraitUrl: img,
      isExplicitHostParam: false,
      canSeeHostControls: false,
    };
  }

  // Case 3: Visiting the main root URL (https://ehsanwedsnadia.vercel.app/) without ?guest=
  // Show Host Mode on the main URL as long as this browser is not locked to a guest invitation!
  const allowHost = hostVerified || !existingLockedSession;

  return {
    guestProfile: {
      title: 'Honored',
      name: 'Guest & Family',
      party: 'With Family',
      events: ['mehndi', 'barat', 'waleema'],
      note,
    },
    portraitUrl: img,
    isExplicitHostParam,
    canSeeHostControls: allowHost,
  };
}

// Gentle celebratory firework sound effect using Web Audio API while fireworks burst
function playFireworksCelebrationSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const burstTimes = [0.15, 0.65, 1.15, 1.65, 2.15, 2.65, 3.1];
    burstTimes.forEach((delay, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freqs = [523.25, 659.25, 783.99, 1046.5, 880, 987.77, 1174.66];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqs[idx % freqs.length], ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(
        freqs[idx % freqs.length] * 1.45,
        ctx.currentTime + delay + 0.35
      );

      gain.gain.setValueAtTime(0.001, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + delay + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.48);
    });
  } catch {
    // Ignore if audio context is restricted
  }
}

export default function App() {
  const initialUrlState = parseAndEnforceGuestUrlLock();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showFireworksBanner, setShowFireworksBanner] = useState(false);
  const [isDownloadingCard, setIsDownloadingCard] = useState(false);
  const [cardDownloaded, setCardDownloaded] = useState(false);

  const [guestProfile, setGuestProfile] = useState(initialUrlState.guestProfile);
  const [portraitUrl, setPortraitUrl] = useState(initialUrlState.portraitUrl);
  const [isHostSession, setIsHostSession] = useState(initialUrlState.canSeeHostControls);
  const [isHostDrawerOpen, setIsHostDrawerOpen] = useState(
    initialUrlState.canSeeHostControls && initialUrlState.isExplicitHostParam
  );

  // Listen to popstate / URL tampering attempts while the page is open
  useEffect(() => {
    const handlePopState = () => {
      const enforced = parseAndEnforceGuestUrlLock();
      setGuestProfile(enforced.guestProfile);
      setIsHostSession(enforced.canSeeHostControls);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Saved Guests in LocalStorage for Host Mode
  const [savedGuests, setSavedGuests] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_GUESTS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return WEDDING_DATA.defaultSavedGuests;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GUESTS, JSON.stringify(savedGuests));
    } catch {
      // ignore storage errors
    }
  }, [savedGuests]);

  // Quranic Audio Recitation State
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recitationStage, setRecitationStage] = useState('bismillah');
  const audioRef = useRef(null);
  const fireworksTimerRef = useRef(null);

  const speakArabicFallback = useCallback((arabicText) => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(arabicText);
        utter.lang = 'ar-SA';
        utter.rate = 0.82;
        utter.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utter);
      } catch {
        setIsPlaying(false);
      }
    }
  }, []);

  const playRecitationSequence = useCallback(
    (verseIdx = activeVerseIndex, startFromBismillah = true) => {
      const verse = WEDDING_DATA.quranVerses[verseIdx] || WEDDING_DATA.quranVerses[0];
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      const audio = audioRef.current;
      audio.muted = isMuted;

      const playAudioWithFallback = (urls, onEndedCallback, fallbackArabicText) => {
        let currentUrlIndex = 0;

        const tryNextUrl = () => {
          if (currentUrlIndex >= urls.length) {
            speakArabicFallback(fallbackArabicText);
            return;
          }
          audio.src = urls[currentUrlIndex];
          audio.onended = onEndedCallback;
          audio.onerror = () => {
            currentUrlIndex += 1;
            tryNextUrl();
          };
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch(() => {
                currentUrlIndex += 1;
                tryNextUrl();
              });
          }
        };

        tryNextUrl();
      };

      if (startFromBismillah) {
        setRecitationStage('bismillah');
        playAudioWithFallback(
          verse.bismillahAudioUrls,
          () => {
            setRecitationStage('verse');
            playAudioWithFallback(
              verse.verseAudioUrls,
              () => {
                setIsPlaying(false);
              },
              verse.arabic
            );
          },
          verse.bismillah
        );
      } else {
        setRecitationStage('verse');
        playAudioWithFallback(
          verse.verseAudioUrls,
          () => {
            setIsPlaying(false);
          },
          verse.arabic
        );
      }
    },
    [activeVerseIndex, isMuted, speakArabicFallback]
  );

  // Triggered when the guest clicks "Open Royal Invitation"
  const handleOpenInvitation = () => {
    // 1. Unlock HTML5 Audio element immediately on user click so it can play automatically after fireworks finish
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const verse = WEDDING_DATA.quranVerses[activeVerseIndex] || WEDDING_DATA.quranVerses[0];
    audioRef.current.src = verse.bismillahAudioUrls[0];
    audioRef.current.load();

    // 2. Automatically add invited wedding events to the guest's mobile/computer calendar
    // with TWO automatic reminders: 7 days before (-P7D) and 1 day before (-P1D)
    triggerAutoCalendarWithReminders({
      events: WEDDING_DATA.events,
      invitedEventIds: guestProfile.events,
      guestProfile,
      weddingData: WEDDING_DATA,
    });

    // 3. Open the Royal Curtains + Start Flower Sprinkle + Launch 3.8s Fireworks Show
    setIsOpening(true);
    setShowCelebration(true);
    setShowFireworksBanner(true);
    playFireworksCelebrationSound();

    // 4. Part the curtains completely at 1.4s while fireworks & flower shower continue overhead
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1450);

    // 5. Right after the fireworks complete (~3.8s), start playing the Quranic Tilawat!
    if (fireworksTimerRef.current) clearTimeout(fireworksTimerRef.current);
    fireworksTimerRef.current = setTimeout(() => {
      setShowFireworksBanner(false);
      playRecitationSequence(activeVerseIndex, true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 1200);
    }, 3800);
  };

  const handleDownloadCardImage = async () => {
    if (isDownloadingCard) return;
    setIsDownloadingCard(true);
    try {
      await downloadPersonalizedInvitationImage({
        guestProfile,
        weddingData: WEDDING_DATA,
        portraitUrl,
      });
      setCardDownloaded(true);
      setTimeout(() => setCardDownloaded(false), 3000);
    } finally {
      setIsDownloadingCard(false);
    }
  };

  const handleHostMonogramUnlock = () => {
    if (isHostSession) {
      setIsHostDrawerOpen(true);
      return;
    }
    const pin = window.prompt('Enter Host PIN to access Host Mode:');
    if (pin && verifyAndUnlockHostPasscode(pin)) {
      setIsHostSession(true);
      setIsHostDrawerOpen(true);
    }
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) {
      playRecitationSequence(activeVerseIndex, true);
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      if (audioRef.current.src && !audioRef.current.ended) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => playRecitationSequence(activeVerseIndex, true));
      } else {
        playRecitationSequence(activeVerseIndex, true);
      }
    }
  };

  const handleReplay = () => {
    playRecitationSequence(activeVerseIndex, true);
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
  };

  const handleSelectVerse = (idx) => {
    setActiveVerseIndex(idx);
    playRecitationSequence(idx, false);
  };

  const handleApplyGuestPreview = (newGuest) => {
    setGuestProfile({
      title: newGuest.title,
      name: newGuest.name,
      party: newGuest.party,
      events: newGuest.events || ['mehndi', 'barat', 'waleema'],
      note: newGuest.note || '',
    });

    const updatedUrl = buildPersonalizedUrl({
      baseUrl: window.location.origin + window.location.pathname,
      title: newGuest.title,
      name: newGuest.name,
      party: newGuest.party,
      events: newGuest.events,
      note: newGuest.note,
      portraitUrl,
    });
    window.history.replaceState({}, '', updatedUrl);
  };

  const handleSaveGuest = (guestObj) => {
    setSavedGuests((prev) => [guestObj, ...prev]);
  };

  const handleDeleteGuest = (id) => {
    setSavedGuests((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="min-h-screen relative selection:bg-gold-DEFAULT/25">
      {/* Ambient Floating Gold Dust & Ivory Blossom Petals */}
      <AmbientGoldPetalCanvas />

      {/* Flower Sprinkle & Royal Fireworks Celebration Overlay on Invitation Open */}
      <FlowerSprinkleAndFireworksOverlay
        active={showCelebration}
        showFireworksBanner={showFireworksBanner}
      />

      {/* Step 1: Royal Animated Curtains + Golden Embossed Wax Seal + Bride & Groom Cameos */}
      <SealedEnvelopeGate
        isOpen={isOpen}
        isOpening={isOpening}
        onOpenInvitation={handleOpenInvitation}
        guestProfile={guestProfile}
        weddingData={WEDDING_DATA}
        portraitUrl={portraitUrl}
        isHostSession={isHostSession}
        onOpenHostMode={() => {
          verifyAndUnlockHostPasscode('2026');
          setIsHostSession(true);
          setIsHostDrawerOpen(true);
        }}
      />

      {/* Sticky Luxury Top Bar — Mobile Optimized */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-ivory-pearl/90 border-b-2 border-gold-DEFAULT/55 shadow-sm">
        <div className="max-w-6xl mx-auto px-2.5 sm:px-8 min-h-[3.75rem] py-1.5 flex items-center justify-between gap-1.5 sm:gap-3">
          {/* Couple Monogram Crest */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
            <div
              onDoubleClick={handleHostMonogramUnlock}
              title="Ehsan Ali & Nadia Asghar"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full gold-foil-bg text-ivory-pearl font-display font-bold text-xs sm:text-sm flex items-center justify-center shadow cursor-pointer shrink-0"
            >
              {WEDDING_DATA.monogram}
            </div>
            <div className="hidden sm:block truncate">
              <div className="font-display text-sm font-bold text-espresso tracking-wide truncate">
                Ehsan Ali &amp; Nadia Asghar
              </div>
              <div className="text-[11px] font-sans text-espresso-muted font-semibold truncate">
                Dec 19–21, 2026 • Jaranwala, Faisalabad
              </div>
            </div>
          </div>

          {/* Quick Section Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-sans uppercase tracking-[0.18em] text-espresso font-bold">
            <a
              href="#sacred-nikkah-verses"
              className="hover:text-gold-deep transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-gold-DEFAULT" />
              <span>Nikkah Tilawat</span>
            </a>
            <a
              href="#couple-portrait"
              className="hover:text-gold-deep transition flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-gold-DEFAULT" />
              <span>Bride &amp; Groom</span>
            </a>
            <a
              href="#wedding-events"
              className="hover:text-gold-deep transition flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-gold-DEFAULT" />
              <span>Shahi Events (19–21 Dec)</span>
            </a>
          </nav>

          {/* Right Action Controls — Mobile-Optimized Sizing & Spacing */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Download Personalized Invitation Card Image to Gallery */}
            <button
              type="button"
              onClick={handleDownloadCardImage}
              disabled={isDownloadingCard}
              className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl gold-foil-bg text-ivory-pearl font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow hover:opacity-95 transition flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"
              title="Download Personalized Invitation Card Image to Gallery"
            >
              {cardDownloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#FFF3D1] shrink-0" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#FFF3D1] shrink-0" />
                  <span>{isDownloadingCard ? 'Saving...' : 'Save Card'}</span>
                </>
              )}
            </button>

            {/* Curtain Cover Button */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsOpening(false);
              }}
              className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-ivory-warm border-2 border-gold-DEFAULT/65 text-espresso font-sans text-[11px] sm:text-xs font-bold hover:bg-gold-champagne transition flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"
              title="Close & View Royal Curtains Cover"
            >
              <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-deep shrink-0" />
              <span className="hidden xs:inline sm:inline">Cover</span>
            </button>

            {/* ONLY THE VERIFIED HOST CAN SEE THIS BUTTON */}
            {isHostSession && (
              <button
                type="button"
                onClick={() => {
                  verifyAndUnlockHostPasscode('2026');
                  setIsHostDrawerOpen(true);
                }}
                className="px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl gold-foil-bg text-ivory-pearl font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow hover:opacity-95 transition flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"
              >
                <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFE8AD] shrink-0" />
                <span>Host</span>
                <span className="hidden sm:inline">Mode</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Unfolded Royal Wedding Invitation Content */}
      <main className="relative z-20 pb-24">
        {/* 1. Sacred Quranic Verses & Nikkah Calligraphy Recitation */}
        <QuranRecitationSection
          verses={WEDDING_DATA.quranVerses}
          nikkahDua={WEDDING_DATA.nikkahDua}
          activeVerseIndex={activeVerseIndex}
          onSelectVerse={handleSelectVerse}
          isPlaying={isPlaying}
          recitationStage={recitationStage}
          onTogglePlay={handleTogglePlay}
          onReplay={handleReplay}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        {/* 2. Bride & Groom Portrait PNG, Personalized Guest Plaque, Lineage & Countdown */}
        <div id="couple-portrait">
          <CouplePortraitSection
            weddingData={WEDDING_DATA}
            guestProfile={guestProfile}
            portraitUrl={portraitUrl}
          />
        </div>

        {/* 3. Three-Day Royal Wedding Events Itinerary in Compact Mughal Royal Doors */}
        <EventsTimelineSection
          events={WEDDING_DATA.events}
          invitedEventIds={guestProfile.events}
        />

        {/* 4. Royal Family Closing & Blessings Footer with Premium 4-Corner Filigree */}
        <footer className="mx-auto max-w-5xl px-4 sm:px-8 pt-8 pb-12 text-center">
          <div className="relative ivory-card-surface gold-border-double rounded-3xl p-8 sm:p-14 overflow-hidden">
            <PremiumBoxCorners size="lg" offset="inset-2" />

            <div className="relative z-20">
              <div className="flex justify-center mb-2">
                <LoveBirdsPair size="md" showHeart={true} />
              </div>

              <p className="font-serif italic text-lg sm:text-xl text-espresso font-medium max-w-2xl mx-auto leading-relaxed">
                “{WEDDING_DATA.invitationCopy.royalClosing}”
              </p>

              <RoyalDivider />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto my-6">
                <div className="relative p-5 rounded-2xl bg-ivory-warm border-2 border-gold-DEFAULT/65 overflow-hidden shadow-sm">
                  <PremiumBoxCorners size="sm" offset="inset-1" />
                  <div className="relative z-20">
                    <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-gold-deep font-bold">
                      From the Groom’s Family
                    </div>
                    <div className="font-display text-lg font-bold text-espresso mt-1">
                      Mian Muhammad Anwar &amp; Family
                    </div>
                    <div className="font-serif text-sm text-espresso-muted font-medium mt-0.5">
                      Chak No. 655 GB Parkash Nagar, Tehsil Jaranwala
                    </div>
                  </div>
                </div>

                <div className="relative p-5 rounded-2xl bg-ivory-warm border-2 border-gold-DEFAULT/65 overflow-hidden shadow-sm">
                  <PremiumBoxCorners size="sm" offset="inset-1" />
                  <div className="relative z-20">
                    <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-gold-deep font-bold">
                      From the Bride’s Family
                    </div>
                    <div className="font-display text-lg font-bold text-espresso mt-1">
                      Mian Muhammad Asghar &amp; Family
                    </div>
                    <div className="font-serif text-sm text-espresso-muted font-medium mt-0.5">
                      Tehsil Jaranwala, District Faisalabad
                    </div>
                  </div>
                </div>
              </div>

              {isHostSession && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsHostDrawerOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full gold-foil-bg text-ivory-pearl font-sans text-xs font-bold uppercase tracking-[0.18em] shadow-royal hover:opacity-95 transition"
                  >
                    <Crown className="w-4 h-4 text-[#FFE8AD]" />
                    <span>Open Host Guest Manager &amp; Custom Links</span>
                  </button>
                </div>
              )}

              <p className="mt-6 text-xs font-sans uppercase tracking-[0.25em] text-gold-deep font-bold">
                {WEDDING_DATA.hashtag} • Ehsan Ali Weds Nadia Asghar
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Bottom-Right Sacred Quran Audio Controller Pill */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 p-2 pr-4 rounded-full bg-ivory-pearl/95 backdrop-blur-md border-2 border-gold-DEFAULT shadow-royal-lg">
        <button
          type="button"
          onClick={handleTogglePlay}
          className="w-10 h-10 rounded-full gold-foil-bg text-ivory-pearl flex items-center justify-center shadow hover:scale-105 transition"
          title={isPlaying ? 'Pause Quranic Tilawat' : 'Play Quranic Tilawat'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <div className="text-left">
          <div className="text-[11px] font-sans font-bold text-espresso leading-tight">
            {isPlaying ? 'Reciting Nikkah Tilawat' : 'Play Quran Tilawat'}
          </div>
          <div className="text-[10px] font-serif italic text-gold-deep font-semibold">
            Surah Ar-Rum (30:21)
          </div>
        </div>
        <button
          type="button"
          onClick={handleToggleMute}
          className="ml-1 p-1.5 rounded-full text-gold-deep hover:bg-gold-champagne/50 transition"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Host Mode Studio Drawer */}
      <HostStudioDrawer
        isOpen={isHostDrawerOpen}
        onClose={() => setIsHostDrawerOpen(false)}
        weddingData={WEDDING_DATA}
        activeGuest={guestProfile}
        onApplyGuestPreview={handleApplyGuestPreview}
        savedGuests={savedGuests}
        onSaveGuest={handleSaveGuest}
        onDeleteGuest={handleDeleteGuest}
        portraitUrl={portraitUrl}
        onChangePortraitUrl={setPortraitUrl}
        onOpenSealedPreview={() => {
          setIsOpen(false);
          setIsOpening(false);
        }}
      />
    </div>
  );
}
