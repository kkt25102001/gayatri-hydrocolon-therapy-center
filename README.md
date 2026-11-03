# Gayatri Hydrocolon Therapy Center - NFC Smart Digital Card & Mini Website

> **સ્વચ્છ અંદર | સ્વસ્થ બહાર | ખુશહાલ જીવન**  
> *A Cleaner You, A Brighter Tomorrow*

Designed specifically as a high-performance **NFC Smart Card Mini Website** and **Digital Business Profile** for **Gayatri Hydrocolon Therapy Center** (Rajkot, Gujarat).

---

## 🌟 Key Features

1. **Instant NFC Tap Ready**:
   - Opens instantaneously when a patient or client taps their smartphone against an NFC card or scans a QR code.
   - Mobile-first, app-like experience with bottom quick-navigation bar.

2. **One-Tap Contact Save (`.vcf` / vCard 3.0)**:
   - Direct download button that automatically prompts iPhone (iOS) and Android users to save the clinic's contact card into their phonebook in 1 tap!
   - Includes clinic name, address, email, Instagram, and phone number.

3. **Multi-Language Support (3 Languages)**:
   - 🇬🇯 **Gujarati (ગુજરાતી)** - Native language for Rajkot & Saurashtra audience.
   - 🇮🇳 **Hindi (हिन्दी)** - National language.
   - 🇬🇧 **English** - Professional medical language.
   - Real-time language switching with memory (`localStorage`).

4. **Dark & Light Mode Switcher**:
   - Clean, medical-grade teal and pure white light mode.
   - Sleek oceanic slate and glowing teal dark mode.
   - Remembers user's preference and respects system settings.

5. **Color Combination (Accurate to Logo)**:
   - Primary: Medical Deep Teal (`#00828a`)
   - Water Accent: Cyan / Hydro Blue (`#00a896`, `#0284c7`)
   - Herbal Accent: Fresh Healing Green (`#10b981`)
   - Warm Accent: Golden Sun Ray (`#f59e0b`)
   - Brand Accent: Magenta / Rose (`#d81b60`)

6. **Comprehensive Hydrocolon Therapy Content**:
   - **What is Colon Hydrotherapy?** (Clear scientific & natural explanation).
   - **6 Major Health Benefits**:
     - Chronic Constipation & Acidity Relief
     - Deep Gut Detoxification
     - Weight Loss & Flat Belly
     - Clear, Glowing Skin & Acne Reduction
     - High Energy & Vitality
     - Enhanced Digestion & Nutrient Absorption
   - **6-Step Therapy Process**: Consultation → Private Suite → Sterile Single-Use Kit → Warm Water Infusion → Odorless Closed Elimination → Post-Therapy Guidance.
   - **Why Choose Gayatri Clinic**: 100% disposable kits, medical-grade closed system, certified therapists, separate privacy for men & women.

7. **Interactive Elements**:
   - **Educational Video Section**: Explains colon hydrotherapy safely inside the body.
   - **1-Tap WhatsApp Appointment Generator**: Pre-fills appointment details (Name, Date, Time, Concern).
   - **Interactive FAQ Accordion**: Answers top patient questions.
   - **Location Card**: Full address with 1-click Google Maps launcher & clipboard copy.

8. **Basic SEO & Structured Data**:
   - Open Graph (OG) tags for WhatsApp & Facebook preview cards.
   - Twitter Summary Card tags.
   - Schema.org JSON-LD `MedicalBusiness` structured data for Rajkot local SEO.

---

## 📁 Project Structure

```
gayatri-hydrocolon/
│
├── index.html              # Main NFC mini website
├── README.md               # Documentation & setup guide
│
├── css/
│   └── style.css           # Modern styles, themes, responsive layout
│
├── js/
│   ├── app.js              # Theme engine, vCard generator, WhatsApp booking
│   └── translations.js     # Full 3-language dictionary (GU, HI, EN)
│
└── assets/
    ├── logo.svg            # Full vector logo with text & circular emblem
    └── logo-emblem.svg     # Circular emblem for avatar / favicon
```

---

## ⚙️ How to Update Contact Number & Details

Open `js/app.js` and edit the `CLINIC_CONFIG` object at line 7:

```javascript
const CLINIC_CONFIG = {
  name: "Gayatri Hydrocolon Therapy Center",
  shortName: "Gayatri Hydrocolon",
  phone: "+917600445099",       // <-- Clinic primary contact number
  displayPhone: "+91 7600 445 099",
  email: "gayatrihydrocolon@gmail.com",
  address: "304, 3rd Floor, One Mavdi complex, Near Bapa Sitaram Chowk, Beside Haridarshan School, Mavdi Pal Road, Mavdi, Rajkot-360004, Gujarat",
  instagramUrl: "https://www.instagram.com/gayatrihydrocolonclinic?utm_source=qr&stkn=dTlnOHdjNmNicGIy",
  mapsUrl: "https://maps.google.com/?q=One+Mavdi+complex+Mavdi+Pal+Road+Rajkot+360004+Gujarat"
};
```

---

## 💳 Writing to Your NFC Card

1. Upload this website to any free host (e.g. **GitHub Pages**, **Netlify**, **Vercel**, or your own custom domain like `gayatrihydrocolon.com`).
2. Download a free NFC app on your phone:
   - **NFC Tools** (available on iOS App Store & Android Play Store).
3. In **NFC Tools**:
   - Tap **Write** → **Add a record** → **URL / URI**.
   - Paste your website URL (e.g. `https://yourdomain.com`).
   - Tap **Write / Write to tag** and hold your NFC smart card to the back of your phone.
4. Done! Now anyone who taps your card with their phone will instantly open this mini website!

