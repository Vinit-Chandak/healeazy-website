import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import {
  LegalSection,
  LegalSubheading,
  LegalList,
  LegalListItem,
  LegalCallout,
  LegalKeyValue,
} from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Privacy Policy — Kyuro",
  description:
    "How Kyuro collects, uses, shares, and protects your personal information when you use our platform to book physiotherapy at home.",
  openGraph: {
    title: "Privacy Policy — Kyuro",
    description:
      "How Kyuro handles your personal information on our physiotherapy platform.",
    type: "article",
    locale: "en_IN",
    siteName: "Kyuro",
  },
  alternates: { canonical: "/privacy" },
};

const toc = [
  { id: "about", title: "About this policy" },
  { id: "who-we-are", title: "Who we are" },
  { id: "information-we-collect", title: "Information we collect" },
  { id: "how-we-use", title: "How we use your information" },
  { id: "sharing", title: "How your information is shared" },
  { id: "payments", title: "Payments — we do not process them" },
  { id: "third-parties", title: "Third-party services we rely on" },
  { id: "retention", title: "How long we keep your information" },
  { id: "security", title: "How we protect your information" },
  { id: "rights", title: "Your rights" },
  { id: "children", title: "Children's privacy" },
  { id: "transfers", title: "International transfers" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Grievance Officer & Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow="Legal · Privacy"
      title="Privacy Policy"
      intro="Kyuro is a platform for booking physiotherapy at home. This policy explains, in plain terms, what personal information we collect when you use our mobile apps and website, why we collect it, who we share it with, and the choices and rights you have."
      lastUpdated="18 April 2026"
      toc={toc}
    >
      <LegalSection id="about" number={1} title="About this policy">
        <p>
          This Privacy Policy applies to the Kyuro mobile applications (for
          patients and physiotherapists), the Kyuro website at{" "}
          <span className="text-text">kyuro.app</span>, and any related
          services we offer (together, the &quot;Service&quot;). It describes how
          we handle personal information in line with the{" "}
          <span className="text-text">
            Digital Personal Data Protection Act, 2023
          </span>{" "}
          and other applicable Indian laws.
        </p>
        <p>
          Using the Service means you have read this policy and understood how
          we handle your information. If you do not agree with it, please do
          not use Kyuro.
        </p>
      </LegalSection>

      <LegalSection id="who-we-are" number={2} title="Who we are">
        <p>
          &quot;Kyuro,&quot; &quot;we,&quot; &quot;us,&quot; and &quot;our&quot; refer to the team
          operating the Kyuro Service in India. Kyuro acts as a{" "}
          <span className="text-text">data fiduciary</span> for the personal
          information you share with us while using the Service.
        </p>
        <LegalKeyValue
          items={[
            { label: "Service", value: "Kyuro — physiotherapy at home" },
            { label: "Contact", value: "support@kyuro.app" },
            { label: "Phone", value: "+91 93158 03147" },
            { label: "Launch city", value: "Hyderabad, India" },
          ]}
        />
      </LegalSection>

      <LegalSection
        id="information-we-collect"
        number={3}
        title="Information we collect"
      >
        <p>
          We only collect what we need to run the Service. The exact
          information we collect depends on whether you use Kyuro as a
          patient, as a physiotherapist, or simply as a visitor to our
          website.
        </p>

        <LegalSubheading>a. Information you give us directly</LegalSubheading>
        <LegalList>
          <LegalListItem>
            <span className="text-text font-semibold">Account details</span> —
            your name, email address, phone number, password (stored in
            hashed form), and whether you are registering as a patient or a
            physiotherapist.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Patient profile &amp; treatment details
            </span>{" "}
            — date of birth or confirmation that you are 18+, saved addresses
            and area within Hyderabad, the concern you are seeking help for
            (such as &quot;knee injury&quot; or &quot;back pain&quot;) and any
            description you add, and preferences like gender or language.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Physiotherapist profile &amp; verification documents
            </span>{" "}
            — your professional name, photograph, qualifications,
            registration or certification details, years of experience,
            specializations, languages, service areas, session pricing and
            package configuration, and any supporting certificates you upload
            for verification.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">Session data</span> —
            bookings, consultation details, scheduled slots, public notes
            (which we share with you as the patient) and private clinical
            notes (visible only to your physiotherapist), session completion
            status, and progress across your package.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Reviews &amp; communications
            </span>{" "}
            — ratings and reviews you leave, messages you send us through
            support channels, and responses you give to feedback prompts or
            surveys.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">Waitlist signups</span>{" "}
            — if you join our waitlist on kyuro.app, we collect your email
            address and whether you are signing up as a patient or a
            physiotherapist.
          </LegalListItem>
        </LegalList>

        <LegalSubheading>
          b. Information collected automatically
        </LegalSubheading>
        <LegalList>
          <LegalListItem>
            <span className="text-text font-semibold">
              Device and technical information
            </span>{" "}
            — device model, operating system and version, app version,
            language, time zone, IP address, and crash reports.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">Usage information</span>{" "}
            — the screens you visit, features you use, search terms, and
            anonymous product-analytics events that help us understand how
            Kyuro is being used.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Push notification tokens
            </span>{" "}
            — if you allow notifications, we store a device token so we can
            send you booking and session reminders.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Location (area-level only)
            </span>{" "}
            — we use the Hyderabad area you select for matching with nearby
            therapists. We do not continuously track your device location.
          </LegalListItem>
        </LegalList>

        <LegalCallout tone="info">
          <span className="font-semibold">We do not ask for — or store — any payment card or bank-account details.</span>{" "}
          Payments for sessions are settled directly between patients and
          physiotherapists in cash or via UPI. See Section 6 below.
        </LegalCallout>

        <LegalSubheading>c. Sensitive information</LegalSubheading>
        <p>
          Concerns, consultation notes and session notes may describe aspects
          of your health. We treat this information with additional care. We
          only collect it with your consent and share it only as described in
          Section 5.
        </p>
      </LegalSection>

      <LegalSection
        id="how-we-use"
        number={4}
        title="How we use your information"
      >
        <p>We use the information above for the following purposes.</p>
        <LegalList>
          <LegalListItem>
            <span className="text-text font-semibold">
              To run the Service.
            </span>{" "}
            Creating and maintaining your account, showing relevant
            physiotherapists, enabling bookings, consultations, packages and
            session scheduling, and tracking your progress.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              To verify physiotherapists.
            </span>{" "}
            Reviewing qualifications and certificates submitted by
            physiotherapists before marking them as verified on the platform.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              To keep you informed.
            </span>{" "}
            Sending booking confirmations, session reminders,
            recommendation notifications, important service announcements and
            responses to your support requests via push notification, email
            or SMS.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              To improve Kyuro.
            </span>{" "}
            Understanding how the Service is used, diagnosing crashes and
            bugs, testing new features, and measuring the quality of
            physiotherapy outcomes through aggregated, de-identified data.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              To keep Kyuro safe.
            </span>{" "}
            Preventing fraud, abuse, fake profiles or reviews, and enforcing
            our Terms of Service.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              To meet legal obligations.
            </span>{" "}
            Complying with applicable laws, regulations, court orders or
            requests from government authorities.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection
        id="sharing"
        number={5}
        title="How your information is shared"
      >
        <p>
          Kyuro connects patients and physiotherapists. Some information must
          be shared between the two for the Service to work. We never sell
          your personal information.
        </p>

        <LegalSubheading>
          a. Between patients and physiotherapists
        </LegalSubheading>
        <LegalList>
          <LegalListItem>
            <span className="text-text font-semibold">
              Patients see, about their chosen therapist:
            </span>{" "}
            professional name, photograph, qualifications and experience,
            specializations, languages, service areas, pricing, reviews, and
            public responses to past reviews.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Physiotherapists see, about their own patients:
            </span>{" "}
            name, phone number, the address you have chosen for sessions,
            the concern and description you shared at booking, session
            history with the therapist, and any public notes from past
            sessions.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Private clinical notes
            </span>{" "}
            written by a physiotherapist about a patient are visible only to
            that physiotherapist and never shown to the patient in-app.
          </LegalListItem>
        </LegalList>

        <LegalSubheading>b. Service providers</LegalSubheading>
        <p>
          We use a small set of well-known service providers to run the
          Service. These providers process your information only on our
          instructions and under contractual confidentiality and security
          obligations. See Section 7 for the full list.
        </p>

        <LegalSubheading>c. Legal and safety reasons</LegalSubheading>
        <p>
          We may share information with courts, law-enforcement, regulators
          or other authorities when we are required to do so by law, or when
          we believe in good faith that disclosure is necessary to protect
          the safety of our users, the public, or the integrity of the
          Service.
        </p>

        <LegalSubheading>d. Business transfers</LegalSubheading>
        <p>
          If Kyuro is involved in a merger, acquisition, reorganisation or
          sale of assets, your information may be transferred as part of that
          transaction. We will let you know before your information becomes
          subject to a different privacy policy.
        </p>
      </LegalSection>

      <LegalSection
        id="payments"
        number={6}
        title="Payments — we do not process them"
      >
        <p>
          Payments for consultations, sessions and packages are settled{" "}
          <span className="text-text">
            directly between the patient and the physiotherapist
          </span>{" "}
          in cash or via UPI at prices the physiotherapist has set. Kyuro is
          not a party to these payments.
        </p>
        <LegalCallout tone="info">
          Because we do not handle your money, we do not collect, see, or
          store card numbers, UPI IDs, bank account numbers or any other
          payment credentials.
        </LegalCallout>
        <p>
          The platform only records that a package was started and how many
          sessions have been completed. Any receipts, refund requests or
          disputes about payment are handled directly between the patient
          and the physiotherapist. We may, at our discretion, help mediate,
          but we are not responsible for settlement.
        </p>
      </LegalSection>

      <LegalSection
        id="third-parties"
        number={7}
        title="Third-party services we rely on"
      >
        <p>
          To run Kyuro reliably, we use the following service providers.
          They process your information on our behalf.
        </p>
        <LegalList>
          <LegalListItem>
            <span className="text-text font-semibold">Google Firebase</span>{" "}
            (Google LLC) — authentication, database (Cloud Firestore), file
            storage (Cloud Storage), push notifications (FCM), crash
            reporting (Crashlytics), and anonymous usage analytics
            (Firebase Analytics). Firebase is our main technical backbone.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">MSG91</span> — sending
            SMS such as one-time codes and booking-related alerts to Indian
            phone numbers.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Google Maps Platform
            </span>{" "}
            — estimating travel times between addresses and therapist
            service areas. We share approximate pick-up and drop-off areas,
            not continuous location.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Google Workspace &amp; Google Sheets
            </span>{" "}
            — receiving waitlist signups from our website before our apps
            are available.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">Netlify</span> —
            hosting the Kyuro website.
          </LegalListItem>
        </LegalList>
        <p>
          These providers are well-established services with their own
          privacy practices, which you can find on their official websites.
        </p>
      </LegalSection>

      <LegalSection
        id="retention"
        number={8}
        title="How long we keep your information"
      >
        <p>
          We keep your information only for as long as it is necessary for
          the purposes described in this policy.
        </p>
        <LegalList>
          <LegalListItem>
            <span className="text-text font-semibold">Account data</span> —
            for as long as your account is active. If you ask us to delete
            your account, we remove or anonymise your personal information
            from active systems within a reasonable period, typically 30
            days.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Session and consultation records
            </span>{" "}
            — retained after your account is closed for a reasonable period
            for record-keeping, clinical continuity for the treating
            physiotherapist, and to handle any follow-up or dispute. Private
            clinical notes remain under the control of the therapist who
            wrote them.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Aggregated or de-identified data
            </span>{" "}
            — may be kept for longer to analyse product performance and
            improve the Service.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Information we are required to keep by law
            </span>{" "}
            — will be retained for the period required, even if you have
            asked us to delete it.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection
        id="security"
        number={9}
        title="How we protect your information"
      >
        <p>
          We take reasonable technical and organisational measures to
          protect your information, including:
        </p>
        <LegalList>
          <LegalListItem>
            Encryption of traffic in transit between your device and our
            servers (HTTPS / TLS).
          </LegalListItem>
          <LegalListItem>
            Industry-standard encryption at rest within our infrastructure
            provider (Google Firebase).
          </LegalListItem>
          <LegalListItem>
            Role-based access controls so that patients, physiotherapists and
            administrators see only the information they need.
          </LegalListItem>
          <LegalListItem>
            Password hashing and secure authentication handled by Firebase
            Authentication.
          </LegalListItem>
          <LegalListItem>
            Monitoring of crashes and abnormal activity, and regular review
            of access and security rules.
          </LegalListItem>
        </LegalList>
        <p>
          No system is completely secure. If we become aware of a personal
          data breach that affects you, we will notify you and the Data
          Protection Board of India as required by law, and take prompt
          steps to address it.
        </p>
      </LegalSection>

      <LegalSection id="rights" number={10} title="Your rights">
        <p>
          Subject to applicable law, including the Digital Personal Data
          Protection Act, 2023, you have the following rights in respect of
          your personal information.
        </p>
        <LegalList>
          <LegalListItem>
            <span className="text-text font-semibold">Right to access</span>{" "}
            — ask us for a summary of the personal information we hold about
            you and how we process it.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Right to correction and erasure
            </span>{" "}
            — ask us to correct inaccurate information or delete personal
            information that is no longer necessary for the purposes for
            which it was collected.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Right to withdraw consent
            </span>{" "}
            — where we rely on your consent, you can withdraw it at any
            time. Withdrawing consent does not affect processing done before
            the withdrawal.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Right to nominate
            </span>{" "}
            — nominate another individual to exercise your rights in the
            event of your death or incapacity.
          </LegalListItem>
          <LegalListItem>
            <span className="text-text font-semibold">
              Right of grievance redressal
            </span>{" "}
            — raise a complaint with our Grievance Officer, and escalate to
            the Data Protection Board of India if unresolved.
          </LegalListItem>
        </LegalList>
        <p>
          To exercise any of these rights, write to us at{" "}
          <a
            href="mailto:support@kyuro.app"
            className="text-primary hover:text-primary-hover transition-colors"
          >
            support@kyuro.app
          </a>
          . We may need to verify your identity before acting on a request.
          You can also manage most of your information directly from inside
          the Kyuro app.
        </p>
      </LegalSection>

      <LegalSection id="children" number={11} title="Children's privacy">
        <p>
          Kyuro is intended for adults aged 18 and over. We do not knowingly
          collect personal information directly from children. Where a
          physiotherapy session is booked for a minor in the household, the
          Kyuro account must be held and managed by a parent or legal
          guardian, and any health information shared about the minor is
          the responsibility of that parent or guardian.
        </p>
        <p>
          If you believe a child has created an account on their own, please
          contact us and we will remove it.
        </p>
      </LegalSection>

      <LegalSection
        id="transfers"
        number={12}
        title="International transfers"
      >
        <p>
          Our infrastructure providers, in particular Google Firebase,
          operate servers both in India and in other countries. Where your
          personal information is transferred outside India, we take
          reasonable steps to ensure that it continues to be protected in a
          manner consistent with this policy and applicable law.
        </p>
      </LegalSection>

      <LegalSection id="changes" number={13} title="Changes to this policy">
        <p>
          We may update this policy from time to time. When we make a
          material change, we will let you know through the app, by email,
          or by prominently posting a notice on kyuro.app before the change
          takes effect. The date at the top of this page is always updated
          to reflect the latest version. Continuing to use Kyuro after a
          change means you accept the updated policy.
        </p>
      </LegalSection>

      <LegalSection
        id="contact"
        number={14}
        title="Grievance Officer & Contact"
      >
        <p>
          If you have any questions, concerns or complaints about this
          policy or the way your personal information is handled, please
          get in touch with our Grievance Officer.
        </p>
        <LegalKeyValue
          items={[
            { label: "Role", value: "Grievance Officer, Kyuro" },
            {
              label: "Email",
              value: (
                <a
                  href="mailto:support@kyuro.app"
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  support@kyuro.app
                </a>
              ),
            },
            {
              label: "Phone",
              value: (
                <a
                  href="tel:+919315803147"
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  +91 93158 03147
                </a>
              ),
            },
            {
              label: "Response",
              value: "We aim to acknowledge grievances within 72 hours and resolve them within 30 days.",
            },
          ]}
        />
      </LegalSection>
    </LegalShell>
  );
}
