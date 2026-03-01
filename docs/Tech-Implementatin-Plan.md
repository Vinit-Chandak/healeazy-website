# PhysioConnect — Complete Technical Implementation Plan (v4 Final)

**Version:** 4.0 — Therapist-Recommends-First Architecture
**Date:** February 2026
**Author:** Solo Founder / Full-Stack Developer

This is the single, self-contained technical blueprint for building PhysioConnect. It replaces all previous versions. Every decision, data schema, code snippet, deployment step, and cost projection lives in this one document.

-----

## Context

|Parameter     |Decision                              |
|--------------|--------------------------------------|
|Team          |Solo founder (full-stack)             |
|Frontend      |Flutter (iOS + Android)               |
|Launch city   |Hyderabad                             |
|Auth          |Email + password                      |
|Budget        |Flexible if justified                 |
|Existing infra|None                                  |
|Goal          |Ship MVP to market as fast as possible|

### Core Product Concept

Patients get treatment packages (3, 5, or 12 sessions) from verified physiotherapists who provide home visits. The therapist always recommends first; the patient then chooses which package to start with. Two flows:

**Flow A — Express Interest:** Patient browses → tells therapist about their condition → therapist reviews and recommends a package → patient sees recommendation + all packages → picks one → package active → schedules sessions.

**Flow B — Via Consultation:** Patient books a consultation (online/home visit) → consultation happens → therapist recommends a package → patient sees recommendation + all packages → picks one → package active → schedules sessions.

Both flows converge: **therapist recommends → patient chooses → treatment begins.** The therapist’s recommendation is the clinical anchor. Patients typically pick equal to or less than what’s recommended (budget reality meets clinical advice). There is no negotiation — one recommendation, one choice, done.

-----

## 1. Architecture Decision: Why Firebase + Flutter

### The Honest Comparison

|Criteria                   |Firebase + Firestore                                                |Supabase (PostgreSQL)                                            |
|---------------------------|:------------------------------------------------------------------:|:---------------------------------------------------------------:|
|**Flutter integration**    |⚡ First-class (FlutterFire)                                         |✅ Good (community SDK)                                           |
|**Ship speed for solo dev**|⚡ Fastest                                                           |✅ Fast                                                           |
|**Real-time**              |⚡ Zero-config, native                                               |✅ Works, more setup                                              |
|**Auth**                   |⚡ Mature, many providers                                            |✅ Good, fewer providers                                          |
|**Push notifications**     |⚡ FCM is native — same console                                      |⚠️ Needs separate Firebase setup anyway                           |
|**Crashlytics + Analytics**|⚡ Built-in, one console                                             |❌ Needs separate tooling                                         |
|**Query flexibility**      |⚠️ No joins, needs denormalization                                   |⚡ Full SQL, joins, indexes                                       |
|**Atomic transactions**    |✅ Firestore transactions                                            |⚡ PostgreSQL row locking                                         |
|**Single ecosystem**       |⚡ Auth + DB + Storage + FCM + Crashlytics + Analytics in one console|⚠️ DB + Auth + Storage only; FCM, Crashlytics need Firebase anyway|

### Why Firebase Wins for This MVP

|Query                                              |Can Firestore Handle It?              |
|---------------------------------------------------|:------------------------------------:|
|Therapists where area = X, sorted by rating        |✅ Composite index                     |
|Sessions for therapist X on date Y, ordered by time|✅ Simple compound query               |
|Active packages for patient X                      |✅ Simple query on patientId + status  |
|Pending treatment requests for therapist X         |✅ Simple query on therapistId + status|
|Available slots for therapist X this week          |✅ Range query on date + status        |
|Reviews for therapist X, ordered by date           |✅ Simple query                        |
|Sessions within package X, ordered by date         |✅ Query on packageId + date           |

**The decisive factor:** As a solo Flutter developer, Firebase gives you one console for everything — Auth, Firestore, Storage, FCM, Crashlytics, Analytics. No stitching together multiple services.

### When to Reconsider (Move to Supabase/PostgreSQL)

- When the en-route recommendation engine needs complex SQL joins at scale
- When denormalization becomes painful (hundreds of therapists, thousands of sessions)
- When you build a web version
- When you need advanced geospatial queries (PostGIS)

**This is a V2 decision.** Don’t solve it now.

-----

## 2. Complete Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                     FLUTTER APP                          │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐             │
│  │ Patient  │  │ Therapist│  │   Admin   │             │
│  │  Views   │  │  Views   │  │   Views   │             │
│  └──────────┘  └──────────┘  └───────────┘             │
│                                                          │
│  State Management: Riverpod                              │
│  Navigation: GoRouter                                    │
│  Local storage: SharedPreferences                        │
└──────────────────────┬───────────────────────────────────┘
                       │ HTTPS
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    FIREBASE                               │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │
│  │   Auth   │  │ Cloud    │  │  Cloud Functions      │  │
│  │  (Email) │  │ Storage  │  │  (Package lifecycle,  │  │
│  │          │  │ (Photos, │  │   recommendations,    │  │
│  │          │  │  Certs)  │  │   notifications,      │  │
│  │          │  │          │  │   cron jobs)          │  │
│  └──────────┘  └──────────┘  └───────────────────────┘  │
│                                                          │
│  ┌──────────────────────┐  ┌──────────────────────────┐  │
│  │      Firestore       │  │  FCM (Push)              │  │
│  │  (Database)          │  │  Crashlytics (Crashes)   │  │
│  │                      │  │  Analytics (Usage)       │  │
│  └──────────────────────┘  └──────────────────────────┘  │
└──────────────────────┬───────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                 EXTERNAL SERVICES                         │
│  ┌──────────┐  ┌──────────────────────────────────────┐  │
│  │  MSG91   │  │  Google Maps Distance Matrix         │  │
│  │  (SMS)   │  │  (travel times — Phase 1+)           │  │
│  └──────────┘  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

|Layer                 |Technology                               |Why                                                       |
|----------------------|-----------------------------------------|----------------------------------------------------------|
|**Mobile app**        |Flutter 3.x                              |Cross-platform, fast to ship                              |
|**State management**  |Riverpod                                 |Robust async handling, less boilerplate than BLoC         |
|**Navigation**        |GoRouter                                 |Declarative routing, deep links, role-based redirects     |
|**Backend**           |Firebase (Firestore + Cloud Functions)   |Single ecosystem, fastest path for solo Flutter dev       |
|**Database**          |Firestore                                |Real-time out of the box, scales automatically            |
|**Auth**              |Firebase Auth                            |Email + password now; add Google/OTP later with one toggle|
|**File storage**      |Cloud Storage for Firebase               |Profile photos, certificates                              |
|**Push notifications**|Firebase Cloud Messaging (FCM)           |Native to Flutter + Firebase, free                        |
|**Server logic**      |Cloud Functions for Firebase (TypeScript)|Triggers on Firestore writes, scheduled cron jobs         |
|**Crash reporting**   |Firebase Crashlytics                     |Free, real-time, auto-integrated with Flutter             |
|**Analytics**         |Firebase Analytics                       |Free, event tracking                                      |
|**SMS**               |MSG91                                    |Indian SMS gateway, ₹0.15-0.20/SMS, DLT compliant         |
|**Maps/Distance**     |Google Maps Platform                     |Distance Matrix API for travel times (Phase 1+)           |

-----

## 3. Project Setup — Day 1

### 3.1 Accounts to Create

|Service                    |URL                        |Free Tier / Cost                                     |
|---------------------------|---------------------------|-----------------------------------------------------|
|Firebase                   |console.firebase.google.com|Spark plan free: 1GB Firestore, 5GB Storage, 50K auth|
|GitHub                     |github.com                 |Unlimited private repos                              |
|MSG91                      |msg91.com                  |Pay-as-you-go ~₹0.15/SMS                             |
|Google Cloud (for Maps API)|console.cloud.google.com   |$200 free credit                                     |
|Apple Developer (if iOS)   |developer.apple.com        |$99/year — needed for TestFlight                     |
|Google Play Console        |play.google.com/console    |$25 one-time                                         |

**Note:** Firebase project automatically creates a Google Cloud project. Cloud Functions, Maps API, and everything else live under the same GCP billing account.

### 3.2 Domain and Branding

Buy a domain early for professional email, deep links, and future landing page. Suggested: `physioconnect.in` or similar.

### 3.3 Flutter Project Initialization

```bash
# Create Flutter project
flutter create --org com.physioconnect physioconnect
cd physioconnect

# Add Firebase core + services
flutter pub add firebase_core
flutter pub add firebase_auth
flutter pub add cloud_firestore
flutter pub add firebase_storage
flutter pub add firebase_messaging
flutter pub add firebase_crashlytics
flutter pub add firebase_analytics

# Add app framework
flutter pub add flutter_riverpod
flutter pub add go_router
flutter pub add shared_preferences
flutter pub add image_picker
flutter pub add cached_network_image
flutter pub add intl
flutter pub add flutter_local_notifications
flutter pub add url_launcher

# Dev dependencies
flutter pub add --dev flutter_lints

# Initialize Firebase using FlutterFire CLI
dart pub global activate flutterfire_cli
flutterfire configure

# Initialize git
git init
git remote add origin <your-github-repo-url>
```

### 3.4 Firebase Project Setup

1. Create new project on console.firebase.google.com
1. Enable Authentication → Email/Password sign-in
1. Create Firestore database (start in test mode, add rules before launch)
1. Create Cloud Storage bucket
1. Run `flutterfire configure` to auto-generate `firebase_options.dart`
1. Enable Cloud Functions (requires Blaze plan — pay-as-you-go, but free tier covers MVP traffic at ₹0)

-----

## 4. Screen-by-Screen Data Analysis

Every screen mapped to its exact Firestore reads, writes, and real-time subscriptions.

### 4.1 Shared Screens (4)

|Screen               |Reads                    |Writes                                       |Real-time?|
|---------------------|-------------------------|---------------------------------------------|:--------:|
|**S1 Splash**        |Check Firebase Auth state|None                                         |No        |
|**S2 Login**         |None                     |Firebase Auth signIn                         |No        |
|**S3 Signup**        |None                     |Firebase Auth createUser → create `users` doc|No        |
|**S4 Role Selection**|None                     |Update `users.role`                          |No        |

### 4.2 Patient Screens (12)

|Screen                      |Reads                                                                                                                 |Writes                                                                           |Real-time?                                            |
|----------------------------|----------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|:----------------------------------------------------:|
|**P1 Onboarding**           |None                                                                                                                  |Create `patientProfiles/{userId}`                                                |No                                                    |
|**P2 Home**                 |Active packages (my), pending treatmentRequests (status=pending or recommended), next upcoming session per package    |None                                                                             |✅ Yes — packages + treatmentRequests + sessions stream|
|**P3 Search**               |`therapistProfiles` where verified + area filter + sort                                                               |None                                                                             |No                                                    |
|**P4 Therapist Detail**     |`therapistProfiles/{id}`, `reviews` where therapistId (limit 3)                                                       |None                                                                             |No                                                    |
|**P5 Express Interest**     |`users/{me}` (for saved addresses)                                                                                    |Create `treatmentRequests` doc (status=pending)                                  |No                                                    |
|**P5b Consultation Booking**|`calendarSlots` where available + next 7 days                                                                         |Create `sessions` doc (type=consultation), update slot status=booked             |No                                                    |
|**P5c Request Sent**        |None (data passed from P5)                                                                                            |None                                                                             |No                                                    |
|**PY Choose Package**       |`treatmentRequests/{id}` (for recommendation details), `therapistProfiles/{id}` (for all package pricing)             |Create `packages` doc (status=active), update `treatmentRequests` status=accepted|No                                                    |
|**P7 Package Detail**       |`packages/{id}`, `sessions` where packageId + ordered by date, `sessions/{id}/notes` where isShared=true              |None                                                                             |✅ Yes — sessions stream                               |
|**P8 Schedule Session**     |`calendarSlots` where available + therapist + next 7 days                                                             |Create `sessions` doc (linked to package), update slot status=booked             |No                                                    |
|**P9 My Packages**          |`packages` where patientId, grouped by status                                                                         |None                                                                             |✅ Yes — packages stream                               |
|**P10 Progress**            |`packages` where patientId + active, `sessions` where packageId + completed, `sessions/{id}/notes` where isShared=true|None                                                                             |No                                                    |
|**P11 Profile**             |`users/{me}`, `patientProfiles/{me}`                                                                                  |Update `users/{me}`, `patientProfiles/{me}`                                      |No                                                    |
|**P12 Notifications**       |`notifications` where userId=me, ordered by date DESC                                                                 |Update `notifications/{id}.isRead`                                               |✅ Yes — stream                                        |

### 4.3 Therapist Screens (11)

|Screen                                 |Reads                                                                                                                                                                                |Writes                                                                                                                                                                |Real-time?                                |
|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------:|
|**T1 Onboarding (3 steps)**            |None                                                                                                                                                                                 |Create `therapistProfiles/{userId}` with packages pricing, consultation settings                                                                                      |No                                        |
|**T2 Today’s Calendar**                |`sessions` where therapistId + today, `calendarSlots` where therapistId + today + available, `treatmentRequests` where therapistId + status=pending                                  |None                                                                                                                                                                  |✅ Yes — sessions + slots + requests stream|
|**T3 Calendar Week**                   |`sessions` where therapistId + date range, `calendarSlots` where therapistId + date range                                                                                            |None                                                                                                                                                                  |No (refresh on pull)                      |
|**T4 Manage Availability**             |`therapistProfiles/{me}` (working hours)                                                                                                                                             |Update `therapistProfiles/{me}`, batch create `calendarSlots`                                                                                                         |No                                        |
|**T5 Add Manual Session**              |`therapistProfiles/{me}/manualPatients`                                                                                                                                              |Create `sessions` doc (source=manual), optionally create `manualPatients` doc                                                                                         |No                                        |
|**T6 Patient List**                    |`sessions` where therapistId grouped by patientId (client-side), `packages` where therapistId                                                                                        |None                                                                                                                                                                  |No                                        |
|**T7 Session Complete**                |`sessions/{id}` (data passed from calendar)                                                                                                                                          |Update `sessions/{id}.status=completed`, create 1-2 `sessions/{id}/notes` docs (public + private)                                                                     |No                                        |
|**TX Recommend Package** (bottom sheet)|`treatmentRequests/{id}` (for concern details), `therapistProfiles/{me}.packages` (for pricing options)                                                                              |Update `treatmentRequests` (status→recommended, add recommendation fields). If post-consultation: also update session status + create notes + create treatmentRequest.|No                                        |
|**T8 Reviews**                         |`reviews` where therapistId, ordered by date DESC                                                                                                                                    |Update `reviews/{id}.therapistReply`                                                                                                                                  |No                                        |
|**T9 Patient Detail**                  |`packages` where therapistId + patientId, `sessions` where therapistId + patientId, `sessions/{id}/notes` (all — shared + private), `treatmentRequests` where therapistId + patientId|None                                                                                                                                                                  |No                                        |
|**T10 Profile**                        |`therapistProfiles/{me}`, `users/{me}`                                                                                                                                               |Update `users/{me}`, `therapistProfiles/{me}`                                                                                                                         |No                                        |
|**T11 Manage Pricing**                 |`therapistProfiles/{me}`                                                                                                                                                             |Update `therapistProfiles/{me}` (consultation + package pricing)                                                                                                      |No                                        |

### 4.4 Admin Screens (3)

|Screen                   |Reads                                                                                                                       |Writes                                            |Real-time?|
|-------------------------|----------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|:--------:|
|**A1 Dashboard**         |Aggregation queries: count sessions today/this week, count users by role, count pending verifications, count active packages|None                                              |No        |
|**A2 Verification Queue**|`therapistProfiles` where verificationStatus=pending                                                                        |Update `therapistProfiles/{id}.verificationStatus`|No        |
|**A3 User Management**   |`users` (paginated), filtered by role                                                                                       |Update `users/{id}.isActive`                      |No        |

### 4.5 What Gets Read Most

|Collection         |Read Frequency|Optimization                                                    |
|-------------------|:------------:|----------------------------------------------------------------|
|`sessions`         |Very high     |Composite indexes on therapistId+date, patientId+date, packageId|
|`therapistProfiles`|High          |Keep documents lean; pricing as nested map                      |
|`calendarSlots`    |High          |Index on date+status+startTime                                  |
|`packages`         |High          |Index on patientId+status, therapistId+patientId                |
|`treatmentRequests`|Medium        |Index on therapistId+status, patientId+status                   |
|`notifications`    |Medium        |Index on userId+createdAt                                       |
|`reviews`          |Medium        |Index on therapistId+createdAt                                  |

**6 screens need real-time Firestore streams:** Patient home, package detail, my packages, therapist today calendar, patient notifications. Everything else is one-time reads.

-----

## 5. Complete Firestore Data Model

### 5.1 Design Principles

- **Denormalize aggressively** — duplicate data to avoid joins
- **One query = one collection** — if a screen needs data, it should come from a single query
- **Subcollections for ownership** — therapist’s slots live under the therapist document
- **Keep documents small** — large arrays cause slow reads and expensive writes
- **Concerns live on treatment requests → packages, not profiles** — a patient can have knee rehab with Dr. A and back pain with Dr. B simultaneously
- **Therapist recommends, patient chooses** — the treatment request tracks this lifecycle

### 5.2 Collection Structure

```
Firestore Root
│
├── users/
│   └── {userId}/
│       ├── role: "patient" | "therapist" | "admin"
│       ├── fullName: string
│       ├── email: string
│       ├── phone: string?
│       ├── avatarUrl: string?
│       ├── city: "Hyderabad"
│       ├── area: string
│       ├── isActive: boolean
│       ├── savedAddresses: [
│       │     {
│       │       label: "Home",
│       │       flatNumber: "302",
│       │       building: "Cyber Towers",
│       │       landmark: "Near IKEA",
│       │       area: "Kondapur",
│       │       fullAddress: "Flat 302, Cyber Towers, Near IKEA, Kondapur"
│       │     }
│       │   ]
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
│
├── therapistProfiles/
│   └── {therapistId}/                  (ID = userId)
│       ├── userId: string
│       ├── fullName: string            (denormalized from users)
│       ├── avatarUrl: string?          (denormalized from users)
│       ├── bio: string
│       ├── yearsOfExperience: number
│       ├── specializations: string[]   (["orthopedic", "sports"])
│       ├── languages: string[]         (["English", "Hindi", "Telugu"])
│       ├── registrationCouncil: string
│       ├── councilNumber: string
│       ├── degreeCertificateUrl: string
│       │
│       ├── serviceAreas: string[]      (["Kondapur", "Madhapur", "Gachibowli"])
│       ├── sessionDurationMin: number  (45, 60, or 90)
│       ├── bufferMinutes: number       (15, 30, or 45)
│       │
│       ├── ── Consultation Settings ──
│       ├── offersConsultation: boolean
│       ├── consultationFee: number         (INR, 0 = free)
│       ├── consultationDurationMin: number (15, 20, or 30)
│       ├── consultationModes: string[]     (["online", "home_visit"])
│       │
│       ├── ── Package Pricing ──
│       ├── packages: {
│       │     starter: {
│       │       enabled: true,
│       │       sessions: 3,
│       │       totalPrice: 3000,
│       │       validityMonths: 1
│       │     },
│       │     standard: {
│       │       enabled: true,
│       │       sessions: 5,
│       │       totalPrice: 4500,
│       │       validityMonths: 2
│       │     },
│       │     intensive: {
│       │       enabled: true,
│       │       sessions: 12,
│       │       totalPrice: 9600,
│       │       validityMonths: 3
│       │     }
│       │   }
│       ├── lowestPerSessionFee: number     (denormalized: cheapest per-session
│       │                                    across enabled packages, for search sort)
│       │
│       ├── maxSessionsPerDay: number
│       ├── workingHoursStart: string       ("08:00")
│       ├── workingHoursEnd: string         ("18:00")
│       ├── workingDays: number[]           ([1,2,3,4,5,6] Mon-Sat)
│       ├── lunchBreakStart: string         ("13:00")
│       ├── lunchBreakEnd: string           ("14:00")
│       │
│       ├── verificationStatus: "pending" | "verified" | "rejected"
│       ├── verifiedAt: timestamp?
│       ├── rejectionReason: string?
│       │
│       ├── averageRating: number           (denormalized)
│       ├── totalReviews: number            (denormalized)
│       ├── totalSessions: number           (denormalized)
│       ├── activePackages: number          (denormalized)
│       │
│       ├── createdAt: timestamp
│       ├── updatedAt: timestamp
│       │
│       ├── calendarSlots/                  (Subcollection)
│       │   └── {slotId}/
│       │       ├── date: string            ("2026-02-25")
│       │       ├── startTime: string       ("09:00")
│       │       ├── endTime: string         ("10:00")
│       │       ├── status: "available" | "booked" | "blocked"
│       │       ├── area: string?
│       │       ├── isEnroute: boolean
│       │       └── createdAt: timestamp
│       │
│       └── manualPatients/                 (Subcollection)
│           └── {manualPatientId}/
│               ├── name: string
│               ├── phone: string?
│               ├── concern: string
│               └── createdAt: timestamp
│
├── patientProfiles/                        (Simplified — no medical info)
│   └── {patientId}/
│       ├── userId: string
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
│
├── treatmentRequests/                      (THE core lifecycle collection)
│   └── {requestId}/
│       ├── patientId: string
│       ├── therapistId: string
│       │
│       ├── ── Patient fills these ──
│       ├── concern: string                 ("Knee injury")
│       ├── concernDescription: string      ("ACL surgery 3 weeks ago...")
│       ├── address: string
│       ├── area: string
│       │
│       ├── ── Therapist fills these ──
│       ├── recommendedPackageType: string?  ("intensive")
│       ├── recommendedSessions: number?     (12)
│       ├── recommendedPrice: number?        (9600)
│       ├── recommendationNote: string?      ("ACL recovery typically needs...")
│       ├── recommendedAt: timestamp?
│       │
│       ├── ── Patient fills these ──
│       ├── chosenPackageType: string?       ("standard" — may differ from recommended)
│       ├── resultingPackageId: string?
│       │
│       ├── ── Source tracking ──
│       ├── source: "interest" | "consultation"
│       ├── consultationSessionId: string?
│       │
│       ├── ── Lifecycle ──
│       ├── status: "pending" | "recommended" | "accepted" | "declined" | "expired"
│       │
│       │   pending     = patient sent request, therapist hasn't responded
│       │   recommended = therapist recommended a package, patient hasn't chosen
│       │   accepted    = patient chose a package, treatment started
│       │   declined    = therapist declined the request
│       │   expired     = no response within 48 hours (auto by cron)
│       │
│       ├── ── Denormalized ──
│       ├── therapistName: string
│       ├── therapistAvatarUrl: string?
│       ├── patientName: string
│       │
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
│
├── packages/
│   └── {packageId}/
│       ├── therapistId: string
│       ├── patientId: string
│       ├── packageType: "starter" | "standard" | "intensive"
│       ├── totalSessions: number           (3, 5, or 12)
│       ├── completedSessions: number       (incremented by Cloud Function)
│       ├── scheduledSessions: number       (incremented on create, decremented on cancel)
│       ├── totalPrice: number
│       ├── perSessionPrice: number         (totalPrice ÷ totalSessions)
│       ├── validityMonths: number
│       │
│       ├── concern: string                 ("Knee injury")
│       ├── concernDescription: string      ("ACL surgery 3 weeks ago...")
│       ├── address: string
│       ├── area: string
│       │
│       ├── status: "active" | "completed" | "expired"
│       ├── source: "interest" | "consultation"
│       ├── treatmentRequestId: string      (links back to the request)
│       ├── recommendedPackageType: string? (what therapist suggested — for analytics)
│       │
│       ├── therapistName: string           (denormalized)
│       ├── therapistAvatarUrl: string?     (denormalized)
│       ├── patientName: string             (denormalized)
│       │
│       ├── startedAt: timestamp
│       ├── expiresAt: timestamp
│       ├── completedAt: timestamp?
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
│
├── sessions/
│   └── {sessionId}/
│       ├── therapistId: string
│       ├── patientId: string?
│       ├── calendarSlotId: string?
│       ├── source: "platform" | "manual"
│       │
│       ├── type: "session" | "consultation"
│       ├── consultationMode: "online" | "home_visit"?
│       ├── packageId: string?              (null for consultations + manual)
│       ├── sessionNumber: number?          (1-indexed within package)
│       │
│       ├── sessionDate: string             ("2026-02-25")
│       ├── startTime: string               ("09:00")
│       ├── endTime: string                 ("10:00")
│       ├── actualEndTime: string?
│       │
│       ├── area: string
│       ├── address: string?
│       │
│       ├── manualPatientName: string?
│       ├── manualPatientPhone: string?
│       ├── manualPatientConcern: string?
│       │
│       ├── status: "upcoming" | "in_progress" | "completed" | "cancelled" | "no_show"
│       ├── cancellationReason: string?
│       ├── cancelledBy: string?
│       ├── cancelledAt: timestamp?
│       │
│       ├── feeAmount: number
│       ├── concern: string?                (denormalized from package or consultation)
│       ├── bookingStatus: "confirmed" | "rescheduled" | "cancelled_by_patient" |
│       │                  "cancelled_by_therapist" | "completed"
│       │
│       ├── therapistName: string
│       ├── therapistAvatarUrl: string?
│       ├── patientName: string?
│       ├── patientPhone: string?
│       │
│       ├── bookedAt: timestamp
│       ├── completedAt: timestamp?
│       ├── createdAt: timestamp
│       ├── updatedAt: timestamp
│       │
│       └── notes/                          (Subcollection)
│           └── {noteId}/
│               ├── therapistId: string
│               ├── noteText: string
│               ├── isShared: boolean       (true = public, false = private)
│               ├── createdAt: timestamp
│               └── updatedAt: timestamp
│
├── reviews/                                (Per completed package)
│   └── {reviewId}/
│       ├── packageId: string
│       ├── therapistId: string
│       ├── patientId: string
│       ├── patientName: string
│       ├── patientAvatarUrl: string?
│       ├── rating: number                  (1-5)
│       ├── reviewText: string?
│       ├── therapistReply: string?
│       ├── repliedAt: timestamp?
│       ├── isFlagged: boolean
│       └── createdAt: timestamp
│
├── notifications/
│   └── {notificationId}/
│       ├── userId: string
│       ├── title: string
│       ├── body: string
│       ├── type: string
│       ├── referenceId: string?
│       ├── isRead: boolean
│       ├── sentVia: string[]
│       └── createdAt: timestamp
│
├── fcmTokens/
│   └── {tokenId}/
│       ├── userId: string
│       ├── token: string
│       ├── deviceType: "android" | "ios"
│       ├── isActive: boolean
│       └── updatedAt: timestamp
│
└── travelTimes/                            (Phase 1+ — en-route recommendations)
    └── {fromArea_toArea}/
        ├── fromArea: string
        ├── toArea: string
        ├── baseMinutes: number
        ├── peakMinutes: number
        ├── peakHours: string
        └── lastUpdated: timestamp
```

### 5.3 Firestore Indexes

```json
{
  "indexes": [
    {
      "collectionGroup": "therapistProfiles",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "verificationStatus", "order": "ASCENDING" },
        { "fieldPath": "averageRating", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "therapistProfiles",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "verificationStatus", "order": "ASCENDING" },
        { "fieldPath": "lowestPerSessionFee", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "therapistProfiles",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "verificationStatus", "order": "ASCENDING" },
        { "fieldPath": "yearsOfExperience", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "sessions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "therapistId", "order": "ASCENDING" },
        { "fieldPath": "sessionDate", "order": "ASCENDING" },
        { "fieldPath": "startTime", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "sessions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "patientId", "order": "ASCENDING" },
        { "fieldPath": "sessionDate", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "sessions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "packageId", "order": "ASCENDING" },
        { "fieldPath": "sessionDate", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "sessions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "sessionDate", "order": "ASCENDING" },
        { "fieldPath": "startTime", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "calendarSlots",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "date", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "startTime", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "packages",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "patientId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "packages",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "therapistId", "order": "ASCENDING" },
        { "fieldPath": "patientId", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "packages",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "therapistId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "treatmentRequests",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "therapistId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "treatmentRequests",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "patientId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "reviews",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "therapistId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "notifications",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

### 5.4 Denormalization Strategy

|Denormalized Field                  |Lives On                             |Source of Truth           |Sync Mechanism                                  |
|------------------------------------|-------------------------------------|--------------------------|------------------------------------------------|
|therapistName, therapistAvatarUrl   |sessions, packages, treatmentRequests|users doc                 |Cloud Function on users update                  |
|patientName, patientPhone           |sessions, packages, treatmentRequests|users doc                 |Cloud Function on users update                  |
|fullName, avatarUrl                 |therapistProfiles                    |users doc                 |Cloud Function on users update                  |
|patientName, patientAvatarUrl       |reviews                              |users doc                 |Cloud Function on users update                  |
|averageRating, totalReviews         |therapistProfiles                    |reviews collection        |Cloud Function on review create                 |
|totalSessions                       |therapistProfiles                    |sessions collection       |Cloud Function on session complete              |
|activePackages                      |therapistProfiles                    |packages collection       |Cloud Function on package create/complete/expire|
|lowestPerSessionFee                 |therapistProfiles                    |therapistProfiles.packages|Cloud Function on pricing update                |
|completedSessions, scheduledSessions|packages                             |sessions collection       |Cloud Function on session complete/create/cancel|
|concern                             |sessions                             |packages                  |Set at session creation time (static)           |

**Why this works at MVP scale:** With 20-50 therapists and a few hundred patients, cascading writes from a name change happen maybe once a week. Negligible overhead.

**When this breaks:** At 10K+ users. That’s when you evaluate PostgreSQL migration.

-----

## 6. Firestore Security Rules

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // ─── Helpers ─────────────────────────────────

    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    function getUserRole() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
    }

    function isAdmin() {
      return isAuthenticated() && getUserRole() == 'admin';
    }

    // ─── Users ───────────────────────────────────

    match /users/{userId} {
      allow read: if isAuthenticated() && (isOwner(userId) || isAdmin());
      allow create: if isAuthenticated() && isOwner(userId);
      allow update: if isAuthenticated() && (isOwner(userId) || isAdmin());
      allow delete: if false;
    }

    // ─── Therapist Profiles ──────────────────────

    match /therapistProfiles/{profileId} {
      allow read: if isAuthenticated() && (
        resource.data.verificationStatus == 'verified' ||
        isOwner(profileId) ||
        isAdmin()
      );
      allow create: if isAuthenticated() && isOwner(profileId);
      allow update: if isAuthenticated() && (isOwner(profileId) || isAdmin());

      match /calendarSlots/{slotId} {
        allow read: if isAuthenticated() && (
          resource.data.status == 'available' ||
          isOwner(profileId) ||
          isAdmin()
        );
        allow create, update, delete: if isAuthenticated() && (
          isOwner(profileId) || isAdmin()
        );
      }

      match /manualPatients/{patientId} {
        allow read, write: if isAuthenticated() && isOwner(profileId);
      }
    }

    // ─── Patient Profiles ────────────────────────

    match /patientProfiles/{profileId} {
      allow read, write: if isAuthenticated() && (isOwner(profileId) || isAdmin());
    }

    // ─── Treatment Requests ──────────────────────

    match /treatmentRequests/{requestId} {
      allow read: if isAuthenticated() && (
        resource.data.therapistId == request.auth.uid ||
        resource.data.patientId == request.auth.uid ||
        isAdmin()
      );
      // Patient creates requests
      allow create: if isAuthenticated() &&
        request.resource.data.patientId == request.auth.uid;
      // Therapist updates (recommend/decline), patient updates (accept)
      allow update: if isAuthenticated() && (
        resource.data.therapistId == request.auth.uid ||
        resource.data.patientId == request.auth.uid ||
        isAdmin()
      );
    }

    // ─── Packages ────────────────────────────────

    match /packages/{packageId} {
      allow read: if isAuthenticated() && (
        resource.data.therapistId == request.auth.uid ||
        resource.data.patientId == request.auth.uid ||
        isAdmin()
      );
      // Patient creates packages (from PY Choose Package screen)
      allow create: if isAuthenticated() &&
        request.resource.data.patientId == request.auth.uid;
      // Both parties and Cloud Functions can update
      allow update: if isAuthenticated() && (
        resource.data.therapistId == request.auth.uid ||
        resource.data.patientId == request.auth.uid ||
        isAdmin()
      );
    }

    // ─── Sessions ────────────────────────────────

    match /sessions/{sessionId} {
      allow read: if isAuthenticated() && (
        resource.data.therapistId == request.auth.uid ||
        resource.data.patientId == request.auth.uid ||
        isAdmin()
      );
      allow create: if isAuthenticated() && (
        request.resource.data.patientId == request.auth.uid ||
        request.resource.data.therapistId == request.auth.uid
      );
      allow update: if isAuthenticated() && (
        resource.data.therapistId == request.auth.uid ||
        resource.data.patientId == request.auth.uid ||
        isAdmin()
      );

      match /notes/{noteId} {
        // Therapist sees all notes; patient sees only shared
        allow read: if isAuthenticated() && (
          get(/databases/$(database)/documents/sessions/$(sessionId)).data.therapistId == request.auth.uid ||
          (
            get(/databases/$(database)/documents/sessions/$(sessionId)).data.patientId == request.auth.uid &&
            resource.data.isShared == true
          ) ||
          isAdmin()
        );
        allow create, update: if isAuthenticated() &&
          get(/databases/$(database)/documents/sessions/$(sessionId)).data.therapistId == request.auth.uid;
      }
    }

    // ─── Reviews (per package) ───────────────────

    match /reviews/{reviewId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() &&
        request.resource.data.patientId == request.auth.uid;
      // Therapist can only add reply
      allow update: if isAuthenticated() &&
        resource.data.therapistId == request.auth.uid &&
        request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['therapistReply', 'repliedAt']);
    }

    // ─── Notifications ───────────────────────────

    match /notifications/{notifId} {
      allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow update: if isAuthenticated() && resource.data.userId == request.auth.uid &&
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['isRead']);
      allow create: if false; // Cloud Functions only
    }

    // ─── FCM Tokens ──────────────────────────────

    match /fcmTokens/{tokenId} {
      allow read: if false;
      allow create, update: if isAuthenticated() &&
        request.resource.data.userId == request.auth.uid;
    }

    // ─── Travel Times ────────────────────────────

    match /travelTimes/{docId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
  }
}
```

-----

## 7. Cloud Functions (All Server-Side Logic)

### 7.1 Project Setup

```bash
cd physioconnect
firebase init functions
# Choose TypeScript
cd functions
npm install firebase-admin firebase-functions node-fetch
```

### 7.2 Functions Overview

|Function                   |Trigger                           |Purpose                                                                                     |
|---------------------------|----------------------------------|--------------------------------------------------------------------------------------------|
|`onTreatmentRequestCreated`|onCreate: `treatmentRequests/{id}`|Notify therapist: new patient needs assessment                                              |
|`onTreatmentRequestUpdated`|onUpdate: `treatmentRequests/{id}`|Handle recommended → notify patient; declined → notify patient                              |
|`onPackageCreated`         |onCreate: `packages/{id}`         |Notify therapist of chosen package, update treatmentRequest, increment activePackages       |
|`onPackageUpdated`         |onUpdate: `packages/{id}`         |Handle completion/expiration, decrement activePackages                                      |
|`onSessionCreated`         |onCreate: `sessions/{id}`         |Notify both parties, update package.scheduledSessions                                       |
|`onSessionUpdated`         |onUpdate: `sessions/{id}`         |Completion → package counters + review prompt. Cancellation → free slot + decrement counters|
|`onReviewCreated`          |onCreate: `reviews/{id}`          |Recalculate therapist averageRating + totalReviews                                          |
|`onUserUpdated`            |onUpdate: `users/{id}`            |Sync denormalized name/avatar across all collections                                        |
|`onTherapistPricingUpdated`|onUpdate: `therapistProfiles/{id}`|Recompute lowestPerSessionFee                                                               |
|`onTherapistSignup`        |onCreate: `therapistProfiles/{id}`|Notify admin of new verification                                                            |
|`sendScheduledReminders`   |Cloud Scheduler: every 30 min     |24h and 1h session reminders                                                                |
|`expireStaleRequests`      |Cloud Scheduler: every 6 hours    |Expire pending treatment requests older than 48h                                            |
|`expirePackages`           |Cloud Scheduler: daily at midnight|Expire active packages past expiresAt                                                       |

### 7.3 Treatment Request Created (Patient Expresses Interest)

```typescript
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const onTreatmentRequestCreated = functions
  .region("asia-south1")
  .firestore.document("treatmentRequests/{requestId}")
  .onCreate(async (snap, context) => {
    const req = snap.data();
    const requestId = context.params.requestId;

    // Only notify for "interest" source
    // Consultation-source requests are created by therapist at consult completion
    // and go straight to "recommended" status
    if (req.source !== "interest") return;

    await sendPushToUser(req.therapistId, {
      title: "New Treatment Request",
      body: `${req.patientName} needs help with ${req.concern}. Review and recommend a package.`,
      data: { type: "treatment_request", requestId },
    });

    const therapistUser = await db.collection("users").doc(req.therapistId).get();
    if (therapistUser.data()?.phone) {
      await sendSMS(
        therapistUser.data()!.phone,
        `New request: ${req.patientName} — ${req.concern}. Open PhysioConnect to recommend a package.`
      );
    }

    await db.collection("notifications").add({
      userId: req.therapistId,
      title: "New Treatment Request",
      body: `${req.patientName} — ${req.concern}`,
      type: "treatment_request",
      referenceId: requestId,
      isRead: false,
      sentVia: ["push", "sms", "in_app"],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
```

### 7.4 Treatment Request Updated (Therapist Recommends or Declines)

```typescript
export const onTreatmentRequestUpdated = functions
  .region("asia-south1")
  .firestore.document("treatmentRequests/{requestId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const requestId = context.params.requestId;

    // ── Therapist recommended a package ──
    if (before.status === "pending" && after.status === "recommended") {
      const pkgLabel = `${after.recommendedPackageType} (${after.recommendedSessions} sessions)`;

      await sendPushToUser(after.patientId, {
        title: `${after.therapistName} recommends a package`,
        body: `${pkgLabel} for ${after.concern} — ₹${after.recommendedPrice?.toLocaleString()}. Choose your package to start.`,
        data: { type: "package_recommended", requestId },
      });

      await db.collection("notifications").add({
        userId: after.patientId,
        title: `${after.therapistName} recommended a package`,
        body: `${pkgLabel} for ${after.concern}. Choose your package to start treatment.`,
        type: "package_recommended",
        referenceId: requestId,
        isRead: false,
        sentVia: ["push", "in_app"],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    // ── Therapist declined ──
    if (before.status === "pending" && after.status === "declined") {
      await sendPushToUser(after.patientId, {
        title: "Request Update",
        body: `${after.therapistName} is unable to take your case at this time. Try another therapist.`,
        data: { type: "request_declined", requestId },
      });

      await db.collection("notifications").add({
        userId: after.patientId,
        title: "Request Declined",
        body: `${after.therapistName} is unable to take your case at this time.`,
        type: "request_declined",
        referenceId: requestId,
        isRead: false,
        sentVia: ["push", "in_app"],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  });
```

### 7.5 Package Created (Patient Chose a Package)

```typescript
export const onPackageCreated = functions
  .region("asia-south1")
  .firestore.document("packages/{packageId}")
  .onCreate(async (snap, context) => {
    const pkg = snap.data();
    const packageId = context.params.packageId;

    // Increment therapist active package count
    await db.collection("therapistProfiles").doc(pkg.therapistId).update({
      activePackages: admin.firestore.FieldValue.increment(1),
    });

    // Update the treatment request to accepted
    if (pkg.treatmentRequestId) {
      await db.collection("treatmentRequests").doc(pkg.treatmentRequestId).update({
        status: "accepted",
        chosenPackageType: pkg.packageType,
        resultingPackageId: packageId,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    const packageLabel = `${pkg.packageType} (${pkg.totalSessions} sessions)`;

    // Build notification body — highlight if patient chose differently
    let body = `${pkg.patientName} chose ${packageLabel} for ${pkg.concern}`;
    if (pkg.recommendedPackageType && pkg.packageType !== pkg.recommendedPackageType) {
      body += ` (you recommended ${pkg.recommendedPackageType})`;
    }

    // Push to therapist
    await sendPushToUser(pkg.therapistId, {
      title: "Patient Started Treatment",
      body,
      data: { type: "package_started", packageId },
    });

    // SMS to therapist
    const therapistUser = await db.collection("users").doc(pkg.therapistId).get();
    if (therapistUser.data()?.phone) {
      await sendSMS(
        therapistUser.data()!.phone,
        `${pkg.patientName} chose ${packageLabel} for ${pkg.concern}. Open PhysioConnect for details.`
      );
    }

    // In-app notification
    await db.collection("notifications").add({
      userId: pkg.therapistId,
      title: "Patient Started Treatment",
      body,
      type: "package_started",
      referenceId: packageId,
      isRead: false,
      sentVia: ["push", "sms", "in_app"],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
```

### 7.6 Session Created (Package-Aware)

```typescript
export const onSessionCreated = functions
  .region("asia-south1")
  .firestore.document("sessions/{sessionId}")
  .onCreate(async (snap, context) => {
    const session = snap.data();
    const sessionId = context.params.sessionId;

    if (session.source !== "platform") return;

    // Increment package scheduledSessions
    if (session.packageId) {
      await db.collection("packages").doc(session.packageId).update({
        scheduledSessions: admin.firestore.FieldValue.increment(1),
      });
    }

    const isConsultation = session.type === "consultation";
    const title = isConsultation ? "New Consultation Booked" : "New Session Booked";
    const typeLabel = isConsultation ? "consultation" : `session ${session.sessionNumber}`;

    // Notify therapist
    await sendPushToUser(session.therapistId, {
      title,
      body: `${session.patientName} booked a ${typeLabel} on ${session.sessionDate} at ${session.startTime}`,
      data: { type: "session_booked", sessionId },
    });

    const therapistUser = await db.collection("users").doc(session.therapistId).get();
    if (therapistUser.data()?.phone) {
      await sendSMS(
        therapistUser.data()!.phone,
        `New ${typeLabel}: ${session.patientName} on ${session.sessionDate} at ${session.startTime}. ${session.address || ''} - PhysioConnect`
      );
    }

    // Notify patient
    await sendPushToUser(session.patientId, {
      title: isConsultation ? "Consultation Confirmed" : "Session Confirmed",
      body: `${isConsultation ? 'Consultation' : `Session ${session.sessionNumber}`} with ${session.therapistName} on ${session.sessionDate} at ${session.startTime}`,
      data: { type: "session_booked", sessionId },
    });

    // In-app notifications
    const batch = db.batch();
    batch.set(db.collection("notifications").doc(), {
      userId: session.therapistId,
      title,
      body: `${session.patientName} — ${session.sessionDate} at ${session.startTime}`,
      type: "session_booked",
      referenceId: sessionId,
      isRead: false,
      sentVia: ["push", "sms", "in_app"],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    batch.set(db.collection("notifications").doc(), {
      userId: session.patientId,
      title: isConsultation ? "Consultation Confirmed" : "Session Confirmed",
      body: `With ${session.therapistName} on ${session.sessionDate}`,
      type: "session_booked",
      referenceId: sessionId,
      isRead: false,
      sentVia: ["push", "in_app"],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    await batch.commit();
  });
```

### 7.7 Session Updated (Completion + Cancellation with Package Logic)

```typescript
export const onSessionUpdated = functions
  .region("asia-south1")
  .firestore.document("sessions/{sessionId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const sessionId = context.params.sessionId;

    // ── CANCELLATION ──
    if (before.status !== "cancelled" && after.status === "cancelled") {

      if (after.calendarSlotId) {
        await db
          .collection("therapistProfiles")
          .doc(after.therapistId)
          .collection("calendarSlots")
          .doc(after.calendarSlotId)
          .update({ status: "available" });
      }

      if (after.packageId) {
        await db.collection("packages").doc(after.packageId).update({
          scheduledSessions: admin.firestore.FieldValue.increment(-1),
        });
      }

      const cancelledBy = after.cancelledBy;
      const notifyUserId = cancelledBy === "patient"
        ? after.therapistId : after.patientId;

      if (notifyUserId) {
        const cancellerName = cancelledBy === "patient"
          ? after.patientName : after.therapistName;

        await sendPushToUser(notifyUserId, {
          title: "Session Cancelled",
          body: `Session on ${after.sessionDate} at ${after.startTime} cancelled by ${cancellerName}`,
          data: { type: "session_cancelled", sessionId },
        });

        const notifyUser = await db.collection("users").doc(notifyUserId).get();
        if (notifyUser.data()?.phone) {
          await sendSMS(
            notifyUser.data()!.phone,
            `Session on ${after.sessionDate} at ${after.startTime} cancelled by ${cancellerName}. Reschedule on PhysioConnect.`
          );
        }
      }
    }

    // ── COMPLETION ──
    if (before.status !== "completed" && after.status === "completed") {

      await db.collection("therapistProfiles").doc(after.therapistId).update({
        totalSessions: admin.firestore.FieldValue.increment(1),
      });

      if (after.packageId) {
        const pkgRef = db.collection("packages").doc(after.packageId);
        const pkgDoc = await pkgRef.get();
        const pkgData = pkgDoc.data()!;

        const newCompleted = (pkgData.completedSessions || 0) + 1;
        const updateData: any = {
          completedSessions: admin.firestore.FieldValue.increment(1),
        };

        if (newCompleted >= pkgData.totalSessions) {
          // Package fully completed
          updateData.status = "completed";
          updateData.completedAt = admin.firestore.FieldValue.serverTimestamp();

          await db.collection("therapistProfiles").doc(after.therapistId).update({
            activePackages: admin.firestore.FieldValue.increment(-1),
          });

          await sendPushToUser(after.patientId, {
            title: "Treatment Complete!",
            body: `Your ${pkgData.packageType} package with ${after.therapistName} is complete. How was your experience?`,
            data: { type: "review_prompt", packageId: after.packageId },
          });

          await db.collection("notifications").add({
            userId: after.patientId,
            title: "Package Complete — Leave a Review",
            body: `Rate your ${pkgData.packageType} package with ${after.therapistName}`,
            type: "review_prompt",
            referenceId: after.packageId,
            isRead: false,
            sentVia: ["push", "in_app"],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          });

        } else {
          // Prompt to schedule next
          const remaining = pkgData.totalSessions - newCompleted;
          await sendPushToUser(after.patientId, {
            title: "Session Complete",
            body: `${remaining} sessions remaining. Schedule your next session!`,
            data: { type: "schedule_next", packageId: after.packageId },
          });

          await db.collection("notifications").add({
            userId: after.patientId,
            title: "Schedule Your Next Session",
            body: `${remaining} sessions left with ${after.therapistName}`,
            type: "schedule_next",
            referenceId: after.packageId,
            isRead: false,
            sentVia: ["push", "in_app"],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }

        await pkgRef.update(updateData);
      }
    }
  });
```

### 7.8 Review, User Sync, Pricing Sync, Therapist Signup

```typescript
// ── Review Created ──
export const onReviewCreated = functions
  .region("asia-south1")
  .firestore.document("reviews/{reviewId}")
  .onCreate(async (snap) => {
    const review = snap.data();
    const reviewsSnapshot = await db
      .collection("reviews")
      .where("therapistId", "==", review.therapistId)
      .get();
    const ratings = reviewsSnapshot.docs.map((doc) => doc.data().rating);
    const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;

    await db.collection("therapistProfiles").doc(review.therapistId).update({
      averageRating: Math.round(average * 10) / 10,
      totalReviews: ratings.length,
    });
  });

// ── User Profile Sync (denormalization) ──
export const onUserUpdated = functions
  .region("asia-south1")
  .firestore.document("users/{userId}")
  .onUpdate(async (change) => {
    const before = change.before.data();
    const after = change.after.data();
    const userId = change.after.id;

    if (before.fullName === after.fullName && before.avatarUrl === after.avatarUrl) return;

    const batch = db.batch();

    if (after.role === "therapist") {
      batch.update(db.collection("therapistProfiles").doc(userId), {
        fullName: after.fullName,
        avatarUrl: after.avatarUrl || null,
      });
    }

    // Sync across sessions, packages, treatmentRequests, reviews
    const collections = [
      { col: "sessions", idField: "therapistId", nameField: "therapistName", avatarField: "therapistAvatarUrl" },
      { col: "sessions", idField: "patientId", nameField: "patientName", avatarField: null },
      { col: "packages", idField: "therapistId", nameField: "therapistName", avatarField: "therapistAvatarUrl" },
      { col: "packages", idField: "patientId", nameField: "patientName", avatarField: null },
      { col: "treatmentRequests", idField: "therapistId", nameField: "therapistName", avatarField: "therapistAvatarUrl" },
      { col: "treatmentRequests", idField: "patientId", nameField: "patientName", avatarField: null },
      { col: "reviews", idField: "patientId", nameField: "patientName", avatarField: "patientAvatarUrl" },
    ];

    for (const { col, idField, nameField, avatarField } of collections) {
      const snap = await db.collection(col).where(idField, "==", userId).get();
      snap.docs.forEach((doc) => {
        const update: any = { [nameField]: after.fullName };
        if (avatarField) update[avatarField] = after.avatarUrl || null;
        batch.update(doc.ref, update);
      });
    }

    await batch.commit();
  });

// ── Therapist Pricing → Recompute lowestPerSessionFee ──
export const onTherapistPricingUpdated = functions
  .region("asia-south1")
  .firestore.document("therapistProfiles/{profileId}")
  .onUpdate(async (change) => {
    const before = change.before.data();
    const after = change.after.data();

    if (JSON.stringify(before.packages) === JSON.stringify(after.packages)) return;

    let lowestFee = Infinity;
    for (const key of ["starter", "standard", "intensive"]) {
      const pkg = after.packages?.[key];
      if (pkg?.enabled && pkg.sessions > 0) {
        const perSession = pkg.totalPrice / pkg.sessions;
        if (perSession < lowestFee) lowestFee = perSession;
      }
    }
    if (lowestFee === Infinity) lowestFee = 0;

    await change.after.ref.update({ lowestPerSessionFee: Math.round(lowestFee) });
  });

// ── Therapist Signup → Notify Admin ──
export const onTherapistSignup = functions
  .region("asia-south1")
  .firestore.document("therapistProfiles/{profileId}")
  .onCreate(async (snap) => {
    const profile = snap.data();
    const admins = await db.collection("users").where("role", "==", "admin").get();

    for (const adminDoc of admins.docs) {
      await sendPushToUser(adminDoc.id, {
        title: "New Therapist Registration",
        body: `${profile.fullName} has registered and needs verification`,
        data: { type: "verification_needed", profileId: snap.id },
      });
      await db.collection("notifications").add({
        userId: adminDoc.id,
        title: "New Therapist — Verification Needed",
        body: `${profile.fullName} has registered`,
        type: "verification_needed",
        referenceId: snap.id,
        isRead: false,
        sentVia: ["push", "in_app"],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  });
```

### 7.9 Scheduled Reminders (Cron — Every 30 Minutes)

```typescript
export const sendScheduledReminders = functions
  .region("asia-south1")
  .pubsub.schedule("every 30 minutes")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    const now = new Date();

    // ── 24-hour reminders ──
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowDate = tomorrow.toISOString().split("T")[0];
    const tomorrowHour = tomorrow.toTimeString().slice(0, 5);
    const tomorrowHourEnd = new Date(tomorrow.getTime() + 30 * 60 * 1000)
      .toTimeString().slice(0, 5);

    const sessions24h = await db
      .collection("sessions")
      .where("status", "==", "upcoming")
      .where("sessionDate", "==", tomorrowDate)
      .where("startTime", ">=", tomorrowHour)
      .where("startTime", "<", tomorrowHourEnd)
      .get();

    for (const doc of sessions24h.docs) {
      const session = doc.data();
      const therapistUser = await db.collection("users").doc(session.therapistId).get();
      if (therapistUser.data()?.phone) {
        const name = session.source === "platform" ? session.patientName : session.manualPatientName;
        await sendSMS(therapistUser.data()!.phone,
          `Reminder: Session with ${name} tomorrow at ${session.startTime}. - PhysioConnect`);
      }
      if (session.source === "platform" && session.patientId) {
        await sendPushToUser(session.patientId, {
          title: "Session Tomorrow",
          body: `Your session with ${session.therapistName} is tomorrow at ${session.startTime}`,
          data: { type: "reminder_24h", sessionId: doc.id },
        });
        const patientUser = await db.collection("users").doc(session.patientId).get();
        if (patientUser.data()?.phone) {
          await sendSMS(patientUser.data()!.phone,
            `Reminder: Physiotherapy session tomorrow at ${session.startTime} with ${session.therapistName}. - PhysioConnect`);
        }
      }
    }

    // ── 1-hour reminders (same pattern) ──
    const oneHour = new Date(now.getTime() + 60 * 60 * 1000);
    const oneHourDate = oneHour.toISOString().split("T")[0];
    const oneHourStart = oneHour.toTimeString().slice(0, 5);
    const oneHourEnd = new Date(oneHour.getTime() + 30 * 60 * 1000).toTimeString().slice(0, 5);

    const sessions1h = await db.collection("sessions")
      .where("status", "==", "upcoming")
      .where("sessionDate", "==", oneHourDate)
      .where("startTime", ">=", oneHourStart)
      .where("startTime", "<", oneHourEnd)
      .get();

    for (const doc of sessions1h.docs) {
      const session = doc.data();
      if (session.source === "platform" && session.patientId) {
        await sendPushToUser(session.patientId, {
          title: "Session in 1 Hour",
          body: `Your session with ${session.therapistName} starts at ${session.startTime}`,
          data: { type: "reminder_1h", sessionId: doc.id },
        });
      }
      await sendPushToUser(session.therapistId, {
        title: "Session in 1 Hour",
        body: `${session.source === "platform" ? session.patientName : session.manualPatientName} at ${session.startTime}`,
        data: { type: "reminder_1h", sessionId: doc.id },
      });
    }

    return null;
  });
```

### 7.10 Expire Stale Treatment Requests (Cron — Every 6 Hours)

```typescript
export const expireStaleRequests = functions
  .region("asia-south1")
  .pubsub.schedule("every 6 hours")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48 hours ago

    const stale = await db.collection("treatmentRequests")
      .where("status", "==", "pending")
      .where("createdAt", "<=", admin.firestore.Timestamp.fromDate(cutoff))
      .get();

    for (const doc of stale.docs) {
      const req = doc.data();
      await doc.ref.update({ status: "expired", updatedAt: admin.firestore.FieldValue.serverTimestamp() });

      await sendPushToUser(req.patientId, {
        title: "Request Expired",
        body: `${req.therapistName} didn't respond in time. Try another therapist for your ${req.concern}.`,
        data: { type: "request_expired", requestId: doc.id },
      });

      await db.collection("notifications").add({
        userId: req.patientId,
        title: "Request Expired",
        body: `No response from ${req.therapistName}. Try searching for another therapist.`,
        type: "request_expired",
        referenceId: doc.id,
        isRead: false,
        sentVia: ["push", "in_app"],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    return null;
  });
```

### 7.11 Expire Packages (Daily Cron)

```typescript
export const expirePackages = functions
  .region("asia-south1")
  .pubsub.schedule("every day 00:00")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    const now = admin.firestore.Timestamp.now();
    const expired = await db.collection("packages")
      .where("status", "==", "active")
      .where("expiresAt", "<=", now)
      .get();

    const batch = db.batch();
    const expiredList: any[] = [];

    for (const doc of expired.docs) {
      const pkg = doc.data();
      if (pkg.completedSessions < pkg.totalSessions) {
        batch.update(doc.ref, { status: "expired" });
        batch.update(db.collection("therapistProfiles").doc(pkg.therapistId),
          { activePackages: admin.firestore.FieldValue.increment(-1) });
        expiredList.push({ id: doc.id, ...pkg });
      }
    }
    await batch.commit();

    for (const pkg of expiredList) {
      const remaining = pkg.totalSessions - pkg.completedSessions;
      await sendPushToUser(pkg.patientId, {
        title: "Package Expired",
        body: `Your ${pkg.packageType} package with ${pkg.therapistName} expired with ${remaining} unused sessions.`,
        data: { type: "package_expired", packageId: pkg.id },
      });
      await sendPushToUser(pkg.therapistId, {
        title: "Package Expired",
        body: `${pkg.patientName}'s ${pkg.packageType} package expired with ${remaining} unused sessions.`,
        data: { type: "package_expired", packageId: pkg.id },
      });
    }
    return null;
  });
```

### 7.12 Helper Functions (SMS + Push)

```typescript
// functions/src/helpers/sms.ts
import fetch from "node-fetch";
import * as functions from "firebase-functions";
const MSG91_AUTH_KEY = functions.config().msg91.auth_key;

export async function sendSMS(phone: string, message: string) {
  try {
    const formattedPhone = phone.startsWith("91") ? phone : `91${phone}`;
    await fetch("https://control.msg91.com/api/v5/flow/", {
      method: "POST",
      headers: { authkey: MSG91_AUTH_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        template_id: functions.config().msg91.template_id,
        recipients: [{ mobiles: formattedPhone, message }],
      }),
    });
  } catch (error) {
    console.error("SMS send failed:", error);
  }
}

// functions/src/helpers/push.ts
import * as admin from "firebase-admin";

export async function sendPushToUser(
  userId: string,
  notification: { title: string; body: string; data?: Record<string, string> }
) {
  try {
    const tokensSnapshot = await admin.firestore()
      .collection("fcmTokens")
      .where("userId", "==", userId)
      .where("isActive", "==", true)
      .get();
    if (tokensSnapshot.empty) return;

    const tokens = tokensSnapshot.docs.map((doc) => doc.data().token);
    const response = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: { title: notification.title, body: notification.body },
      data: notification.data || {},
    });

    response.responses.forEach((resp, idx) => {
      if (!resp.success && resp.error?.code === "messaging/registration-token-not-registered") {
        tokensSnapshot.docs[idx].ref.update({ isActive: false });
      }
    });
  } catch (error) {
    console.error("Push send failed:", error);
  }
}
```

-----

## 8. Flutter App Architecture

### 8.1 Folder Structure

```
lib/
├── main.dart
├── app.dart
│
├── config/
│   ├── firebase_options.dart
│   ├── constants.dart
│   ├── theme.dart
│   └── routes.dart
│
├── models/
│   ├── user_model.dart
│   ├── therapist_profile.dart
│   ├── patient_profile.dart
│   ├── treatment_request_model.dart
│   ├── package_model.dart
│   ├── session_model.dart
│   ├── calendar_slot.dart
│   ├── review_model.dart
│   ├── session_note.dart
│   └── notification_model.dart
│
├── services/
│   ├── auth_service.dart
│   ├── therapist_service.dart
│   ├── patient_service.dart
│   ├── treatment_request_service.dart
│   ├── package_service.dart
│   ├── session_service.dart
│   ├── review_service.dart
│   ├── notification_service.dart
│   └── storage_service.dart
│
├── providers/
│   ├── auth_provider.dart
│   ├── therapist_provider.dart
│   ├── calendar_provider.dart
│   ├── treatment_request_provider.dart
│   ├── package_provider.dart
│   ├── session_provider.dart
│   ├── review_provider.dart
│   └── notification_provider.dart
│
├── screens/
│   ├── auth/
│   │   ├── login_screen.dart
│   │   ├── signup_screen.dart
│   │   └── role_selection_screen.dart
│   │
│   ├── patient/
│   │   ├── patient_home_screen.dart
│   │   ├── patient_onboarding_screen.dart
│   │   ├── therapist_search_screen.dart
│   │   ├── therapist_detail_screen.dart
│   │   ├── express_interest_screen.dart
│   │   ├── request_sent_screen.dart
│   │   ├── choose_package_screen.dart
│   │   ├── consultation_booking_screen.dart
│   │   ├── package_started_screen.dart
│   │   ├── package_detail_screen.dart
│   │   ├── schedule_session_screen.dart
│   │   ├── my_packages_screen.dart
│   │   ├── progress_screen.dart
│   │   ├── write_review_screen.dart
│   │   ├── patient_profile_screen.dart
│   │   └── notifications_screen.dart
│   │
│   ├── therapist/
│   │   ├── therapist_home_screen.dart
│   │   ├── therapist_onboarding/
│   │   │   ├── step1_personal_screen.dart
│   │   │   ├── step2_professional_screen.dart
│   │   │   └── step3_pricing_screen.dart
│   │   ├── calendar_screen.dart
│   │   ├── manage_availability_screen.dart
│   │   ├── add_session_screen.dart
│   │   ├── patient_list_screen.dart
│   │   ├── patient_detail_screen.dart
│   │   ├── session_complete_screen.dart
│   │   ├── recommend_package_sheet.dart
│   │   ├── reviews_screen.dart
│   │   ├── therapist_profile_screen.dart
│   │   └── manage_pricing_screen.dart
│   │
│   └── admin/
│       ├── admin_dashboard_screen.dart
│       ├── verification_queue_screen.dart
│       └── user_management_screen.dart
│
├── widgets/
│   ├── session_card.dart
│   ├── package_card.dart
│   ├── package_progress_bar.dart
│   ├── treatment_request_card.dart
│   ├── therapist_card.dart
│   ├── slot_picker.dart
│   ├── split_notes_form.dart
│   ├── rating_stars.dart
│   ├── review_card.dart
│   ├── calendar_day_view.dart
│   ├── loading_indicator.dart
│   ├── empty_state.dart
│   └── confirmation_dialog.dart
│
└── utils/
    ├── date_helpers.dart
    ├── validators.dart
    └── formatters.dart
```

### 8.2 Key Service: Treatment Requests

```dart
class TreatmentRequestService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  // FLOW A: Patient expresses interest
  Future<String> expressInterest({
    required String therapistId,
    required String patientId,
    required String concern,
    required String concernDescription,
    required String address,
    required String area,
  }) async {
    final therapistDoc = await _db.collection('therapistProfiles').doc(therapistId).get();
    final patientDoc = await _db.collection('users').doc(patientId).get();

    final ref = _db.collection('treatmentRequests').doc();
    await ref.set({
      'patientId': patientId,
      'therapistId': therapistId,
      'concern': concern,
      'concernDescription': concernDescription,
      'address': address,
      'area': area,
      'source': 'interest',
      'status': 'pending',
      'therapistName': therapistDoc.data()!['fullName'],
      'therapistAvatarUrl': therapistDoc.data()!['avatarUrl'],
      'patientName': patientDoc.data()!['fullName'],
      'createdAt': FieldValue.serverTimestamp(),
      'updatedAt': FieldValue.serverTimestamp(),
    });
    return ref.id;
  }

  // Therapist recommends a package
  Future<void> recommend({
    required String requestId,
    required String packageType,
    required int sessions,
    required int price,
    required String note,
  }) async {
    await _db.collection('treatmentRequests').doc(requestId).update({
      'recommendedPackageType': packageType,
      'recommendedSessions': sessions,
      'recommendedPrice': price,
      'recommendationNote': note,
      'recommendedAt': FieldValue.serverTimestamp(),
      'status': 'recommended',
      'updatedAt': FieldValue.serverTimestamp(),
    });
  }

  // Therapist declines
  Future<void> decline(String requestId) async {
    await _db.collection('treatmentRequests').doc(requestId).update({
      'status': 'declined',
      'updatedAt': FieldValue.serverTimestamp(),
    });
  }

  // Patient's pending + recommended requests
  Stream<List<TreatmentRequestModel>> getActiveRequests(String patientId) {
    return _db.collection('treatmentRequests')
      .where('patientId', isEqualTo: patientId)
      .where('status', whereIn: ['pending', 'recommended'])
      .snapshots()
      .map((snap) => snap.docs
        .map((d) => TreatmentRequestModel.fromFirestore(d))
        .toList());
  }

  // Therapist's pending requests
  Stream<List<TreatmentRequestModel>> getPendingForTherapist(String therapistId) {
    return _db.collection('treatmentRequests')
      .where('therapistId', isEqualTo: therapistId)
      .where('status', isEqualTo: 'pending')
      .snapshots()
      .map((snap) => snap.docs
        .map((d) => TreatmentRequestModel.fromFirestore(d))
        .toList());
  }
}
```

### 8.3 Key Service: Package (Patient Chooses After Recommendation)

```dart
class PackageService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  // Patient chooses a package (from PY Choose Package screen)
  Future<String> choosePackage({
    required String treatmentRequestId,
    required String therapistId,
    required String patientId,
    required String packageType,
  }) async {
    final therapistDoc = await _db.collection('therapistProfiles').doc(therapistId).get();
    final therapistData = therapistDoc.data()!;
    final pkgConfig = therapistData['packages'][packageType];

    final reqDoc = await _db.collection('treatmentRequests').doc(treatmentRequestId).get();
    final reqData = reqDoc.data()!;

    final patientDoc = await _db.collection('users').doc(patientId).get();
    final patientData = patientDoc.data()!;

    final now = DateTime.now();
    final expiresAt = DateTime(now.year, now.month + pkgConfig['validityMonths'], now.day);

    final packageRef = _db.collection('packages').doc();
    await packageRef.set({
      'therapistId': therapistId,
      'patientId': patientId,
      'packageType': packageType,
      'totalSessions': pkgConfig['sessions'],
      'completedSessions': 0,
      'scheduledSessions': 0,
      'totalPrice': pkgConfig['totalPrice'],
      'perSessionPrice': (pkgConfig['totalPrice'] / pkgConfig['sessions']).round(),
      'validityMonths': pkgConfig['validityMonths'],
      'concern': reqData['concern'],
      'concernDescription': reqData['concernDescription'],
      'address': reqData['address'],
      'area': reqData['area'],
      'status': 'active',
      'source': reqData['source'],
      'treatmentRequestId': treatmentRequestId,
      'recommendedPackageType': reqData['recommendedPackageType'],
      'therapistName': therapistData['fullName'],
      'therapistAvatarUrl': therapistData['avatarUrl'],
      'patientName': patientData['fullName'],
      'startedAt': FieldValue.serverTimestamp(),
      'expiresAt': Timestamp.fromDate(expiresAt),
      'createdAt': FieldValue.serverTimestamp(),
      'updatedAt': FieldValue.serverTimestamp(),
    });

    return packageRef.id;
  }

  Stream<List<PackageModel>> getActivePackages(String patientId) {
    return _db.collection('packages')
      .where('patientId', isEqualTo: patientId)
      .where('status', isEqualTo: 'active')
      .snapshots()
      .map((snap) => snap.docs.map((d) => PackageModel.fromFirestore(d)).toList());
  }
}
```

### 8.4 Key Service: Session Booking Within Package

```dart
class SessionService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<String> bookPackageSession({
    required String packageId,
    required String therapistId,
    required String patientId,
    required String slotId,
    required String address,
    required String area,
  }) async {
    return _db.runTransaction<String>((transaction) async {
      final slotRef = _db.collection('therapistProfiles')
        .doc(therapistId).collection('calendarSlots').doc(slotId);
      final slotDoc = await transaction.get(slotRef);
      if (!slotDoc.exists || slotDoc.data()!['status'] != 'available') {
        throw Exception('Slot is no longer available');
      }

      final pkgDoc = await transaction.get(_db.collection('packages').doc(packageId));
      final pkgData = pkgDoc.data()!;
      final scheduled = pkgData['scheduledSessions'] ?? 0;
      final completed = pkgData['completedSessions'] ?? 0;
      if (scheduled + completed >= pkgData['totalSessions']) {
        throw Exception('No sessions remaining in this package');
      }

      final slotData = slotDoc.data()!;
      final sessionNumber = completed + scheduled + 1;

      transaction.update(slotRef, {'status': 'booked'});

      final sessionRef = _db.collection('sessions').doc();
      transaction.set(sessionRef, {
        'therapistId': therapistId,
        'patientId': patientId,
        'calendarSlotId': slotId,
        'source': 'platform',
        'type': 'session',
        'packageId': packageId,
        'sessionNumber': sessionNumber,
        'sessionDate': slotData['date'],
        'startTime': slotData['startTime'],
        'endTime': slotData['endTime'],
        'area': area,
        'address': address,
        'feeAmount': pkgData['perSessionPrice'],
        'concern': pkgData['concern'],
        'status': 'upcoming',
        'bookingStatus': 'confirmed',
        'therapistName': pkgData['therapistName'],
        'therapistAvatarUrl': pkgData['therapistAvatarUrl'],
        'patientName': pkgData['patientName'],
        'bookedAt': FieldValue.serverTimestamp(),
        'createdAt': FieldValue.serverTimestamp(),
        'updatedAt': FieldValue.serverTimestamp(),
      });
      return sessionRef.id;
    });
  }

  Future<String> bookConsultation({
    required String therapistId,
    required String patientId,
    required String slotId,
    required String mode,
    required String concern,
    required String concernDescription,
    required String? address,
    required String? area,
  }) async {
    return _db.runTransaction<String>((transaction) async {
      final slotRef = _db.collection('therapistProfiles')
        .doc(therapistId).collection('calendarSlots').doc(slotId);
      final slotDoc = await transaction.get(slotRef);
      if (!slotDoc.exists || slotDoc.data()!['status'] != 'available') {
        throw Exception('Slot is no longer available');
      }

      final slotData = slotDoc.data()!;
      final therapistDoc = await transaction.get(
        _db.collection('therapistProfiles').doc(therapistId));
      final therapistData = therapistDoc.data()!;
      final patientDoc = await transaction.get(
        _db.collection('users').doc(patientId));
      final patientData = patientDoc.data()!;

      transaction.update(slotRef, {'status': 'booked'});

      final sessionRef = _db.collection('sessions').doc();
      transaction.set(sessionRef, {
        'therapistId': therapistId, 'patientId': patientId,
        'calendarSlotId': slotId, 'source': 'platform',
        'type': 'consultation', 'consultationMode': mode,
        'packageId': null, 'sessionNumber': null,
        'sessionDate': slotData['date'],
        'startTime': slotData['startTime'], 'endTime': slotData['endTime'],
        'area': area ?? '', 'address': address ?? '',
        'feeAmount': therapistData['consultationFee'] ?? 0,
        'concern': concern, 'status': 'upcoming', 'bookingStatus': 'confirmed',
        'therapistName': therapistData['fullName'],
        'therapistAvatarUrl': therapistData['avatarUrl'],
        'patientName': patientData['fullName'],
        'patientPhone': patientData['phone'],
        'bookedAt': FieldValue.serverTimestamp(),
        'createdAt': FieldValue.serverTimestamp(),
        'updatedAt': FieldValue.serverTimestamp(),
      });
      return sessionRef.id;
    });
  }
}
```

### 8.5 Real-Time Calendar + Therapist Search

```dart
// Real-time therapist day view
@riverpod
Stream<List<dynamic>> therapistDaySchedule(
  TherapistDayScheduleRef ref, String therapistId, String date,
) {
  final db = FirebaseFirestore.instance;
  final sessionsStream = db.collection('sessions')
    .where('therapistId', isEqualTo: therapistId)
    .where('sessionDate', isEqualTo: date)
    .where('status', whereIn: ['upcoming', 'in_progress', 'completed'])
    .orderBy('startTime').snapshots()
    .map((snap) => snap.docs.map((d) => SessionModel.fromFirestore(d)).toList());

  final slotsStream = db.collection('therapistProfiles')
    .doc(therapistId).collection('calendarSlots')
    .where('date', isEqualTo: date).where('status', isEqualTo: 'available')
    .orderBy('startTime').snapshots()
    .map((snap) => snap.docs.map((d) => CalendarSlot.fromFirestore(d)).toList());

  return Rx.combineLatest2(sessionsStream, slotsStream,
    (sessions, slots) => mergeDaySchedule(sessions, slots));
}

// Therapist search with package-price sort
class TherapistService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<List<TherapistProfile>> searchTherapists({
    required String area, String? specialization, String sortBy = 'rating',
  }) async {
    Query query = _db.collection('therapistProfiles')
      .where('verificationStatus', isEqualTo: 'verified')
      .where('serviceAreas', arrayContains: area);

    if (sortBy == 'rating') query = query.orderBy('averageRating', descending: true);
    else if (sortBy == 'price') query = query.orderBy('lowestPerSessionFee');
    else if (sortBy == 'experience') query = query.orderBy('yearsOfExperience', descending: true);

    final snapshot = await query.limit(50).get();
    var results = snapshot.docs.map((doc) => TherapistProfile.fromFirestore(doc)).toList();

    if (specialization != null) {
      results = results.where((t) => t.specializations.contains(specialization)).toList();
    }
    return results;
  }
}
```

### 8.6 Navigation & Role-Based Routing

```dart
final router = GoRouter(
  initialLocation: '/login',
  redirect: (context, state) {
    final auth = ref.read(authProvider);
    final isLoggedIn = auth.isLoggedIn;
    final role = auth.role;
    final isAuthRoute = state.matchedLocation.startsWith('/login') ||
                        state.matchedLocation.startsWith('/signup');

    if (!isLoggedIn && !isAuthRoute) return '/login';
    if (isLoggedIn && isAuthRoute) {
      switch (role) {
        case 'therapist': return '/therapist/home';
        case 'admin': return '/admin/dashboard';
        default: return '/patient/home';
      }
    }
    return null;
  },
  routes: [
    GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
    GoRoute(path: '/signup', builder: (_, __) => const SignupScreen()),
    GoRoute(path: '/role-selection', builder: (_, __) => const RoleSelectionScreen()),

    // Patient shell
    ShellRoute(
      builder: (_, __, child) => PatientShell(child: child),
      routes: [
        GoRoute(path: '/patient/home', builder: (_, __) => const PatientHomeScreen()),
        GoRoute(path: '/patient/search', builder: (_, __) => const TherapistSearchScreen()),
        GoRoute(path: '/patient/packages', builder: (_, __) => const MyPackagesScreen()),
        GoRoute(path: '/patient/progress', builder: (_, __) => const ProgressScreen()),
        GoRoute(path: '/patient/profile', builder: (_, __) => const PatientProfileScreen()),
      ],
    ),
    GoRoute(path: '/therapist/:id', builder: (_, state) =>
      TherapistDetailScreen(therapistId: state.pathParameters['id']!)),
    GoRoute(path: '/interest/:therapistId', builder: (_, state) =>
      ExpressInterestScreen(therapistId: state.pathParameters['therapistId']!)),
    GoRoute(path: '/choose-package/:requestId', builder: (_, state) =>
      ChoosePackageScreen(requestId: state.pathParameters['requestId']!)),
    GoRoute(path: '/package/:id', builder: (_, state) =>
      PackageDetailScreen(packageId: state.pathParameters['id']!)),
    GoRoute(path: '/schedule/:packageId', builder: (_, state) =>
      ScheduleSessionScreen(packageId: state.pathParameters['packageId']!)),

    // Therapist shell
    ShellRoute(
      builder: (_, __, child) => TherapistShell(child: child),
      routes: [
        GoRoute(path: '/therapist/home', builder: (_, __) => const TherapistHomeScreen()),
        GoRoute(path: '/therapist/calendar', builder: (_, __) => const CalendarScreen()),
        GoRoute(path: '/therapist/patients', builder: (_, __) => const PatientListScreen()),
        GoRoute(path: '/therapist/reviews', builder: (_, __) => const ReviewsScreen()),
        GoRoute(path: '/therapist/profile', builder: (_, __) => const TherapistProfileScreen()),
      ],
    ),

    // Admin shell
    ShellRoute(
      builder: (_, __, child) => AdminShell(child: child),
      routes: [
        GoRoute(path: '/admin/dashboard', builder: (_, __) => const AdminDashboardScreen()),
        GoRoute(path: '/admin/verify', builder: (_, __) => const VerificationQueueScreen()),
        GoRoute(path: '/admin/users', builder: (_, __) => const UserManagementScreen()),
      ],
    ),
  ],
);
```

-----

## 9. Push Notifications (FCM)

```dart
class NotificationService {
  final FirebaseMessaging _messaging = FirebaseMessaging.instance;
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<void> initialize(String userId) async {
    await _messaging.requestPermission();
    final token = await _messaging.getToken();
    if (token != null) await _saveToken(userId, token);
    _messaging.onTokenRefresh.listen((t) => _saveToken(userId, t));
    FirebaseMessaging.onMessage.listen(_handleForegroundMessage);
    FirebaseMessaging.onMessageOpenedApp.listen(_handleNotificationTap);
    final initial = await _messaging.getInitialMessage();
    if (initial != null) _handleNotificationTap(initial);
  }

  Future<void> _saveToken(String userId, String token) async {
    await _db.collection('fcmTokens').doc(token).set({
      'userId': userId, 'token': token,
      'deviceType': Platform.isIOS ? 'ios' : 'android',
      'isActive': true, 'updatedAt': FieldValue.serverTimestamp(),
    }, SetOptions(merge: true));
  }

  void _handleForegroundMessage(RemoteMessage message) {
    FlutterLocalNotificationsPlugin().show(message.hashCode,
      message.notification?.title, message.notification?.body,
      const NotificationDetails(
        android: AndroidNotificationDetails('default', 'Default', importance: Importance.high),
        iOS: DarwinNotificationDetails()));
  }

  void _handleNotificationTap(RemoteMessage message) {
    final type = message.data['type'];
    switch (type) {
      case 'treatment_request':
        GoRouter.of(context).push('/therapist/home'); break;
      case 'package_recommended':
        GoRouter.of(context).push('/choose-package/${message.data['requestId']}'); break;
      case 'request_declined':
      case 'request_expired':
        GoRouter.of(context).push('/patient/search'); break;
      case 'package_started':
      case 'schedule_next':
      case 'package_expired':
        GoRouter.of(context).push('/package/${message.data['packageId']}'); break;
      case 'session_booked':
      case 'session_cancelled':
      case 'reminder_24h':
      case 'reminder_1h':
        GoRouter.of(context).push('/session/${message.data['sessionId']}'); break;
      case 'review_prompt':
        GoRouter.of(context).push('/review/${message.data['packageId']}'); break;
    }
  }
}
```

-----

## 10. Cloud Storage

```dart
class StorageService {
  final FirebaseStorage _storage = FirebaseStorage.instance;

  Future<String> uploadAvatar(String userId, File imageFile) async {
    final ref = _storage.ref().child('avatars/$userId/profile.jpg');
    await ref.putFile(imageFile, SettableMetadata(contentType: 'image/jpeg'));
    return await ref.getDownloadURL();
  }

  Future<String> uploadCertificate(String therapistId, File file) async {
    final ext = file.path.split('.').last;
    final ref = _storage.ref().child('certificates/$therapistId/degree.$ext');
    await ref.putFile(file);
    return await ref.getDownloadURL();
  }
}
```

**Storage Security Rules:**

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /certificates/{therapistId}/{fileName} {
      allow read: if request.auth != null && (
        request.auth.uid == therapistId || isAdmin());
      allow write: if request.auth != null && request.auth.uid == therapistId;
    }
    function isAdmin() {
      return firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

-----

## 11. SMS Integration (MSG91)

1. Create account on msg91.com
1. Register sender ID (e.g., “PHYSIO”)
1. Create DLT templates (required by TRAI): treatment request notification, package recommendation, session confirmation, 24h reminder, 1h reminder, cancellation, package completion
1. Get auth key and template IDs
1. Store in Cloud Functions config:

```bash
firebase functions:config:set msg91.auth_key="YOUR_KEY" msg91.template_id="YOUR_TEMPLATE"
```

**Start DLT registration on Day 1 — TRAI approval takes 2-7 business days.**

|Scale                             |Monthly SMS|Cost  |
|----------------------------------|:---------:|:----:|
|50 patients, 200 sessions/month   |~1,200     |₹216  |
|200 patients, 800 sessions/month  |~5,000     |₹900  |
|500 patients, 2,000 sessions/month|~12,000    |₹2,160|

-----

## 12. Build Plan — 7 Weeks

### Week 1: Foundation

|Day|Task                                                                                                                                  |Deliverable     |
|:-:|--------------------------------------------------------------------------------------------------------------------------------------|----------------|
|1  |Create all accounts. Buy domain. Register DLT templates.                                                                              |Accounts active |
|2  |Flutter project + Firebase setup + FlutterFire configure.                                                                             |Project compiles|
|3  |Firestore collections, deploy security rules + indexes.                                                                               |Database ready  |
|4  |Auth flow: signup, login, role selection, logout.                                                                                     |Auth works      |
|5  |Patient onboarding (area, phone). Therapist 3-step onboarding (personal, professional, pricing + consultation settings). Photo upload.|Onboarding works|
|6-7|Buffer. Test on Android + iOS.                                                                                                        |Clean auth      |

### Week 2: Therapist Calendar (Core Feature)

|Day|Task                                                                                         |Deliverable           |
|:-:|---------------------------------------------------------------------------------------------|----------------------|
|1  |CalendarSlots management: set recurring weekly availability, generate slots for next 2 weeks.|Schedule defined      |
|2  |Therapist daily view (T2): sessions + available slots. Real-time stream.                     |Core calendar works   |
|3  |Add Manual Session (T5): therapist logs own patient.                                         |Manual sessions logged|
|4  |Slot management: block time, modify availability, delete slots.                              |Full calendar control |
|5  |Week view (T3): grid of busy vs. free.                                                       |Weekly overview       |
|6-7|Real-time subscription. Calendar updates live when booking arrives.                          |Calendar feels alive  |

### Week 3: Patient Search + Treatment Request Flow

|Day|Task                                                                                                                       |Deliverable         |
|:-:|---------------------------------------------------------------------------------------------------------------------------|--------------------|
|1  |Therapist search (P3): area filter, sort by rating/price/experience. Package prices in cards (informational).              |Search works        |
|2  |Therapist detail (P4): profile, consultation section, package info (no buy buttons), reviews. Single “Start Treatment” CTA.|Detail page works   |
|3  |**Express Interest flow (Flow A):** P5 → enter concern + address → creates treatmentRequest → P5c confirmation.            |Request flow works  |
|4  |**Therapist Recommend (TX):** Bottom sheet on T2 — reads concern, picks package, writes note → updates treatmentRequest.   |Recommend flow works|
|5  |**Choose Package (PY):** Patient sees recommendation + all packages → picks one → package created → P6 (Package Started).  |End-to-end Flow A   |
|6-7|Consultation booking (P5b). Test: patient books consultation → therapist completes → recommends → patient chooses on PY.   |Both flows working  |

### Week 4: Package Management + Session Lifecycle

|Day|Task                                                                                                                                                                         |Deliverable             |
|:-:|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|
|1  |Patient home (P2): active packages with progress, “Choose Your Package” cards, “Awaiting Recommendation” cards.                                                              |Home redesigned         |
|2  |Package detail (P7): progress, upcoming sessions, completed with public notes. Schedule session within package (P8).                                                         |Package hub works       |
|3  |My Packages (P9: active/past tabs).                                                                                                                                          |Package management works|
|4  |Session complete (T7): split notes (public 👁️ + private 🔒), actual end time.                                                                                                  |Completion works        |
|5  |**Flow B post-consultation:** Therapist completes consultation → TX bottom sheet creates treatmentRequest with source=consultation + status=recommended → patient sees on PY.|Flow B works            |
|6-7|Reschedule/cancel flows. Verify package counter updates. Edge cases.                                                                                                         |Full lifecycle          |

### Week 5: Notifications + Reviews + Admin

|Day|Task                                                                             |Deliverable                 |
|:-:|---------------------------------------------------------------------------------|----------------------------|
|1  |Deploy: onTreatmentRequestCreated, onTreatmentRequestUpdated.                    |Request notifications work  |
|2  |Deploy: onPackageCreated, onSessionCreated, onSessionUpdated.                    |Package + session automation|
|3  |FCM push in Flutter. SMS via MSG91. Deep linking from notifications.             |Push + SMS working          |
|4  |Deploy crons: sendScheduledReminders, expireStaleRequests, expirePackages.       |Auto-reminders + expiry     |
|5  |Review flow: prompted at package completion, per-package rating, therapist reply.|Reviews work                |
|6-7|Admin screens (A1-A3). In-app notification list (P12).                           |Admin + notifications done  |

### Week 6: Therapist Features + Polish

|Day|Task                                                                                        |Deliverable         |
|:-:|--------------------------------------------------------------------------------------------|--------------------|
|1  |Therapist patient list (T6). Patient detail (T9, package history + notes + request history).|Therapist views done|
|2  |Manage pricing (T11). Therapist profile with pricing section (T10).                         |Pricing management  |
|3  |Progress screen (P10). Saved addresses in patient profile (P11).                            |Patient polish      |
|4-5|Full end-to-end testing. UI polish: loading, empty states, errors.                          |Feature complete    |
|6-7|Performance: image caching, list pagination, offline handling.                              |Stable build        |

### Week 7: Launch Prep

|Day|Task                                                                       |Deliverable       |
|:-:|---------------------------------------------------------------------------|------------------|
|1  |Onboard 5-10 therapists. Set up pricing, verify, populate calendars.       |Supply ready      |
|2  |Build release APK. Internal testing with real therapists.                  |Real-world test   |
|3-4|Fix bugs. Performance checks.                                              |Stable            |
|5  |Submit to Play Store (internal track). TestFlight if iOS.                  |Distribution ready|
|6-7|Recruit 10-15 test patients. Monitor first treatment requests and packages.|**Soft launch**   |

-----

## 13. Cost Projection — First 6 Months

|Service                 |Month 1-2        |Month 3-4     |Month 5-6  |
|------------------------|:---------------:|:------------:|:---------:|
|Firebase (Spark → Blaze)|₹0               |₹0 (free tier)|₹200-500   |
|MSG91 (SMS)             |₹250             |₹700          |₹2,000     |
|Google Play Console     |₹2,100 (one-time)|—             |—          |
|Apple Developer         |₹8,700 (annual)  |—             |—          |
|Domain                  |₹800 (annual)    |—             |—          |
|Google Maps API         |₹0 (free credit) |₹0            |₹500       |
|**Monthly recurring**   |**~₹250**        |**~₹700**     |**~₹2,700**|
|**One-time setup**      |**~₹11,600**     |—             |—          |

-----

## 14. Firestore Limitations

|Limitation                              |Impact                                               |Workaround                                          |
|----------------------------------------|-----------------------------------------------------|----------------------------------------------------|
|**No joins**                            |Can’t query therapists + packages + slots in one call|Denormalize (pricing nested in therapist doc)       |
|**One arrayContains per query**         |Can’t filter area AND specialization simultaneously  |Filter specialization client-side                   |
|**No inequality on multiple fields**    |Can’t do `fee > 500 AND rating > 4.0`                |Pick most selective for Firestore, other client-side|
|**Max 1MB per document**                |Can’t store unlimited notes in session doc           |Notes are a subcollection                           |
|**No full-text search**                 |Can’t keyword-search therapist bios                  |Not needed for MVP; add Algolia later               |
|**Composite indexes must be predefined**|New query patterns need new indexes                  |Deploy via `firestore.indexes.json`                 |

**None are blockers for MVP.**

-----

## 15. Security Checklist

|Item                     |Status|How                                         |
|-------------------------|:----:|--------------------------------------------|
|Data encrypted in transit|✅     |HTTPS by default                            |
|Data encrypted at rest   |✅     |Google Cloud encrypts at rest               |
|Firestore security rules |✅     |Role-based (Section 6)                      |
|Storage security rules   |✅     |Owner-based (Section 10)                    |
|Auth tokens secure       |✅     |Firebase Auth SDK                           |
|Certificates private     |✅     |Private storage path + rules                |
|Patient data siloed      |✅     |Security rules prevent cross-patient access |
|Private notes hidden     |✅     |isShared flag + rules on notes subcollection|
|Treatment requests scoped|✅     |Only involved parties read/write            |
|Package data protected   |✅     |Only therapist + patient of that package    |
|No sensitive data in logs|⚠️     |Audit Cloud Function logs                   |
|Terms of Service         |⚠️     |Draft before public launch                  |
|Privacy Policy           |⚠️     |Required for Play Store / App Store         |

-----

## 16. Monitoring & Analytics

|What                 |Tool                |Cost|
|---------------------|--------------------|:--:|
|Crashes              |Firebase Crashlytics|Free|
|Usage                |Firebase Analytics  |Free|
|Cloud Function errors|Cloud Functions logs|Free|
|Firestore usage      |Firebase console    |Free|
|SMS delivery         |MSG91 dashboard     |Free|
|Business metrics     |Admin dashboard (A1)|Free|

**Key events to track:**

```dart
analytics.logEvent(name: 'interest_expressed', parameters: {
  'therapist_id': therapistId, 'concern': concern });

analytics.logEvent(name: 'package_recommended', parameters: {
  'package_type': recommendedType, 'therapist_id': therapistId });

analytics.logEvent(name: 'package_chosen', parameters: {
  'chosen_type': chosenType, 'recommended_type': recommendedType,
  'matched_recommendation': (chosenType == recommendedType).toString() });

analytics.logEvent(name: 'session_completed', parameters: {
  'session_number': sessionNumber, 'package_type': packageType });
```

The `package_chosen` event with `matched_recommendation` is gold — it tells you how often patients follow the therapist’s recommendation vs. pick a smaller package.

-----

## 17. Deployment

```bash
# Cloud Functions (13 functions)
cd functions && firebase deploy --only functions

# Security Rules
firebase deploy --only firestore:rules
firebase deploy --only storage

# Indexes
firebase deploy --only firestore:indexes

# Flutter App
flutter build appbundle --release    # Android
flutter build ipa --release          # iOS (on Mac)
```

-----

## 18. Migration Path: Firebase → PostgreSQL

|Phase     |What Changes                                                     |What Stays                                |
|----------|-----------------------------------------------------------------|------------------------------------------|
|**Step 1**|Add PostgreSQL for analytics + complex queries                   |Firebase primary; app unchanged           |
|**Step 2**|Move sessions, packages, treatmentRequests, reviews to PostgreSQL|Auth, real-time, push, storage on Firebase|
|**Step 3**|Full migration                                                   |Keep Firebase only for FCM + Crashlytics  |

**V2+ concern only.** Don’t think about it until product-market fit.

-----

## 19. Summary

|Decision                          |Reasoning                                                                                        |
|----------------------------------|-------------------------------------------------------------------------------------------------|
|**Firebase over Supabase**        |Single console, best Flutter integration, fastest for solo dev                                   |
|**Firestore over Realtime DB**    |Better querying, offline support, per-document security rules                                    |
|**Cloud Functions (TypeScript)**  |Native triggers, same console, no separate backend                                               |
|**Therapist-recommends-first**    |Matches real-world physiotherapy — therapist assesses, then patient decides                      |
|**Express Interest + Choose**     |One round: patient describes problem → therapist recommends → patient picks. No negotiation loop.|
|**treatmentRequests collection**  |Single doc tracks the full lifecycle: interest → recommendation → choice                         |
|**Package-based model**           |Real physio is treatment plans, not one-off visits                                               |
|**Concerns on requests/packages** |Patient can have multiple conditions with different therapists                                   |
|**Split notes (public + private)**|Clinical notes stay private; progress shared with patient                                        |
|**Reviews per package**           |Patient reviews overall treatment experience                                                     |
|**Denormalization**               |Small upfront cost, massive read performance at MVP scale                                        |
|**MSG91 for SMS**                 |Indian DLT-compliant, cheap, reliable                                                            |
|**No payment processing**         |Reduces scope; settle directly for now                                                           |
|**48h request expiry**            |Prevents patients waiting forever; nudges therapist responsiveness                               |
|**7-week timeline**               |Aggressive but achievable for focused solo dev                                                   |

**30 total screens. 9 Firestore collections. 13 Cloud Functions. 7 weeks to soft launch.**

-----

**This document is the single source of truth. Build from it.**
