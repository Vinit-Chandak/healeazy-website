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
  title: "Terms of Service — Kyuro",
  description:
    "The terms that govern your use of the Kyuro platform for booking physiotherapy at home in India.",
  openGraph: {
    title: "Terms of Service — Kyuro",
    description:
      "Terms and conditions for using Kyuro — connecting patients with verified physiotherapists for home visits.",
    type: "article",
    locale: "en_IN",
    siteName: "Kyuro",
  },
  alternates: { canonical: "/terms" },
};

const toc = [
  { id: "about", title: "About these terms" },
  { id: "eligibility", title: "Who can use Kyuro" },
  { id: "account", title: "Your account" },
  { id: "what-kyuro-is", title: "What Kyuro is — and what it isn't" },
  { id: "patients", title: "Using Kyuro as a patient" },
  { id: "therapists", title: "Using Kyuro as a physiotherapist" },
  { id: "bookings", title: "Consultations, packages & sessions" },
  { id: "payments", title: "Payments — directly with your therapist" },
  { id: "cancellations", title: "Cancellations, rescheduling & refunds" },
  { id: "reviews", title: "Reviews and user content" },
  { id: "medical-disclaimer", title: "Medical disclaimer" },
  { id: "prohibited", title: "Things you must not do" },
  { id: "ip", title: "Content and intellectual property" },
  { id: "termination", title: "Suspension and termination" },
  { id: "disclaimers", title: "Disclaimers and limitation of liability" },
  { id: "indemnity", title: "Indemnification" },
  { id: "law", title: "Governing law and disputes" },
  { id: "changes", title: "Changes to these terms" },
  { id: "contact", title: "Contact & Grievance Officer" },
];

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Legal · Terms"
      title="Terms of Service"
      intro="These terms describe how Kyuro works, the role we play between patients and physiotherapists, and the rules that apply when you use the Service. Please read them carefully — by using Kyuro, you agree to them."
      lastUpdated="18 April 2026"
      toc={toc}
    >
      <LegalSection id="about" number={1} title="About these terms">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and
          use of the Kyuro mobile applications, the website at{" "}
          <span className="text-text">kyuro.app</span>, and any related
          services we offer (together, the &quot;Service&quot;). They form a
          legally binding agreement between you and Kyuro.
        </p>
        <p>
          Our Privacy Policy, available at{" "}
          <a
            href="/privacy"
            className="text-primary hover:text-primary-hover transition-colors"
          >
            kyuro.app/privacy
          </a>
          , is part of these Terms and explains how we handle your personal
          information.
        </p>
        <p>
          If you do not agree with these Terms or the Privacy Policy, please
          do not use Kyuro.
        </p>
      </LegalSection>

      <LegalSection id="eligibility" number={2} title="Who can use Kyuro">
        <p>
          You may use Kyuro only if all of the following are true.
        </p>
        <LegalList>
          <LegalListItem>
            You are at least{" "}
            <span className="text-text font-semibold">18 years old</span> and
            able to enter into a binding contract under Indian law.
          </LegalListItem>
          <LegalListItem>
            You are a resident of India and will use the Service within
            India.
          </LegalListItem>
          <LegalListItem>
            You are not barred from using the Service under any applicable
            law or any prior action by Kyuro.
          </LegalListItem>
          <LegalListItem>
            If you are registering as a physiotherapist, you hold the
            qualifications and registrations required to practise
            physiotherapy in India and can provide proof on request.
          </LegalListItem>
        </LegalList>
        <p>
          Kyuro is not intended for use by children. If you are booking
          physiotherapy for a minor in your household, you must use your
          own Kyuro account and remain present and responsible throughout
          the sessions.
        </p>
      </LegalSection>

      <LegalSection id="account" number={3} title="Your account">
        <p>
          To use most features of Kyuro, you need to create an account. You
          agree to:
        </p>
        <LegalList>
          <LegalListItem>
            Provide accurate, current and complete information when you
            register and keep it up to date.
          </LegalListItem>
          <LegalListItem>
            Keep your login credentials confidential and not share them with
            anyone else.
          </LegalListItem>
          <LegalListItem>
            Be responsible for all activity that happens under your account,
            including sessions booked, messages sent, and reviews posted.
          </LegalListItem>
          <LegalListItem>
            Notify us immediately at{" "}
            <a
              href="mailto:support@kyuro.app"
              className="text-primary hover:text-primary-hover transition-colors"
            >
              support@kyuro.app
            </a>{" "}
            if you believe your account has been accessed without your
            permission.
          </LegalListItem>
        </LegalList>
        <p>
          You may create only one account. Kyuro may refuse, suspend or
          terminate accounts that appear to be duplicates, impersonations, or
          operated by bots.
        </p>
      </LegalSection>

      <LegalSection
        id="what-kyuro-is"
        number={4}
        title="What Kyuro is — and what it isn't"
      >
        <p>
          Kyuro is a technology platform that helps patients discover
          verified physiotherapists for home visits and online consultations,
          and helps physiotherapists run their practice.
        </p>
        <LegalCallout tone="info">
          <span className="font-semibold">
            Kyuro is not a hospital, a clinic or a medical provider.
          </span>{" "}
          The physiotherapists who offer their services through Kyuro are{" "}
          <span className="text-text font-semibold">
            independent professionals
          </span>{" "}
          who use our platform to reach patients and manage their practice.
          Kyuro does not employ them, does not supervise their clinical work,
          and is not a party to the professional relationship between a
          physiotherapist and a patient.
        </LegalCallout>
        <p>
          Under the Information Technology Act, 2000, Kyuro operates as an
          intermediary in respect of information posted by its users
          (including therapist profiles, pricing, session notes and reviews).
          Kyuro verifies credentials submitted by physiotherapists on a
          reasonable-efforts basis but does not independently certify their
          competence, and patients are encouraged to review profiles,
          qualifications and reviews carefully before booking.
        </p>
      </LegalSection>

      <LegalSection id="patients" number={5} title="Using Kyuro as a patient">
        <p>
          When you use Kyuro as a patient, you agree to:
        </p>
        <LegalList>
          <LegalListItem>
            Share accurate information about your concern, medical history
            (when requested), and the address at which you would like
            sessions to happen.
          </LegalListItem>
          <LegalListItem>
            Treat your physiotherapist, and anyone accompanying them, with
            respect and provide a safe space for sessions to take place.
          </LegalListItem>
          <LegalListItem>
            Be present at the scheduled time and address, or cancel in
            advance if you cannot.
          </LegalListItem>
          <LegalListItem>
            Pay for consultations, sessions and packages directly to the
            physiotherapist at the rates they have published on their
            profile.
          </LegalListItem>
          <LegalListItem>
            Not ask a physiotherapist to perform any service that is outside
            their scope of practice, is unlawful, or that you would not
            normally expect in a physiotherapy session.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection
        id="therapists"
        number={6}
        title="Using Kyuro as a physiotherapist"
      >
        <p>
          If you register as a physiotherapist on Kyuro, you also agree to:
        </p>
        <LegalList>
          <LegalListItem>
            Hold and maintain all qualifications, registrations and
            permissions required to practise physiotherapy in India, and to
            provide proof when we ask for it.
          </LegalListItem>
          <LegalListItem>
            Represent yourself honestly on your Kyuro profile — your real
            name and photograph, accurate experience, specializations,
            service areas and pricing.
          </LegalListItem>
          <LegalListItem>
            Provide physiotherapy services with reasonable care and skill,
            following the professional and ethical standards that apply to
            your practice.
          </LegalListItem>
          <LegalListItem>
            Arrive on time for sessions, keep session records up to date
            through Kyuro, and complete sessions marked as confirmed unless
            cancelled through the platform.
          </LegalListItem>
          <LegalListItem>
            Charge only the amounts listed on your Kyuro profile for
            platform-booked consultations, sessions and packages.
          </LegalListItem>
          <LegalListItem>
            Carry and maintain any professional indemnity insurance or other
            coverage that is customary for your practice. Kyuro does not
            provide such coverage to you.
          </LegalListItem>
          <LegalListItem>
            Keep patient information, including private clinical notes,
            confidential and use it only to provide care through Kyuro.
          </LegalListItem>
          <LegalListItem>
            Comply with all applicable laws, including tax laws, and be
            solely responsible for your own tax obligations on amounts you
            collect from patients.
          </LegalListItem>
        </LegalList>
        <p>
          Verification status displayed on your profile can be paused or
          removed by Kyuro if we are unable to verify your credentials or if
          we receive credible reports of professional misconduct.
        </p>
      </LegalSection>

      <LegalSection
        id="bookings"
        number={7}
        title="Consultations, packages & sessions"
      >
        <p>
          Kyuro supports two ways to engage with a physiotherapist.
        </p>

        <LegalSubheading>a. Consultations</LegalSubheading>
        <p>
          A short consultation, either online or as a home visit, during
          which you describe your concern and the physiotherapist assesses
          whether and how they can help. Physiotherapists may, after the
          consultation, recommend one of their published treatment packages.
        </p>

        <LegalSubheading>b. Treatment packages</LegalSubheading>
        <p>
          Physiotherapists publish up to three package tiers —{" "}
          <span className="text-text">Starter</span> (3 sessions),{" "}
          <span className="text-text">Standard</span> (5 sessions), and{" "}
          <span className="text-text">Intensive</span> (12 sessions) — each
          with a validity period during which the sessions must be used.
          Packages are treated like published products: when you confirm a
          package, it becomes active immediately and you then schedule
          sessions within it.
        </p>

        <LegalSubheading>c. Scheduling and availability</LegalSubheading>
        <p>
          Sessions are scheduled from a physiotherapist&apos;s available
          slots in the app. Availability, areas served and session duration
          are set by the physiotherapist and may change. Sessions that
          remain unused when a package&apos;s validity ends are marked as
          expired and are not automatically refunded.
        </p>

        <LegalSubheading>d. Responsibility for outcomes</LegalSubheading>
        <p>
          Recovery outcomes depend on many factors, including a
          patient&apos;s condition, adherence to advice, and consistency
          across sessions. Neither Kyuro nor, within the limits of
          applicable law, the physiotherapist can guarantee specific
          clinical outcomes.
        </p>
      </LegalSection>

      <LegalSection
        id="payments"
        number={8}
        title="Payments — directly with your therapist"
      >
        <p>
          Kyuro does not collect payments for consultations, sessions or
          packages. All amounts are paid by the patient directly to the
          physiotherapist, in cash or via UPI, at the rates set by the
          physiotherapist on their Kyuro profile.
        </p>
        <LegalCallout tone="info">
          Because Kyuro does not process payments, we do not issue receipts,
          invoices or tax documents for these amounts. Your physiotherapist
          is responsible for providing any such documents.
        </LegalCallout>
        <p>
          Kyuro may, in the future, introduce optional in-app payments or
          fees. If that happens, you will be shown the relevant terms at
          that time, and you can choose whether to use them.
        </p>
      </LegalSection>

      <LegalSection
        id="cancellations"
        number={9}
        title="Cancellations, rescheduling & refunds"
      >
        <p>
          Because payments happen directly between patient and
          physiotherapist, cancellations, rescheduling, and any refund
          arrangements are a matter between the two of you.
        </p>
        <LegalList>
          <LegalListItem>
            Patients should cancel or reschedule a session in the app as
            soon as they know they cannot attend, so that the slot can be
            released.
          </LegalListItem>
          <LegalListItem>
            Physiotherapists should cancel with as much notice as reasonably
            possible, and with a clear reason, if they are unable to attend
            a scheduled session.
          </LegalListItem>
          <LegalListItem>
            Repeated no-shows or last-minute cancellations by either side
            may lead to restrictions on your account.
          </LegalListItem>
          <LegalListItem>
            If a physiotherapist is unable or unwilling to deliver sessions
            already paid for, the patient should first try to resolve the
            matter with the physiotherapist directly, and may write to{" "}
            <a
              href="mailto:support@kyuro.app"
              className="text-primary hover:text-primary-hover transition-colors"
            >
              support@kyuro.app
            </a>{" "}
            if that is not possible.
          </LegalListItem>
        </LegalList>
        <p>
          Kyuro may, at its discretion, help facilitate a conversation, but
          we are not party to the payment and are not responsible for making
          refunds on behalf of physiotherapists.
        </p>
      </LegalSection>

      <LegalSection id="reviews" number={10} title="Reviews and user content">
        <p>
          Patients can leave ratings and reviews for physiotherapists they
          have worked with. Physiotherapists can post public responses.
        </p>
        <LegalList>
          <LegalListItem>
            Reviews must be honest, based on your own experience, and
            relevant to the service you received.
          </LegalListItem>
          <LegalListItem>
            Reviews must not contain abusive, defamatory, obscene,
            discriminatory, or personally identifying content about other
            people.
          </LegalListItem>
          <LegalListItem>
            You must not pay, incentivise or pressure anyone to leave or
            remove a review.
          </LegalListItem>
        </LegalList>
        <p>
          We may edit, hide or remove reviews and other user content that we
          believe violates these Terms or applicable law. We may also
          suspend accounts used to post such content.
        </p>
      </LegalSection>

      <LegalSection
        id="medical-disclaimer"
        number={11}
        title="Medical disclaimer"
      >
        <LegalCallout tone="warn">
          <span className="font-semibold">
            Kyuro is not a substitute for professional medical diagnosis,
            advice or emergency care.
          </span>{" "}
          If you are experiencing a medical emergency — severe chest pain,
          breathing difficulty, stroke symptoms, serious injury, or any
          condition that may be life-threatening — call{" "}
          <span className="font-semibold">112</span> or the relevant
          emergency services immediately. Do not rely on Kyuro or on a
          scheduled physiotherapy session in an emergency.
        </LegalCallout>
        <p>
          Information shown on Kyuro, including therapist profiles, package
          descriptions, and any educational content, is for general
          information only. It does not replace a consultation with a
          qualified doctor. You should consult a physician if your condition
          is new, worsening, or if you are unsure whether physiotherapy is
          appropriate for you.
        </p>
        <p>
          The physiotherapists on Kyuro are independent professionals. Any
          clinical advice they provide is their own, given in the context
          of a professional relationship between them and the patient.
        </p>
      </LegalSection>

      <LegalSection id="prohibited" number={12} title="Things you must not do">
        <p>While using Kyuro, you agree not to:</p>
        <LegalList>
          <LegalListItem>
            Use the Service for anything illegal, fraudulent, or harmful.
          </LegalListItem>
          <LegalListItem>
            Impersonate another person, misrepresent your affiliation with
            any person or organisation, or create fake patient or therapist
            accounts.
          </LegalListItem>
          <LegalListItem>
            Post health claims, diagnoses or recommendations you are not
            qualified to make.
          </LegalListItem>
          <LegalListItem>
            Harass, threaten, intimidate or discriminate against any other
            user, including during in-person sessions.
          </LegalListItem>
          <LegalListItem>
            Request or offer any service of a sexual or otherwise
            inappropriate nature under the guise of a physiotherapy session.
          </LegalListItem>
          <LegalListItem>
            Try to bypass, disable or interfere with any security feature of
            the Service.
          </LegalListItem>
          <LegalListItem>
            Access, scrape, copy, or build a competing product from data on
            the Service without our written permission.
          </LegalListItem>
          <LegalListItem>
            Use the Service in a way that imposes an unreasonable load on
            our infrastructure or interferes with other users&apos; access.
          </LegalListItem>
          <LegalListItem>
            Upload viruses, malicious code, or content that infringes on
            anyone&apos;s intellectual property or privacy rights.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection id="ip" number={13} title="Content and intellectual property">
        <p>
          The Kyuro name, logo, app design, website and all related software
          and content (other than user content) are owned by Kyuro or its
          licensors and are protected by intellectual-property laws. Kyuro
          grants you a limited, non-exclusive, non-transferable, revocable
          licence to use the Service for its intended purpose in accordance
          with these Terms.
        </p>
        <p>
          Content you submit — profile information, photographs, session
          notes, reviews and similar material — remains yours. By
          submitting it, you grant Kyuro a non-exclusive, worldwide,
          royalty-free licence to host, use, display, reproduce and
          distribute that content as part of operating and promoting the
          Service. You are responsible for ensuring that content you upload
          does not infringe anyone else&apos;s rights.
        </p>
      </LegalSection>

      <LegalSection
        id="termination"
        number={14}
        title="Suspension and termination"
      >
        <p>
          You may stop using Kyuro at any time and ask us to delete your
          account by writing to{" "}
          <a
            href="mailto:support@kyuro.app"
            className="text-primary hover:text-primary-hover transition-colors"
          >
            support@kyuro.app
          </a>
          . Deleting your account does not remove information that we are
          legally required to keep, or that other users reasonably need to
          retain for their own records (for example, session history with
          their patients or therapists).
        </p>
        <p>
          We may limit, suspend or terminate your access to the Service,
          remove content you have posted, and take other proportionate
          action if we reasonably believe that you have breached these
          Terms, caused harm to other users, or created legal risk for
          Kyuro. Where it is appropriate and safe to do so, we will try to
          give you notice and a chance to address the issue.
        </p>
      </LegalSection>

      <LegalSection
        id="disclaimers"
        number={15}
        title="Disclaimers and limitation of liability"
      >
        <p>
          Except where applicable law does not allow it, the Service is
          provided{" "}
          <span className="text-text font-semibold">
            &quot;as is&quot; and &quot;as available&quot;
          </span>
          , without warranties of any kind, whether express or implied,
          including warranties of merchantability, fitness for a particular
          purpose, accuracy, or non-infringement.
        </p>
        <p>
          Kyuro does not warrant that:
        </p>
        <LegalList>
          <LegalListItem>
            The Service will always be available, uninterrupted, secure or
            error-free.
          </LegalListItem>
          <LegalListItem>
            Any physiotherapist you book through Kyuro will be able to
            achieve a particular clinical outcome, or will always be
            available at the time, price or location shown.
          </LegalListItem>
          <LegalListItem>
            Information posted by users, including therapist profiles and
            reviews, is accurate, complete or current.
          </LegalListItem>
        </LegalList>
        <p>
          To the fullest extent permitted by law, Kyuro, its founders,
          employees, contractors, partners and service providers will not be
          liable for any indirect, incidental, special, consequential,
          exemplary or punitive damages, loss of profits, loss of data, or
          loss of goodwill arising out of or relating to your use of the
          Service.
        </p>
        <p>
          To the fullest extent permitted by law, Kyuro&apos;s total
          aggregate liability for any and all claims arising out of or
          relating to the Service will not exceed the greater of (a) the
          total fees you have paid directly to Kyuro for using the Service
          in the twelve months before the claim, or (b) INR 1,000.
        </p>
        <p>
          Nothing in these Terms excludes or limits any liability that
          cannot be excluded or limited under applicable Indian law,
          including liability for fraud.
        </p>
      </LegalSection>

      <LegalSection id="indemnity" number={16} title="Indemnification">
        <p>
          You agree to indemnify and hold Kyuro and its founders, employees
          and service providers harmless from any claim, loss, liability,
          cost or expense (including reasonable legal fees) arising out of:
        </p>
        <LegalList>
          <LegalListItem>Your breach of these Terms.</LegalListItem>
          <LegalListItem>
            Your misuse of the Service, including any content you post.
          </LegalListItem>
          <LegalListItem>
            Your violation of any applicable law or the rights of any third
            party.
          </LegalListItem>
          <LegalListItem>
            Any in-person interaction between a patient and a
            physiotherapist at a home visit, except to the extent that the
            loss was directly caused by Kyuro&apos;s own gross negligence or
            wilful misconduct.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection id="law" number={17} title="Governing law and disputes">
        <p>
          These Terms are governed by the laws of India, without regard to
          its conflict-of-laws rules.
        </p>
        <p>
          If a dispute arises between you and Kyuro, we strongly encourage
          you to first contact us at{" "}
          <a
            href="mailto:support@kyuro.app"
            className="text-primary hover:text-primary-hover transition-colors"
          >
            support@kyuro.app
          </a>{" "}
          so we can try to resolve it directly. Most issues can be settled
          this way.
        </p>
        <p>
          Any dispute that cannot be resolved informally will be finally
          resolved by arbitration under the Arbitration and Conciliation
          Act, 1996, by a sole arbitrator appointed by Kyuro. The seat and
          venue of arbitration will be Hyderabad, Telangana, and the
          language will be English. Subject to arbitration, the courts at
          Hyderabad, Telangana, will have exclusive jurisdiction in
          connection with these Terms.
        </p>
      </LegalSection>

      <LegalSection id="changes" number={18} title="Changes to these terms">
        <p>
          We may update these Terms from time to time — for example, to
          reflect new features, legal requirements, or operational
          realities. When we make a material change, we will let you know
          through the app, by email, or by prominently posting a notice on
          kyuro.app before the change takes effect.
        </p>
        <p>
          Continuing to use Kyuro after the updated Terms take effect means
          that you accept them. If you do not agree with a change, you
          should stop using the Service and, if you wish, ask us to close
          your account.
        </p>
      </LegalSection>

      <LegalSection
        id="contact"
        number={19}
        title="Contact & Grievance Officer"
      >
        <p>
          For any questions about these Terms, or to raise a grievance
          about the Service or content posted on it, please contact our
          Grievance Officer.
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
              value: "Acknowledged within 72 hours; resolved within 30 days where reasonably possible.",
            },
          ]}
        />
      </LegalSection>
    </LegalShell>
  );
}
