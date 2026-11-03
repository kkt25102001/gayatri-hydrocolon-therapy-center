/**
 * Gayatri Hydrocolon Therapy Center - NFC Mini App Logic
 * Features: vCard Generation, Language Engine, Theme Toggle, WhatsApp Composer, Share API, Image Lightbox
 */

// Clinic Master Data
const CLINIC_CONFIG = {
  name: "Gayatri Hydrocolon Therapy Center",
  shortName: "Gayatri Hydrocolon",
  phone: "+917600445099", // Primary contact number (User can update anytime)
  displayPhone: "+91 7600 445 099",
  email: "gayatrihydrocolon@gmail.com",
  address: "304, 3rd Floor, One Mavdi complex, Near Bapa Sitaram Chowk, Beside Haridarshan School, Mavdi Pal Road, Mavdi, Rajkot-360004, Gujarat",
  instagramUrl: "https://www.instagram.com/gayatrihydrocolonclinic?utm_source=qr&stkn=dTlnOHdjNmNicGIy",
  mapsUrl: "https://maps.google.com/?q=One+Mavdi+complex+Mavdi+Pal+Road+Rajkot+360004+Gujarat",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14768.423075217143!2d70.7818!3d22.2618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca9e661844b3%3A0xc39f9775f3a033b0!2sMavdi%2C%20Rajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

// State
let currentLang = localStorage.getItem('gayatri_lang') || 'gu'; // Default to Gujarati for Rajkot audience
let currentTheme = localStorage.getItem('gayatri_theme') || 'light';

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  setupEventListeners();
  setupGalleryLightbox();
  updateDynamicLinks();
});

/**
 * Theme Engine (Light / Dark)
 */
function initTheme() {
  if (currentTheme === 'dark' || (!localStorage.getItem('gayatri_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
}

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('gayatri_theme', theme);
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }
}

function toggleTheme() {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

/**
 * Language Engine (Gujarati, Hindi, English)
 */
function initLanguage() {
  setLanguage(currentLang);
}

function setLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  currentLang = lang;
  localStorage.setItem('gayatri_lang', lang);
  document.documentElement.setAttribute('lang', lang);

  // Update active pill button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Apply translations to all DOM elements with data-i18n
  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        el.innerHTML = dict[key];
      }
    }
  });

  // Update Page Title and Meta Description
  if (dict.metaTitle) document.title = dict.metaTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && dict.metaDesc) metaDesc.setAttribute('content', dict.metaDesc);
}

/**
 * Configure Click Events & Listeners
 */
function setupEventListeners() {
  // Theme toggle
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Language selectors
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.target.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });

  // Save Contact (vCard) Buttons
  const saveBtn = document.getElementById('saveContactBtn');
  if (saveBtn) saveBtn.addEventListener('click', downloadVCard);
  const bottomSaveBtn = document.getElementById('bottomSaveBtn');
  if (bottomSaveBtn) bottomSaveBtn.addEventListener('click', downloadVCard);

  // FAQ Accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close others
        document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // Share Card Button
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) shareBtn.addEventListener('click', shareClinicCard);

  // Copy Address Button
  const copyAddrBtn = document.getElementById('copyAddressBtn');
  if (copyAddrBtn) {
    copyAddrBtn.addEventListener('click', () => {
      copyToClipboard(CLINIC_CONFIG.address, 'Address copied to clipboard!');
    });
  }

  // Appointment Form Submission
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleWhatsAppBooking);
  }
}

/**
 * Image Lightbox Modal Setup
 */
function setupGalleryLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxCloseBtn');

  if (!modal || !modalImg) return;

  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const caption = card.querySelector('.gallery-caption h5');
      if (img) {
        modalImg.src = img.src;
        modalCaption.textContent = caption ? caption.textContent : '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/**
 * Populate dynamic contact links across the site
 */
function updateDynamicLinks() {
  const callLinks = document.querySelectorAll('a[href^="tel:"]');
  callLinks.forEach(link => link.setAttribute('href', `tel:${CLINIC_CONFIG.phone}`));

  const whatsappLinks = document.querySelectorAll('.dynamic-wa-link');
  const defaultWaMsg = encodeURIComponent("Hello Gayatri Hydrocolon Therapy Clinic, I would like to enquire about Colon Hydrotherapy consultation.");
  whatsappLinks.forEach(link => {
    link.setAttribute('href', `https://wa.me/${CLINIC_CONFIG.phone.replace(/[^0-9]/g, '')}?text=${defaultWaMsg}`);
  });

  const instaLinks = document.querySelectorAll('.dynamic-insta-link');
  instaLinks.forEach(link => link.setAttribute('href', CLINIC_CONFIG.instagramUrl));

  const mapsLinks = document.querySelectorAll('.dynamic-maps-link');
  mapsLinks.forEach(link => link.setAttribute('href', CLINIC_CONFIG.mapsUrl));

  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => link.setAttribute('href', `mailto:${CLINIC_CONFIG.email}`));

  const displayPhoneSpans = document.querySelectorAll('.clinic-phone-text');
  displayPhoneSpans.forEach(el => el.textContent = CLINIC_CONFIG.displayPhone);
}

/**
 * vCard (.vcf) Generator for NFC Card Tap
 */
function downloadVCard(e) {
  if (e) e.preventDefault();

  const vCardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Therapy Center;Gayatri;Hydrocolon;;',
    'FN:Gayatri Hydrocolon Therapy Center',
    'ORG:Gayatri Hydrocolon Therapy Center - Rajkot',
    'TITLE:Colon Hydrotherapy & Gut Detox Clinic',
    `TEL;TYPE=WORK,VOICE:${CLINIC_CONFIG.phone}`,
    `TEL;TYPE=CELL,VOICE:${CLINIC_CONFIG.phone}`,
    `EMAIL;TYPE=PREF,INTERNET:${CLINIC_CONFIG.email}`,
    `ADR;TYPE=WORK:;;304, 3rd Floor, One Mavdi complex, Near Bapa Sitaram Chowk, Beside Haridarshan School, Mavdi Pal Road;Rajkot;Gujarat;360004;India`,
    `URL:${CLINIC_CONFIG.instagramUrl}`,
    'NOTE:Gayatri Hydrocolon Therapy Center Rajkot. સ્વચ્છ અંદર | સ્વસ્થ બહાર | ખુશહાલ જીવન. A Cleaner You, A Brighter Tomorrow.',
    'CATEGORIES:Healthcare,Clinic,Wellness',
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Gayatri-Hydrocolon-Therapy-Center.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('✅ Contact Card saved to device!');
}

/**
 * WhatsApp Appointment Message Builder
 */
function handleWhatsAppBooking(e) {
  e.preventDefault();
  const name = document.getElementById('bookName').value.trim();
  const phone = document.getElementById('bookPhone').value.trim();
  const date = document.getElementById('bookDate').value;
  const time = document.getElementById('bookTime').value;
  const service = document.getElementById('bookService').value;

  if (!name || !phone) {
    showToast('⚠️ Please enter your name and phone number');
    return;
  }

  let message = '';
  if (currentLang === 'gu') {
    message = `*નમસ્તે ગાયત્રી હાઇડ્રોકોલોન થેરાપી સેન્ટર,*%0A%0Aહું એપોઈન્ટમેન્ટ બુક કરાવવા માંગુ છું:%0A👤 *નામ:* ${encodeURIComponent(name)}%0A📱 *મોબાઇલ:* ${encodeURIComponent(phone)}%0A📅 *તારીખ:* ${encodeURIComponent(date || 'જરૂર મુજબ')}%0A⏰ *સમય:* ${encodeURIComponent(time || 'અનુકૂળતા મુજબ')}%0A🎯 *સારવાર / સેવા:* ${encodeURIComponent(service)}%0A%0Aકૃપા કરીને મારી એપોઈન્ટમેન્ટ કન્ફર્મ કરશો. આભાર!`;
  } else if (currentLang === 'hi') {
    message = `*नमस्ते गायत्री हाइड्रोकोलन थेरेपी सेंटर,*%0A%0Aमैं अपॉइंटमेंट बुक करना चाहता/चाहती हूँ:%0A👤 *नाम:* ${encodeURIComponent(name)}%0A📱 *मोबाइल:* ${encodeURIComponent(phone)}%0A📅 *तारीख:* ${encodeURIComponent(date || 'सुविधानुसार')}%0A⏰ *समय:* ${encodeURIComponent(time || 'सुविधानुसार')}%0A🎯 *सेवा:* ${encodeURIComponent(service)}%0A%0Aकृपया मेरी अपॉइंटमेंट कन्फर्म करें। धन्यवाद!`;
  } else {
    message = `*Hello Gayatri Hydrocolon Therapy Center,*%0A%0AI would like to schedule an appointment:%0A👤 *Name:* ${encodeURIComponent(name)}%0A📱 *Phone:* ${encodeURIComponent(phone)}%0A📅 *Preferred Date:* ${encodeURIComponent(date || 'Flexible')}%0A⏰ *Preferred Time:* ${encodeURIComponent(time || 'Flexible')}%0A🎯 *Health Goal:* ${encodeURIComponent(service)}%0A%0APlease confirm my appointment slot. Thank you!`;
  }

  const cleanPhone = CLINIC_CONFIG.phone.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${message}`;
  window.open(waUrl, '_blank');
}

/**
 * Share NFC Digital Card
 */
async function shareClinicCard() {
  const shareData = {
    title: CLINIC_CONFIG.name,
    text: `${CLINIC_CONFIG.name} - Rajkot. A Cleaner You, A Brighter Tomorrow. Connect with us:`,
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== 'AbortError') {
        copyToClipboard(window.location.href, translations[currentLang].shareSuccessMsg || 'Link copied!');
      }
    }
  } else {
    copyToClipboard(window.location.href, translations[currentLang].shareSuccessMsg || 'Link copied to clipboard!');
  }
}

/**
 * Clipboard Copy Helper
 */
function copyToClipboard(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg || 'Copied to clipboard!');
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const input = document.createElement('textarea');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  showToast(successMsg || 'Copied to clipboard!');
}

/**
 * Toast Notification Popup
 */
let toastTimeout;
function showToast(msg) {
  let toast = document.getElementById('toastMsg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastMsg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
