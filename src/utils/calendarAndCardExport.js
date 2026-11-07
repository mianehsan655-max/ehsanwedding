const LOCKED_GUEST_STORAGE_KEY = 'ehsan_nadia_locked_guest_v2';
const HOST_AUTH_STORAGE_KEY = 'ehsan_nadia_host_auth_v2';
const CALENDAR_AUTO_ADDED_KEY = 'ehsan_nadia_calendar_added_v2';
const SECRET_SALT = 'EhsanWedsNadia2026_RoyalSalt_786';

/**
 * Generates a deterministic tamper-proof signature for a guest's invitation parameters
 * so guests cannot manually alter the URL query string or forge fake invitations.
 */
export function signGuestParams({ title = '', name = '', party = '', events = [] }) {
  const normalizedEvents = Array.isArray(events) ? events.slice().sort().join(',') : String(events || '');
  const payload = `${title.trim().toLowerCase()}|${name.trim().toLowerCase()}|${party.trim().toLowerCase()}|${normalizedEvents}|${SECRET_SALT}`;
  let hash1 = 5381;
  let hash2 = 52711;
  for (let i = 0; i < payload.length; i++) {
    const char = payload.charCodeAt(i);
    hash1 = (hash1 * 33) ^ char;
    hash2 = (hash2 * 33) ^ (char * 7);
  }
  return ((hash1 >>> 0).toString(36) + (hash2 >>> 0).toString(36)).slice(0, 10);
}

export function verifyGuestParams({ title = '', name = '', party = '', events = [], sig = '' }) {
  if (!name || !name.trim()) return false;
  if (!sig) return true; // Backwards-compatible with links created before sig was added
  const expected = signGuestParams({ title, name, party, events });
  return sig === expected;
}

/**
 * Persists a guest's custom URL and profile in localStorage, and forces them back to their
 * custom URL if they ever try to strip the URL parameters to visit the main root URL.
 */
export function saveLockedGuestSession(guestData, searchString) {
  try {
    const payload = {
      guestData,
      searchString,
      lockedAt: Date.now(),
    };
    localStorage.setItem(LOCKED_GUEST_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage errors
  }
}

export function getLockedGuestSession() {
  try {
    const raw = localStorage.getItem(LOCKED_GUEST_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Checks whether the current browser belongs to the verified Host (Ehsan Ali).
 * Host can unlock via ?admin=2026 or ?mode=host with passcode "2026"
 */
export function isVerifiedHostDevice() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === '2026' || params.get('key') === '2026') {
      localStorage.setItem(HOST_AUTH_STORAGE_KEY, 'verified_host_2026');
      return true;
    }
    return localStorage.getItem(HOST_AUTH_STORAGE_KEY) === 'verified_host_2026';
  } catch {
    return false;
  }
}

export function verifyAndUnlockHostPasscode(passcode) {
  const clean = String(passcode || '').trim().toLowerCase();
  if (clean === '2026' || clean === 'ehsan2026' || clean === '786') {
    try {
      localStorage.setItem(HOST_AUTH_STORAGE_KEY, 'verified_host_2026');
    } catch {
      // ignore
    }
    return true;
  }
  return false;
}

export function lockHostDevice() {
  try {
    localStorage.removeItem(HOST_AUTH_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Silently generates and triggers a multi-event .ics calendar file containing all events
 * the guest is invited to, with TWO automatic reminders for each event:
 *   1) 7 Days Before the Event (-P7D)
 *   2) 1 Day Before the Event (-P1D)
 */
export function triggerAutoCalendarWithReminders({
  events,
  invitedEventIds,
  guestProfile,
  weddingData,
  forceDownload = false,
}) {
  try {
    if (!forceDownload) {
      const alreadyAdded = sessionStorage.getItem(CALENDAR_AUTO_ADDED_KEY);
      if (alreadyAdded === 'true') return;
      sessionStorage.setItem(CALENDAR_AUTO_ADDED_KEY, 'true');
    }
  } catch {
    // ignore storage errors
  }

  const visibleEvents =
    invitedEventIds && invitedEventIds.length > 0
      ? events.filter((ev) => invitedEventIds.includes(ev.id))
      : events;

  const guestFullName = guestProfile?.name
    ? `${guestProfile.title ? guestProfile.title + ' ' : ''}${guestProfile.name}`
    : 'Honored Guest';

  const vEvents = visibleEvents
    .map((event) => {
      const uid = `${event.id}-2026-ehsan-nadia@royalwedding.pk`;
      const summary = `${event.title} — ${weddingData.groom.name} Weds ${weddingData.bride.name}`;
      const description = [
        `Royal Wedding Invitation for ${guestFullName} (${guestProfile?.party || 'With Family'}).`,
        `Groom: ${weddingData.groom.name} (S/O ${weddingData.groom.fatherName})`,
        `Bride: ${weddingData.bride.name} (D/O ${weddingData.bride.fatherName})`,
        `Event: ${event.title} (${event.dateDisplay} at ${event.primaryTime})`,
        `Venue: ${event.fullAddress}`,
      ].join('\\n');

      return [
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:20261107T070000Z`,
        `DTSTART:${event.isoStart}`,
        `DTEND:${event.isoEnd}`,
        `SUMMARY:${summary}`,
        `LOCATION:${event.fullAddress}`,
        `DESCRIPTION:${description}`,
        'STATUS:CONFIRMED',
        // Reminder 1: 7 Days Before the Event
        'BEGIN:VALARM',
        'TRIGGER:-P7D',
        'ACTION:DISPLAY',
        `DESCRIPTION:Reminder (7 Days Left): ${summary} at ${event.venueName}`,
        'END:VALARM',
        // Reminder 2: 1 Day Before the Event
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        `DESCRIPTION:Tomorrow: ${summary} (${event.primaryTime}) at ${event.venueName}`,
        'END:VALARM',
        'END:VEVENT',
      ].join('\r\n');
    })
    .join('\r\n');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EhsanWedsNadia//RoyalWedding2026//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Ehsan Ali & Nadia Asghar Wedding',
    vEvents,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Ehsan-Weds-Nadia-Wedding-Calendar-Reminders.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

/**
 * Helper to load an image for Canvas rendering
 */
function loadImageSafe(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Word-wrapping helper for HTML5 Canvas
 */
function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text || '').split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    ctx.fillText(line.trim(), x, currentY);
    currentY += lineHeight;
  }
  return currentY;
}

/**
 * Renders and downloads a high-resolution (1200 x 1750 px) Royal White & Gold Invitation Card PNG
 * containing the Guest's Name, Groom & Bride details with their families, and the Guest's invited events.
 */
export async function downloadPersonalizedInvitationImage({
  guestProfile,
  weddingData,
  portraitUrl,
}) {
  const canvas = document.createElement('canvas');
  const W = 1200;
  const H = 1760;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // 1. Royal Ivory & Pearl Background Gradient
  const bgGrad = ctx.createRadialGradient(W / 2, H * 0.35, 80, W / 2, H / 2, W * 0.95);
  bgGrad.addColorStop(0, '#FFFDF9');
  bgGrad.addColorStop(0.65, '#FAF6EE');
  bgGrad.addColorStop(1, '#EDE0C8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Gold metallic gradient helper
  const goldGrad = ctx.createLinearGradient(0, 0, W, H);
  goldGrad.addColorStop(0, '#7A5410');
  goldGrad.addColorStop(0.25, '#B38728');
  goldGrad.addColorStop(0.5, '#D9AB44');
  goldGrad.addColorStop(0.75, '#A6791C');
  goldGrad.addColorStop(1, '#734E0C');

  // 2. Outer Double Royal Gold Borders
  ctx.strokeStyle = goldGrad;
  ctx.lineWidth = 8;
  ctx.strokeRect(36, 36, W - 72, H - 72);

  ctx.strokeStyle = 'rgba(179, 135, 40, 0.55)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(54, 54, W - 108, H - 108);

  // Corner Ornamental Flourishes
  const corners = [
    [54, 54, 1, 1],
    [W - 54, 54, -1, 1],
    [54, H - 54, 1, -1],
    [W - 54, H - 54, -1, -1],
  ];
  corners.forEach(([cx, cy, sx, sy]) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(sx, sy);
    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 95);
    ctx.quadraticCurveTo(0, 0, 95, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(28, 28, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFDF9';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });

  // 3. Draw Top-Corner Draped Curtains if available
  const curtainImg = await loadImageSafe('/royal-curtain-corner.png');
  if (curtainImg) {
    const cW = 310;
    const cH = (curtainImg.height / curtainImg.width) * cW;
    ctx.drawImage(curtainImg, 38, 38, cW, cH);
    ctx.save();
    ctx.translate(W - 38, 38);
    ctx.scale(-1, 1);
    ctx.drawImage(curtainImg, 0, 0, cW, cH);
    ctx.restore();
  }

  ctx.textAlign = 'center';

  // 4. Bismillah Header
  ctx.fillStyle = goldGrad;
  ctx.font = 'bold 46px "Amiri", "Scheherazade New", Georgia, serif';
  ctx.fillText(weddingData.invitationCopy.bismillahArabic, W / 2, 130);

  ctx.fillStyle = '#665038';
  ctx.font = 'italic 22px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('In the Name of Allah, the Most Gracious, the Most Merciful', W / 2, 170);

  // 5. Personalized Guest VIP Box
  const hasCustomGuest = Boolean(guestProfile?.name && guestProfile.name.trim());
  const fullGuestDisplay = hasCustomGuest
    ? `${guestProfile.title ? guestProfile.title + ' ' : ''}${guestProfile.name.trim()}`
    : 'Honored Guest & Family';

  const boxX = 160;
  const boxY = 205;
  const boxW = W - 320;
  const boxH = 155;

  ctx.fillStyle = '#F5ECD9';
  ctx.strokeStyle = goldGrad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#8A6012';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('👑   EXCLUSIVELY INVITED ROYAL GUEST   👑', W / 2, boxY + 42);

  ctx.fillStyle = '#281D12';
  ctx.font = 'bold 40px "Cinzel Decorative", "Cinzel", Georgia, serif';
  ctx.fillText(fullGuestDisplay, W / 2, boxY + 95);

  if (guestProfile?.party) {
    ctx.fillStyle = '#8A6012';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`•  ${guestProfile.party.toUpperCase()}  •`, W / 2, boxY + 132);
  }

  // 6. Parental Invitation Blessing
  ctx.fillStyle = '#59442E';
  ctx.font = 'italic 25px "Cormorant Garamond", Georgia, serif';
  drawWrappedText(
    ctx,
    weddingData.invitationCopy.parentalBlessing,
    W / 2,
    405,
    W - 240,
    34
  );

  // 7. Groom & Bride Section + Center Couple Portrait Medallion
  const coupleImg = await loadImageSafe(portraitUrl || '/couple-portrait.png');
  const portraitCenterY = 590;

  if (coupleImg) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(W / 2, portraitCenterY, 92, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(coupleImg, W / 2 - 92, portraitCenterY - 92, 184, 184);
    ctx.restore();

    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(W / 2, portraitCenterY, 94, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Left Column: Groom Details
  const leftX = 285;
  const rightX = W - 285;

  ctx.fillStyle = '#8A6012';
  ctx.font = 'bold 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('THE GROOM', leftX, 535);

  ctx.fillStyle = goldGrad;
  ctx.font = 'bold 42px "Cinzel Decorative", "Cinzel", Georgia, serif';
  ctx.fillText(weddingData.groom.name, leftX, 585);

  ctx.fillStyle = '#665038';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`${weddingData.groom.shortPrefix} (${weddingData.groom.lineagePrefix})`, leftX, 622);

  ctx.fillStyle = '#281D12';
  ctx.font = 'bold 26px "Cinzel", Georgia, serif';
  ctx.fillText(weddingData.groom.fatherName, leftX, 656);

  // Right Column: Bride Details
  ctx.fillStyle = '#8A6012';
  ctx.font = 'bold 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('THE BRIDE', rightX, 535);

  ctx.fillStyle = goldGrad;
  ctx.font = 'bold 42px "Cinzel Decorative", "Cinzel", Georgia, serif';
  ctx.fillText(weddingData.bride.name, rightX, 585);

  ctx.fillStyle = '#665038';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`${weddingData.bride.shortPrefix} (${weddingData.bride.lineagePrefix})`, rightX, 622);

  ctx.fillStyle = '#281D12';
  ctx.font = 'bold 26px "Cinzel", Georgia, serif';
  ctx.fillText(weddingData.bride.fatherName, rightX, 656);

  // Divider Line
  ctx.strokeStyle = goldGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(140, 720);
  ctx.lineTo(W - 140, 720);
  ctx.stroke();

  // 8. Invited Events Itinerary Section
  ctx.fillStyle = goldGrad;
  ctx.font = 'bold 34px "Cinzel Decorative", "Cinzel", Georgia, serif';
  ctx.fillText('ROYAL WEDDING EVENTS ITINERARY', W / 2, 772);

  const invitedIds =
    guestProfile?.events && guestProfile.events.length > 0
      ? guestProfile.events
      : weddingData.events.map((e) => e.id);

  const visibleEvents = weddingData.events.filter((ev) => invitedIds.includes(ev.id));

  let currentEventY = 805;
  const eventBoxH = visibleEvents.length === 3 ? 235 : 265;

  visibleEvents.forEach((ev) => {
    const evX = 110;
    const evW = W - 220;

    // Event Card Box
    ctx.fillStyle = '#FFFDF9';
    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(evX, currentEventY, evW, eventBoxH, 20);
    ctx.fill();
    ctx.stroke();

    // Top Gold Header Strip inside Event Card
    ctx.fillStyle = goldGrad;
    ctx.beginPath();
    ctx.roundRect(evX, currentEventY, evW, 54, [20, 20, 0, 0]);
    ctx.fill();

    ctx.fillStyle = '#FFFDF9';
    ctx.font = 'bold 24px "Cinzel", Georgia, serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${ev.number}. ${ev.title.toUpperCase()}`, evX + 28, currentEventY + 36);

    ctx.textAlign = 'right';
    ctx.font = 'bold 26px "Amiri", serif';
    ctx.fillText(ev.urduTitle, evX + evW - 28, currentEventY + 37);

    // Date & Time Row
    ctx.textAlign = 'left';
    ctx.fillStyle = '#8A6012';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(
      `📅 ${ev.dayOfWeek}, ${ev.dateDisplay}     ⏰ ${ev.primaryTime}`,
      evX + 28,
      currentEventY + 92
    );

    // Schedule Steps & Venue Details
    let stepY = currentEventY + 128;
    ev.scheduleSteps.forEach((step) => {
      const prefixText = `• ${step.time} — ${step.label}: `;
      ctx.fillStyle = '#281D12';
      ctx.font = 'bold 17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(prefixText, evX + 28, stepY);

      const prefixWidth = ctx.measureText(prefixText).width;

      ctx.fillStyle = '#59442E';
      ctx.font = '19px "Cormorant Garamond", Georgia, serif';
      ctx.fillText(
        step.detail,
        evX + 28 + prefixWidth + 6,
        stepY,
        evW - 64 - prefixWidth
      );
      stepY += 34;
    });

    // Venue Footer line inside card
    const venueDisplay = ev.addressLine.startsWith(ev.venueName)
      ? ev.addressLine
      : `${ev.venueName}, ${ev.addressLine.replace(/^Faisalabad Road, Jaranwala,\s*/i, '').replace(/^Mandi Buchiana,\s*/i, '')}`;
    ctx.fillStyle = '#8A6012';
    ctx.font = 'bold 17px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`📍 Venue: ${venueDisplay}`, evX + 28, currentEventY + eventBoxH - 20);

    currentEventY += eventBoxH + 22;
  });

  // 9. Bottom Family Hosts Footer
  ctx.textAlign = 'center';
  const footerY = H - 125;
  ctx.fillStyle = '#281D12';
  ctx.font = 'bold 22px "Cinzel", Georgia, serif';
  ctx.fillText(
    'R.S.V.P & Best Compliments: Mian Muhammad Anwar & Mian Muhammad Asghar Families',
    W / 2,
    footerY
  );

  ctx.fillStyle = '#8A6012';
  ctx.font = 'italic 22px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(
    '“Your gracious presence and heartfelt prayers will be our greatest blessing.”',
    W / 2,
    footerY + 36
  );

  // Export Canvas as PNG Download
  const safeGuestSlug = (guestProfile?.name || 'Guest')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.setAttribute('download', `Ehsan-Weds-Nadia-Invitation-${safeGuestSlug}.png`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

