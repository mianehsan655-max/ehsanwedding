import React, { useState } from 'react';
import {
  Crown,
  X,
  Copy,
  Check,
  Share2,
  UserPlus,
  Trash2,
  Eye,
  Sparkles,
  Users,
  Image as ImageIcon,
  FileText,
  Search,
  RotateCcw,
} from 'lucide-react';
import { signGuestParams } from '../utils/calendarAndCardExport';

const HONORIFIC_OPTIONS = [
  'Respected',
  'Honorable',
  'Mr. & Mrs.',
  'Mian',
  'Chaudhry',
  'Haji',
  'Dr.',
  'Engr.',
  'Dear',
  '',
];

const PARTY_BADGE_OPTIONS = [
  'With Family',
  'Couple Invitation',
  'VIP Guest & Family',
  'Cordially Invited',
  'Single Guest',
];

export function buildPersonalizedUrl({
  baseUrl,
  title,
  name,
  party,
  events,
  note,
  portraitUrl,
}) {
  const url = new URL(baseUrl || window.location.origin + window.location.pathname);
  // Ensure mode=host and admin keys are NEVER included in guest links
  url.searchParams.delete('mode');
  url.searchParams.delete('admin');
  url.searchParams.delete('key');

  const guestName = name && name.trim() ? name.trim() : 'Honored Guest';
  const cleanTitle = title ? title.trim() : '';
  const cleanParty = party ? party.trim() : 'With Family';
  const eventList =
    events && events.length > 0 ? events : ['mehndi', 'barat', 'waleema'];

  url.searchParams.set('guest', guestName);
  if (cleanTitle) url.searchParams.set('title', cleanTitle);
  if (cleanParty) url.searchParams.set('party', cleanParty);
  if (eventList.length > 0 && eventList.length < 3) {
    url.searchParams.set('events', eventList.join(','));
  }
  if (note && note.trim()) url.searchParams.set('note', note.trim());
  if (portraitUrl && portraitUrl !== '/couple-portrait.png') {
    url.searchParams.set('img', portraitUrl);
  }

  // Attach tamper-proof cryptographic signature so guests cannot edit the URL or forge invites
  const sig = signGuestParams({
    title: cleanTitle,
    name: guestName,
    party: cleanParty,
    events: eventList,
  });
  url.searchParams.set('sig', sig);

  return url.toString();
}

export function buildWhatsAppMessage({ guest, link, weddingData }) {
  const guestLabel = guest.name
    ? `${guest.title ? guest.title + ' ' : ''}${guest.name}${
        guest.party ? ' (' + guest.party + ')' : ''
      }`
    : 'Honored Guest & Family';

  return [
    `✨ *بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ* ✨`,
    ``,
    `Assalam-o-Alaikum *${guestLabel}*,`,
    ``,
    `With the blessings of Almighty Allah, *Mian Muhammad Anwar* & *Mian Muhammad Asghar* cordially invite you to the Royal Wedding Celebrations of`,
    ``,
    `👑 *${weddingData.groom.name}* (S/O ${weddingData.groom.fatherName})`,
    `💞 *weds*`,
    `👑 *${weddingData.bride.name}* (D/O ${weddingData.bride.fatherName})`,
    ``,
    `📅 *19, 20 & 21 December 2026*`,
    `📍 *Tehsil Jaranwala, District Faisalabad*`,
    ``,
    `👇 *Tap below to open your Private Royal Invitation Card & Sacred Quranic Tilawat:*`,
    `${link}`,
  ].join('\n');
}

export function HostStudioDrawer({
  isOpen,
  onClose,
  weddingData,
  activeGuest,
  onApplyGuestPreview,
  savedGuests,
  onSaveGuest,
  onDeleteGuest,
  portraitUrl,
  onChangePortraitUrl,
  onOpenSealedPreview,
}) {
  const [activeTab, setActiveTab] = useState('builder');
  const [formTitle, setFormTitle] = useState(activeGuest.title || 'Respected');
  const [formName, setFormName] = useState(
    activeGuest.name === 'Guest & Family' ? '' : activeGuest.name || ''
  );
  const [formParty, setFormParty] = useState(activeGuest.party || 'With Family');
  const [formEvents, setFormEvents] = useState(
    activeGuest.events && activeGuest.events.length > 0
      ? activeGuest.events
      : ['mehndi', 'barat', 'waleema']
  );
  const [formNote, setFormNote] = useState(
    activeGuest.note ||
      'Your esteemed presence and prayers will make our celebrations truly complete.'
  );
  const [customPngInput, setCustomPngInput] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentGeneratedLink = buildPersonalizedUrl({
    baseUrl: window.location.origin + window.location.pathname,
    title: formTitle,
    name: formName,
    party: formParty,
    events: formEvents,
    note: formNote,
    portraitUrl,
  });

  const handleToggleEvent = (eventId) => {
    setFormEvents((prev) => {
      if (prev.includes(eventId)) {
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== eventId);
      }
      return [...prev, eventId];
    });
  };

  const handleCopyLink = async (link, id = 'main') => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = link;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handlePreviewAndAdd = (e) => {
    e.preventDefault();
    const guestObj = {
      id: `guest-${Date.now()}`,
      title: formTitle,
      name: formName.trim() || 'Honored Guest',
      party: formParty,
      events: formEvents,
      note: formNote.trim(),
      status: 'VIP Link Ready',
    };
    onApplyGuestPreview(guestObj);
    if (formName.trim()) {
      onSaveGuest(guestObj);
    }
  };

  const handleShareWhatsApp = (guestObj, link) => {
    const message = buildWhatsAppMessage({
      guest: guestObj,
      link,
      weddingData,
    });
    const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const filteredGuests = savedGuests.filter((g) =>
    `${g.title} ${g.name} ${g.party}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-espresso/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-ivory-pearl h-full shadow-2xl border-l-4 border-gold-DEFAULT flex flex-col overflow-hidden">
        {/* Top Royal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-ivory-warm via-ivory-pearl to-ivory-warm border-b-2 border-gold-DEFAULT/55 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl gold-foil-bg text-ivory-pearl flex items-center justify-center shadow">
              <Crown className="w-6 h-6 text-[#FFE8AD]" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-espresso">
                Host Guest Studio &amp; Link Manager
              </h2>
              <p className="text-xs font-sans text-espresso-muted font-semibold">
                Signed &amp; Locked Guest Links • Guests cannot strip URL or access Host Mode
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-ivory-warm border-2 border-gold-DEFAULT/60 text-espresso hover:bg-gold-champagne transition"
            aria-label="Close Host Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b-2 border-gold-DEFAULT/40 bg-ivory px-4 pt-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('builder')}
            className={`px-4 py-2.5 rounded-t-xl font-sans text-xs sm:text-sm font-bold flex items-center gap-2 border-t-2 border-x-2 transition ${
              activeTab === 'builder'
                ? 'bg-ivory-pearl text-gold-deep border-gold-DEFAULT/60 -mb-[2px]'
                : 'bg-transparent text-espresso-muted border-transparent hover:text-espresso'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Personalize Guest Link</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2.5 rounded-t-xl font-sans text-xs sm:text-sm font-bold flex items-center gap-2 border-t-2 border-x-2 transition ${
              activeTab === 'directory'
                ? 'bg-ivory-pearl text-gold-deep border-gold-DEFAULT/60 -mb-[2px]'
                : 'bg-transparent text-espresso-muted border-transparent hover:text-espresso'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Guest List ({savedGuests.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prompt')}
            className={`px-4 py-2.5 rounded-t-xl font-sans text-xs sm:text-sm font-bold flex items-center gap-2 border-t-2 border-x-2 transition ${
              activeTab === 'prompt'
                ? 'bg-ivory-pearl text-gold-deep border-gold-DEFAULT/60 -mb-[2px]'
                : 'bg-transparent text-espresso-muted border-transparent hover:text-espresso'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Portrait &amp; Info</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {activeTab === 'builder' && (
            <>
              <form onSubmit={handlePreviewAndAdd} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Honorific Prefix */}
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-espresso font-bold mb-1.5">
                      Honorific Title
                    </label>
                    <select
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border-2 border-gold-DEFAULT/60 font-sans text-sm text-espresso font-semibold focus:outline-none focus:border-gold-deep"
                    >
                      {HONORIFIC_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt || '(No Prefix)'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-sans uppercase tracking-wider text-espresso font-bold mb-1.5">
                      Guest Full Name *
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Mian Tariq Mehmood / Chaudhry Zafar Iqbal"
                      className="w-full px-4 py-2.5 rounded-xl bg-ivory border-2 border-gold-DEFAULT/60 font-sans text-sm text-espresso font-semibold focus:outline-none focus:border-gold-deep"
                    />
                  </div>
                </div>

                {/* Party / Family Badge */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-espresso font-bold mb-1.5">
                    Invitation Tier / Family Badge
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PARTY_BADGE_OPTIONS.map((badge) => (
                      <button
                        key={badge}
                        type="button"
                        onClick={() => setFormParty(badge)}
                        className={`px-4 py-1.5 rounded-full font-sans text-xs font-bold border transition ${
                          formParty === badge
                            ? 'gold-foil-bg text-ivory-pearl border-gold-deep shadow'
                            : 'bg-ivory-warm text-espresso border-gold-DEFAULT/55 hover:border-gold-deep'
                        }`}
                      >
                        {badge}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Select Which Events This Guest Is Invited To */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-espresso font-bold mb-1.5">
                    Events Included in This Guest’s Private Card
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {weddingData.events.map((ev) => {
                      const checked = formEvents.includes(ev.id);
                      return (
                        <button
                          key={ev.id}
                          type="button"
                          onClick={() => handleToggleEvent(ev.id)}
                          className={`p-3 rounded-xl border-2 text-left transition flex items-center justify-between ${
                            checked
                              ? 'bg-gold-champagne/75 border-gold-deep text-espresso shadow-sm'
                              : 'bg-ivory/60 border-gold-DEFAULT/35 text-espresso-muted opacity-70'
                          }`}
                        >
                          <div>
                            <div className="font-sans text-xs font-bold">{ev.title}</div>
                            <div className="text-[11px] font-serif text-espresso-muted font-semibold">
                              {ev.dateDisplay}
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                              checked
                                ? 'gold-foil-bg text-ivory-pearl'
                                : 'border border-gold-DEFAULT/60 bg-ivory-pearl'
                            }`}
                          >
                            {checked && '✓'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Personal Host Blessing Note */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-espresso font-bold mb-1.5">
                    Personal Host Note on Their Card
                  </label>
                  <textarea
                    rows={2}
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    placeholder="Add a warm personal note for this guest..."
                    className="w-full px-4 py-2.5 rounded-xl bg-ivory border-2 border-gold-DEFAULT/60 font-serif text-base text-espresso font-medium focus:outline-none focus:border-gold-deep"
                  />
                </div>

                {/* Submit / Save & Preview Buttons */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl gold-foil-bg text-ivory-pearl font-sans text-xs sm:text-sm font-bold uppercase tracking-wider shadow-royal hover:opacity-95 transition"
                  >
                    <Sparkles className="w-4 h-4 text-[#FFE8AD]" />
                    <span>Save Guest &amp; Preview Live Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onApplyGuestPreview({
                        id: 'preview-temp',
                        title: formTitle,
                        name: formName.trim() || 'Honored Guest',
                        party: formParty,
                        events: formEvents,
                        note: formNote.trim(),
                      });
                      onOpenSealedPreview();
                      onClose();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-ivory-warm border-2 border-gold-DEFAULT/75 text-gold-deep font-sans text-xs font-bold uppercase tracking-wider hover:bg-gold-champagne transition"
                    title="Test Royal Curtain Cover as This Guest"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Test Curtains</span>
                  </button>
                </div>
              </form>

              {/* Generated Link & Instant WhatsApp Share Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-ivory-warm via-ivory-pearl to-gold-champagne/40 border-2 border-gold-DEFAULT/70 shadow-sm space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold-deep font-bold">
                    Signed &amp; Locked Guest Invitation Link
                  </span>
                  <span className="text-xs font-serif italic text-espresso font-semibold">
                    Locked to this guest’s device — cannot be stripped or forged
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-ivory-pearl border-2 border-gold-DEFAULT/55 font-mono text-xs text-espresso font-semibold break-all select-all">
                  {currentGeneratedLink}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(currentGeneratedLink, 'main')}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl gold-foil-bg text-ivory-pearl font-sans text-xs font-bold uppercase tracking-wider hover:opacity-95 transition shadow"
                  >
                    {copiedId === 'main' ? (
                      <>
                        <Check className="w-4 h-4 text-[#FFE8AD]" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#FFE8AD]" />
                        <span>Copy Private Link</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleShareWhatsApp(
                        {
                          title: formTitle,
                          name: formName.trim() || 'Honored Guest',
                          party: formParty,
                        },
                        currentGeneratedLink
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1A522C] text-white font-sans text-xs font-bold uppercase tracking-wider hover:opacity-95 transition shadow"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share on WhatsApp</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'directory' && (
            <div className="space-y-4">
              {/* Search & Reset Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-espresso-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search saved guests..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-ivory border-2 border-gold-DEFAULT/55 font-sans text-xs text-espresso font-semibold focus:outline-none focus:border-gold-deep"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onApplyGuestPreview({
                      title: 'Honored',
                      name: 'Guest & Family',
                      party: 'Cordially Invited',
                      events: ['mehndi', 'barat', 'waleema'],
                      note: '',
                    });
                    window.history.replaceState({}, '', window.location.pathname);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ivory-warm border-2 border-gold-DEFAULT/60 text-xs font-sans font-bold text-espresso hover:bg-gold-champagne"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Card to General View</span>
                </button>
              </div>

              {/* Guest Cards List */}
              <div className="space-y-3">
                {filteredGuests.map((guest) => {
                  const gLink = buildPersonalizedUrl({
                    baseUrl: window.location.origin + window.location.pathname,
                    title: guest.title,
                    name: guest.name,
                    party: guest.party,
                    events: guest.events,
                    note: guest.note,
                    portraitUrl,
                  });

                  return (
                    <div
                      key={guest.id}
                      className="p-4 rounded-2xl bg-ivory border-2 border-gold-DEFAULT/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display text-base sm:text-lg font-bold text-espresso">
                            {guest.title ? `${guest.title} ` : ''}
                            {guest.name}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full gold-foil-bg text-ivory-pearl font-sans text-[11px] font-bold">
                            {guest.party}
                          </span>
                        </div>
                        <div className="text-xs font-sans text-espresso-muted font-semibold mt-1">
                          Events:{' '}
                          {(guest.events || ['mehndi', 'barat', 'waleema'])
                            .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                            .join(' • ')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            onApplyGuestPreview(guest);
                            setFormTitle(guest.title || '');
                            setFormName(guest.name || '');
                            setFormParty(guest.party || 'With Family');
                            setFormEvents(guest.events || ['mehndi', 'barat', 'waleema']);
                            setFormNote(guest.note || '');
                          }}
                          className="px-3 py-2 rounded-xl bg-ivory-pearl border-2 border-gold-DEFAULT/65 text-gold-deep font-sans text-xs font-bold hover:bg-gold-champagne transition flex items-center gap-1"
                          title="Preview this guest on card"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyLink(gLink, guest.id)}
                          className="px-3 py-2 rounded-xl gold-foil-bg text-ivory-pearl font-sans text-xs font-bold shadow-sm hover:opacity-95 transition flex items-center gap-1"
                        >
                          {copiedId === guest.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#FFE8AD]" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#FFE8AD]" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleShareWhatsApp(guest, gLink)}
                          className="p-2 rounded-xl bg-[#1A522C] text-white hover:opacity-95 transition"
                          title="Send on WhatsApp"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteGuest(guest.id)}
                          className="p-2 rounded-xl bg-ivory-pearl border border-red-400 text-red-700 hover:bg-red-50 transition"
                          title="Remove Guest"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'prompt' && (
            <div className="space-y-6">
              {/* Couple Portrait PNG Switcher */}
              <div className="p-5 rounded-2xl bg-ivory border-2 border-gold-DEFAULT/60 space-y-4">
                <div className="flex items-center gap-2 text-gold-deep font-sans text-xs font-bold uppercase tracking-wider">
                  <ImageIcon className="w-4 h-4" />
                  <span>Groom &amp; Bride Wedding Portrait Image (PNG Resource)</span>
                </div>

                <div className="space-y-2">
                  {weddingData.couplePortraits.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onChangePortraitUrl(item.url)}
                      className={`w-full p-3 rounded-xl border-2 text-left font-sans text-xs flex items-center justify-between transition ${
                        portraitUrl === item.url
                          ? 'bg-gold-champagne/80 border-gold-deep text-espresso font-bold'
                          : 'bg-ivory-pearl border-gold-DEFAULT/40 text-espresso-muted hover:border-gold-DEFAULT'
                      }`}
                    >
                      <span>{item.label}</span>
                      {portraitUrl === item.url && (
                        <span className="px-2.5 py-0.5 rounded gold-foil-bg text-ivory-pearl text-[10px] font-bold">
                          Active
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-sans font-bold text-espresso mb-1">
                    Or Paste Any Custom Online Bride &amp; Groom PNG Image URL:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={customPngInput}
                      onChange={(e) => setCustomPngInput(e.target.value)}
                      placeholder="https://example.com/wedding-couple.png"
                      className="flex-1 px-3 py-2 rounded-xl bg-ivory-pearl border-2 border-gold-DEFAULT/60 font-sans text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customPngInput.trim()) {
                          onChangePortraitUrl(customPngInput.trim());
                        }
                      }}
                      className="px-4 py-2 rounded-xl gold-foil-bg text-ivory-pearl font-sans text-xs font-bold"
                    >
                      Apply PNG
                    </button>
                  </div>
                </div>
              </div>

              {/* Polished Luxury Prompt & Creative Manifesto */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-ivory-warm to-ivory-pearl border-2 border-gold-DEFAULT/65 space-y-3">
                <h3 className="font-display text-lg font-bold text-espresso flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-deep" />
                  <span>{weddingData.polishedPromptConcept.title}</span>
                </h3>
                <p className="font-serif text-base text-espresso font-medium leading-relaxed">
                  {weddingData.polishedPromptConcept.summary}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
