# PhysioConnect — UI Screen Specifications (v3 — Simplified Flows)

## The Two Package Flows

### Flow A: Direct Purchase (Patient knows what they want)

```
Browse Therapist → View Profile → Pick Package
→ Enter Concern & Address → Confirm & Pay
→ Package Active → Schedule First Session
```

### Flow B: Post-Consultation Recommendation

```
Browse Therapist → Book Consultation → Consultation Happens
→ Therapist taps "Recommend Package" → Patient gets notification
→ Patient taps Accept → Package Active → Schedule First Session
```

**What's gone from v2:**
- ❌ "Request Package" screen (P5a) — replaced by direct purchase
- ❌ "Request Sent" confirmation (P6a) — no longer needed
- ❌ "Package Offer" negotiation screen (P6b) — replaced by simple accept from notification
- ❌ "Incoming Requests" screen (T3) — no longer needed
- ❌ "requested" and "offered" package statuses — package is either active or not

**What's simpler:**
- Patient picks a package like buying a product — no waiting
- Therapist only "recommends" after a real consultation, not from a request queue
- Package lifecycle: ACTIVE → COMPLETED / EXPIRED (just two end states)

---

## Updated Screen Count

| Role | # | Change from v2 |
|------|:---:|---|
| Shared | 4 | Same |
| Patient | 11 | -3 (removed request/offer negotiation screens) |
| Therapist | 11 | -1 (removed incoming requests screen) |
| Admin | 3 | Same |
| **Total** | **29** | -4 screens eliminated |

---

## Screens Only Showing What Changed

Unchanged screens from v2 are not repeated here. Only new, modified, or replaced screens are listed.

---

# PATIENT SCREENS — Changes

---

### P2. Patient Home Screen (Tab: Home) — Simplified

```
┌──────────────────────────────────┐
│  Good morning, Rahul 👋     [🔔] │
│                                  │
│  ── ACTIVE PACKAGES ───────────  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  🦵 Knee Rehab (ACL)       │  │
│  │  Dr. Kavitha Rao           │  │
│  │                            │  │
│  │  ████████████░░░░ 8/12     │  │
│  │  sessions completed        │  │
│  │                            │  │
│  │  Next session:             │  │
│  │  📅 Tomorrow, 9:00 AM      │  │
│  │  📍 Your home, Kondapur    │  │
│  │                            │  │
│  │  [Schedule Next] [Details] │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  🔙 Lower Back Pain        │  │
│  │  Dr. Suresh Patel          │  │
│  │                            │  │
│  │  ██░░░░░░░░░░░░░░ 1/5     │  │
│  │  sessions completed        │  │
│  │                            │  │
│  │  No session scheduled      │  │
│  │                            │  │
│  │  [Schedule Next] [Details] │  │
│  └────────────────────────────┘  │
│                                  │
│  ── RECOMMENDATIONS ───────────  │
│  (shows only if a therapist has  │
│   recommended a package after    │
│   consultation)                  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  💡 Dr. Ananya Reddy       │  │
│  │  recommended a package     │  │
│  │  for your Shoulder Pain    │  │
│  │                            │  │
│  │  Intensive · 12 sessions   │  │
│  │  ₹9,600                    │  │
│  │                            │  │
│  │  [View & Accept]  [Dismiss]│  │
│  └────────────────────────────┘  │
│                                  │
│  ──────────────────────────────  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  🔍 Find a New Therapist   │  │
│  └────────────────────────────┘  │
│                                  │
├──────────────────────────────────┤
│  🏠 Home  🔍 Search  📦 Packages│
│           📊 Progress  👤 Profile│
└──────────────────────────────────┘
```

**What changed:** "Pending" section with request/offer states is gone. Replaced by a simple "Recommendations" section that only appears when a therapist has recommended a package after consultation. Patient can accept with one tap or dismiss.

---

### P4. Therapist Detail Screen — Simplified Purchase Flow

```
┌──────────────────────────────────┐
│  ←                               │
│                                  │
│         [Large Photo]            │
│                                  │
│  Dr. Kavitha Rao  ✅ Verified    │
│  ⭐ 4.8 (23 reviews)            │
│                                  │
│  Orthopedic · Sports · Post-surg │
│  8 years experience              │
│  🗣️ English, Hindi, Telugu       │
│                                  │
│  ── ABOUT ─────────────────────  │
│  Specialized in sports injury    │
│  rehabilitation and post-surgical│
│  recovery. Evidence-based        │
│  treatment approach.             │
│                                  │
│  ── SERVICE AREAS ─────────────  │
│  📍 Kondapur · Madhapur ·       │
│     Gachibowli · Hitec City     │
│                                  │
│  ── NOT SURE YET? ─────────────  │
│  ┌────────────────────────────┐  │
│  │  📞 Book a Consultation    │  │
│  │                            │  │
│  │  Talk to Dr. Kavitha first │  │
│  │  before committing to a    │  │
│  │  treatment package.        │  │
│  │                            │  │
│  │  ₹300 · 20 min             │  │
│  │  Online or Home Visit      │  │
│  │                            │  │
│  │  [ Book Consultation ]     │  │
│  └────────────────────────────┘  │
│                                  │
│  ── TREATMENT PACKAGES ────────  │
│  Choose a package to start       │
│  your treatment.                 │
│                                  │
│  ┌────────────────────────────┐  │
│  │  ⚡ Starter                 │  │
│  │  3 sessions · 1 month      │  │
│  │                            │  │
│  │  ₹3,000                    │  │
│  │  (₹1,000/session)          │  │
│  │                            │  │
│  │  [ Get Started ]           │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  🔥 Standard               │  │
│  │  5 sessions · 2 months     │  │
│  │                            │  │
│  │  ₹4,500                    │  │
│  │  (₹900/session)            │  │
│  │                            │  │
│  │  [ Get Started ]           │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  💪 Intensive    ⭐ Popular │  │
│  │  12 sessions · 3 months    │  │
│  │                            │  │
│  │  ₹9,600                    │  │
│  │  (₹800/session)            │  │
│  │                            │  │
│  │  [ Get Started ]           │  │
│  └────────────────────────────┘  │
│                                  │
│  ── REVIEWS ───────────────────  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ Rahul S. ⭐⭐⭐⭐⭐           │  │
│  │ 2 weeks ago                │  │
│  │ "Excellent therapist."     │  │
│  │                            │  │
│  │ ↪ Dr. Kavitha: "Thank you  │  │
│  │   Rahul!"                  │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ Priya R. ⭐⭐⭐⭐             │  │
│  │ 1 month ago                │  │
│  │ "Good treatment."          │  │
│  └────────────────────────────┘  │
│                                  │
│  See all 23 reviews →            │
│                                  │
└──────────────────────────────────┘
```

**Key changes:**
- "Not Sure Yet?" section with consultation appears BEFORE packages — this is intentional. Patients who are unsure see the low-commitment option first.
- Package buttons say "Get Started" not "Request" — it's a purchase, not a request.
- Tapping "Get Started" goes directly to P5 (Purchase screen) — no waiting, no negotiation.

---

### P5. Purchase Package Screen (REPLACES old P5a Request Screen)

This is now a straightforward checkout, not a request.

```
┌──────────────────────────────────┐
│  ←  Start Treatment              │
│                                  │
│  ── YOUR PACKAGE ──────────────  │
│  ┌────────────────────────────┐  │
│  │  💪 Intensive Package      │  │
│  │  Dr. Kavitha Rao           │  │
│  │  12 sessions · 3 months    │  │
│  │  ₹9,600 total              │  │
│  └────────────────────────────┘  │
│                                  │
│  ── WHAT DO YOU NEED HELP WITH?  │
│                                  │
│  Concern                         │
│  ┌────────────────────────────┐  │
│  │  Select concern       ▼   │  │
│  └────────────────────────────┘  │
│  (Knee injury, Back pain,        │
│   Post-surgery, Stroke rehab,    │
│   Sports injury, Neck/Shoulder,  │
│   General fitness, Other)        │
│                                  │
│  Tell the therapist more         │
│  ┌────────────────────────────┐  │
│  │                            │  │
│  │  e.g. ACL surgery was 3    │  │
│  │  weeks ago. Doctor said    │  │
│  │  to start physiotherapy.   │  │
│  │                            │  │
│  └────────────────────────────┘  │
│                                  │
│  ── SESSION ADDRESS ───────────  │
│  Where should sessions happen?   │
│                                  │
│  Saved addresses:                │
│  ┌────────────────────────────┐  │
│  │ 🔘 🏠 Flat 302, Cyber     │  │
│  │      Towers, Kondapur      │  │
│  │ ○  🏢 Floor 5, iLabs,     │  │
│  │      Gachibowli            │  │
│  │ ○  + New address           │  │
│  └────────────────────────────┘  │
│                                  │
│  (if "New address" selected:)    │
│  ┌────────────────────────────┐  │
│  │  Flat / House number       │  │
│  └────────────────────────────┘  │
│  ┌────────────────────────────┐  │
│  │  Building / Street         │  │
│  └────────────────────────────┘  │
│  ┌────────────────────────────┐  │
│  │  Landmark (optional)       │  │
│  └────────────────────────────┘  │
│  ┌────────────────────────────┐  │
│  │  Area: Kondapur       ▼   │  │
│  └────────────────────────────┘  │
│  ☐ Save this address             │
│                                  │
│  ── PAYMENT ───────────────────  │
│  ℹ️ ₹9,600 to be settled         │
│     directly with Dr. Kavitha    │
│     (Cash / UPI). You can pay    │
│     per session or upfront.      │
│                                  │
│  ┌────────────────────────────┐  │
│  │      CONFIRM & START       │  │
│  └────────────────────────────┘  │
│                                  │
└──────────────────────────────────┘
```

**On "Confirm & Start":**
1. Creates package doc with status = "active" immediately
2. Sends push + SMS to therapist: "Rahul Sharma started an Intensive package with you for Knee Rehab"
3. Navigates to P6 (Success) which prompts scheduling the first session

**No waiting. No approval. Package is live the moment patient confirms.**

The therapist is notified but doesn't need to "accept." They already set their packages and prices — the patient is buying what the therapist published. Just like a gym membership: the gym doesn't approve each membership purchase.

---

### P6. Package Started — Schedule First Session

Replaces the old success screen. Immediately guides toward action.

```
┌──────────────────────────────────┐
│                                  │
│            ✅                     │
│                                  │
│     You're all set!              │
│                                  │
│  Your Intensive package with     │
│  Dr. Kavitha Rao is now active.  │
│  12 sessions over 3 months.      │
│                                  │
│  Dr. Kavitha has been notified   │
│  about your concern and will     │
│  be prepared for your first      │
│  session.                        │
│                                  │
│  ┌────────────────────────────┐  │
│  │  SCHEDULE YOUR FIRST       │  │
│  │  SESSION NOW               │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  I'll schedule later       │  │
│  └────────────────────────────┘  │
│                                  │
└──────────────────────────────────┘
```

**"Schedule Your First Session"** → navigates to P8 (Schedule Session Within Package, same as v2).
**"I'll schedule later"** → navigates to Home. Package shows with "No session scheduled" state.

---

### P5b. Consultation Booking Screen — Unchanged

Same as v2. Patient picks online/offline mode, enters concern, selects a time slot, confirms.

One addition: after the consultation is completed, the therapist can recommend a package. When they do, the patient sees it in the Recommendations section on their home screen (P2) or as a push notification.

---

### PX. Accept Recommendation (NOT a separate screen — it's a notification action)

When a therapist recommends a package after consultation, the patient receives:

**Push notification:**
> "Dr. Kavitha recommends the Intensive package (12 sessions) for your Knee Rehab — ₹9,600"

**Tapping the notification → opens a bottom sheet (not a full screen):**

```
┌──────────────────────────────────┐
│                                  │
│  Dr. Kavitha Rao recommends:     │
│                                  │
│  ┌────────────────────────────┐  │
│  │  💪 Intensive Package      │  │
│  │  12 sessions · 3 months    │  │
│  │  ₹9,600 (₹800/session)    │  │
│  │                            │  │
│  │  For: Knee Rehab (ACL)     │  │
│  │                            │  │
│  │  "Based on our consultation│  │
│  │   I recommend 12 sessions  │  │
│  │   over 6 weeks, twice a    │  │
│  │   week."                   │  │
│  └────────────────────────────┘  │
│                                  │
│  Your address and concern from   │
│  the consultation will be used.  │
│                                  │
│  ┌────────────────────────────┐  │
│  │      ACCEPT & START        │  │
│  └────────────────────────────┘  │
│                                  │
│        Not right now             │
│                                  │
└──────────────────────────────────┘
```

**"Accept & Start":** Creates package with status = active immediately. Concern, description, and address carry over from the consultation. Navigate to P6 (schedule first session).

**"Not right now":** Dismisses. Recommendation stays visible on Home screen under "Recommendations" section until patient acts on it or it's dismissed.

This is NOT a negotiation. It's a one-tap accept of a therapist's professional recommendation. The therapist can only recommend packages they already have set up (Starter/Standard/Intensive) — they're not creating custom quotes.

---

# THERAPIST SCREENS — Changes

---

### T2. Therapist Home — Today's Calendar — Simplified

```
┌──────────────────────────────────┐
│  Good morning, Dr. Kavitha 👋    │
│  Tuesday, 25 Feb 2026    [🔔 3]  │
│                                  │
│  ── TODAY'S SCHEDULE ──────────  │
│  5 sessions · 2 available slots  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 08:00  Rahul Sharma     🔵 │  │
│  │        🦵 Knee rehab        │  │
│  │        📦 Intensive 8/12   │  │
│  │        📍 Kondapur         │  │
│  │        [Mark Complete]     │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 09:30  — Available —    🟢 │  │
│  │        📍 Madhapur area    │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 10:00  Priya Reddy      🟡 │  │
│  │        📞 CONSULTATION      │  │
│  │        🦵 Knee assessment   │  │
│  │        📍 Online            │  │
│  │        [Start Call]        │  │
│  │        [Complete & Recommend│  │
│  │         Package]           │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 11:00  Priya Reddy      🟡 │  │
│  │        🦵 ACL rehab         │  │
│  │        📦 Standard 2/5    │  │
│  │        📍 Gachibowli      │  │
│  │        ⚡ via PhysioConnect │  │
│  │        [Mark Complete]     │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 12:30  — LUNCH BREAK —    │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 14:00  Sunita Devi      🔵 │  │
│  │        🧠 Stroke rehab     │  │
│  │        📦 Intensive 6/12  │  │
│  │        📍 Madhapur         │  │
│  │        [Mark Complete]     │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 15:30  — Available —    🟢 │  │
│  │        📍 General          │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 17:00  Amit Verma       🔵 │  │
│  │        🔙 Back pain        │  │
│  │        📦 Starter 2/3     │  │
│  │        📍 Hitec City       │  │
│  │        [Mark Complete]     │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │   + Add Session / Block    │  │
│  └────────────────────────────┘  │
│                                  │
├──────────────────────────────────┤
│  📋Today  📅Calendar  👥Patients │
│           ⭐Reviews   👤Profile  │
└──────────────────────────────────┘
```

**What changed from v2:**
- Removed "Pending Requests" banner entirely — no request inbox needed
- Consultation cards have "Complete & Recommend Package" action — this is how the therapist triggers Flow B
- Everything else stays the same

---

### TX. Recommend Package (Bottom sheet — after completing a consultation)

When a therapist taps "Complete & Recommend Package" on a consultation card:

**Step 1: Mark consultation complete**

```
┌──────────────────────────────────┐
│  Complete Consultation           │
│                                  │
│  Patient: Priya Reddy            │
│  Concern: Knee assessment        │
│                                  │
│  ── CONSULTATION NOTES ────────  │
│                                  │
│  👁️ For the patient:             │
│  ┌────────────────────────────┐  │
│  │                            │  │
│  │  e.g. "Assessed your ACL   │  │
│  │  recovery. Recommending    │  │
│  │  12 sessions, 2x/week."   │  │
│  │                            │  │
│  └────────────────────────────┘  │
│                                  │
│  🔒 Private (for you):           │
│  ┌────────────────────────────┐  │
│  │                            │  │
│  │  e.g. "Moderate laxity.    │  │
│  │  Flexion at 60°. Needs     │  │
│  │  aggressive ROM work."     │  │
│  │                            │  │
│  └────────────────────────────┘  │
│                                  │
│  ── RECOMMEND PACKAGE ─────────  │
│                                  │
│  ○ ⚡ Starter (3 sessions)       │
│     ₹3,000                       │
│                                  │
│  ○ 🔥 Standard (5 sessions)      │
│     ₹4,500                       │
│                                  │
│  🔘 💪 Intensive (12 sessions)   │
│     ₹9,600                       │
│                                  │
│  Quick note for Priya:           │
│  ┌────────────────────────────┐  │
│  │  "I recommend 12 sessions  │  │
│  │   over 6 weeks for best    │  │
│  │   recovery results."       │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  COMPLETE & SEND           │  │
│  │  RECOMMENDATION            │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  COMPLETE WITHOUT          │  │
│  │  RECOMMENDING              │  │
│  └────────────────────────────┘  │
│  (just marks consultation done,  │
│   no package recommendation)     │
│                                  │
└──────────────────────────────────┘
```

**"Complete & Send Recommendation":**
1. Marks consultation session as completed
2. Saves public + private consultation notes
3. Creates a recommendation record
4. Sends push to patient: "Dr. Kavitha recommends Intensive (12 sessions) for your Knee Rehab"
5. Patient sees it on home screen and can accept with one tap

**"Complete Without Recommending":**
- Just marks consultation as done with notes
- Useful when therapist needs more info, or the patient's issue doesn't need physiotherapy
- Therapist can recommend later from the patient detail screen if needed

---

### T9. Patient Detail Screen — Add "Recommend Package" Action

```
┌──────────────────────────────────┐
│  ←  Patient Details              │
│                                  │
│  [Photo]  Priya Reddy            │
│           📱 +91 98765 43210     │
│           📍 Gachibowli          │
│           🟡 Platform patient    │
│                                  │
│  ── ACTIVE PACKAGE ────────────  │
│  ┌────────────────────────────┐  │
│  │  🦵 ACL Rehab              │  │
│  │  🔥 Standard (5 sessions)  │  │
│  │  ██░░░░░░░░░░░░░░ 2/5     │  │
│  │  Started: 20 Feb           │  │
│  └────────────────────────────┘  │
│                                  │
│  ── PAST CONSULTATIONS ────────  │
│  ┌────────────────────────────┐  │
│  │  📞 Consultation · 18 Feb  │  │
│  │  Concern: Knee assessment  │  │
│  │  👁️ "Assessed ACL recovery.│  │
│  │   Recommending 5 sessions."│  │
│  │  🔒 "Moderate laxity..."   │  │
│  └────────────────────────────┘  │
│                                  │
│  ── SESSION HISTORY ───────────  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ Session 2 · 22 Feb  ✅     │  │
│  │ 👁️ "Flexion improved..."   │  │
│  │ 🔒 "Slight valgus..."     │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ Session 1 · 20 Feb  ✅     │  │
│  │ 👁️ "Initial session..."    │  │
│  │ 🔒 "Baseline recorded."   │  │
│  └────────────────────────────┘  │
│                                  │
│  ── NO ACTIVE PACKAGE? ────────  │
│  (shows only if patient has had  │
│   a consultation but no active   │
│   package with this therapist)   │
│                                  │
│  ┌────────────────────────────┐  │
│  │  RECOMMEND A PACKAGE       │  │
│  └────────────────────────────┘  │
│  (opens same package recommend   │
│   bottom sheet from TX above)    │
│                                  │
└──────────────────────────────────┘
```

**"Recommend a Package"** button shows only when the patient has no active package with this therapist. This covers the case where:
- Therapist did a consultation but didn't recommend at the time
- Patient's previous package finished and therapist wants to suggest renewal
- Therapist wants to recommend after reviewing progress

---

### T7. Session Complete Screen — Split Notes (Same as v2)

No changes from v2. Two clearly separated note fields:
- 👁️ Public notes (shared with patient)
- 🔒 Private notes (only therapist sees)

---

### T10. Therapist Profile Screen — No Changes from v2

Pricing section shows consultation fee + all three package tiers. "Edit Pricing" → T11 (Manage Pricing screen).

---

### T11. Manage Pricing Screen — No Changes from v2

Consultation settings + three package tiers with enable/disable toggles.

---

# COMPLETE UPDATED FLOW DIAGRAMS

### Patient — Flow A: Direct Purchase

```
P3 Search → P4 Therapist Detail
                    │
                    │ taps "Get Started"
                    │ on a package
                    ▼
              P5 Purchase Package
              (enter concern, address)
                    │
                    │ taps "Confirm & Start"
                    ▼
              P6 Success → Schedule First Session
                    │
                    ▼
              P8 Schedule Session
              (pick slot from therapist's calendar)
                    │
                    ▼
              Package is active.
              Sessions happen over time.
              Progress tracked in P7 / P10.
```

### Patient — Flow B: Via Consultation

```
P3 Search → P4 Therapist Detail
                    │
                    │ taps "Book Consultation"
                    ▼
              P5b Consultation Booking
              (pick online/offline, time, concern)
                    │
                    ▼
              Consultation happens
              (therapist marks complete + recommends)
                    │
                    ▼
              Patient receives push notification
              + sees recommendation on P2 Home
                    │
                    │ taps "View & Accept"
                    ▼
              PX Bottom sheet with package details
                    │
                    │ taps "Accept & Start"
                    ▼
              P6 Success → Schedule First Session
              (same from here onward)
```

### Therapist — Handling Consultation + Recommendation

```
T2 Today's Calendar
        │
        │ consultation session card
        │ taps "Complete & Recommend Package"
        ▼
  TX Bottom sheet:
  - Write public + private notes
  - Select which package to recommend
  - Add a short recommendation note
        │
        │ taps "Complete & Send Recommendation"
        ▼
  - Consultation marked complete
  - Notes saved
  - Push sent to patient
  - Patient can accept from their end
```

### Therapist — Late Recommendation (no consultation needed)

```
T9 Patient Detail Screen
        │
        │ (patient has no active package)
        │ taps "Recommend a Package"
        ▼
  Same bottom sheet as TX:
  - Select package to recommend
  - Add recommendation note
        │
        │ taps "Send Recommendation"
        ▼
  Push notification to patient
```

---

# UPDATED FIRESTORE DATA MODEL

### packages collection — Simplified

```
packages/
└── {packageId}/
    ├── therapistId: string
    ├── patientId: string
    ├── packageType: "starter" | "standard" | "intensive"
    ├── totalSessions: number         (3, 5, or 12)
    ├── completedSessions: number     (denormalized, incremented on each completion)
    ├── totalPrice: number            (INR)
    ├── perSessionPrice: number       (calculated)
    ├── validityMonths: number        (1, 2, or 3)
    │
    ├── concern: string               ("Knee injury")
    ├── concernDescription: string    ("ACL surgery 3 weeks ago...")
    ├── address: string
    ├── area: string
    │
    ├── status: "active" | "completed" | "expired"
    │
    │   (NO "requested" or "offered" status — package is
    │    always created as active, either by direct purchase
    │    or by accepting a recommendation)
    │
    ├── source: "direct" | "recommendation"
    │   (tracks whether patient bought directly or accepted
    │    a therapist's recommendation)
    │
    ├── consultationSessionId: string?
    │   (if this package came from a consultation,
    │    links to the consultation session)
    │
    ├── -- Denormalized --
    ├── therapistName: string
    ├── therapistAvatarUrl: string?
    ├── patientName: string
    │
    ├── startedAt: timestamp
    ├── expiresAt: timestamp          (startedAt + validity period)
    ├── completedAt: timestamp?
    ├── createdAt: timestamp
    └── updatedAt: timestamp
```

### New: recommendations collection (lightweight)

```
recommendations/
└── {recommendationId}/
    ├── therapistId: string
    ├── patientId: string
    ├── packageType: "starter" | "standard" | "intensive"
    ├── totalSessions: number
    ├── totalPrice: number
    ├── note: string              ("I recommend 12 sessions over 6 weeks...")
    │
    ├── concern: string           (carried from consultation)
    ├── concernDescription: string
    ├── address: string?          (carried from consultation if available)
    ├── area: string?
    │
    ├── consultationSessionId: string?
    │
    ├── status: "pending" | "accepted" | "dismissed"
    │
    ├── -- Denormalized --
    ├── therapistName: string
    ├── patientName: string
    │
    ├── createdAt: timestamp
    ├── respondedAt: timestamp?
    └── resultingPackageId: string?  (set when accepted → package created)
```

### sessions collection — Minor additions

```
sessions/{sessionId}
├── ... all existing fields ...
├── type: "session" | "consultation"       (distinguishes consultations)
├── consultationMode: "online" | "home_visit"?  (only for consultations)
├── packageId: string?                     (null for consultations and manual)
├── sessionNumber: number?                 (1-indexed, null for consultations)
├── recommendationSent: boolean?           (for consultations: did therapist recommend?)
```

---

# CLOUD FUNCTIONS — Changes

### New: onPackageCreated

```
Trigger: packages/{id} created with status = "active"

Actions:
- Send push + SMS to therapist:
  "New patient! [name] started a [type] package for [concern]"
- Create notification record
```

### New: onRecommendationCreated

```
Trigger: recommendations/{id} created

Actions:
- Send push to patient:
  "Dr. [name] recommends [type] package (X sessions) for your [concern] — ₹Y"
- Create notification record
```

### Updated: onSessionStatusChanged

```
When consultation is completed:
- If recommendationSent = true, no extra action needed
  (recommendation Cloud Function handles notification)
- If recommendationSent = false, just log completion

When regular session is completed:
- Increment package.completedSessions
- If completedSessions == totalSessions → mark package as "completed"
- Send review prompt if package is now completed
- Send rebook/schedule prompt if sessions remaining
```

### Removed:
- ❌ No function for "request" handling
- ❌ No function for "offer" sending
- ❌ No function for "accept/decline" processing

---

# SUMMARY: What Got Simpler

| Before (v2) | After (v3) |
|---|---|
| Patient sends request → waits → therapist reviews → accepts/suggests/declines → patient accepts/declines | Patient picks package → confirms → done |
| 5 package statuses: requested, offered, active, completed, declined, expired | 3 package statuses: active, completed, expired |
| Therapist has inbox of requests to manage | Therapist just gets notified when a patient starts |
| 4 screens for request/offer/acceptance flow | 1 screen for purchase + 1 bottom sheet for recommendation |
| Back-and-forth messaging about packages | Zero back-and-forth. Buy it or don't. |
| 33 total screens | 29 total screens |

The core principle: **a therapist's packages are published prices. Patients buy them. Therapists recommend them after consultations. There is no negotiation.**