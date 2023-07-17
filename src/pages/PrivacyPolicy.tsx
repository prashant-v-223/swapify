import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="main text-white min-h-screen md:p-10 p-4">
        <div data-aos="fade-up">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p>
            At SwapFry, we are committed to protecting your privacy and ensuring
            the security of your personal information. This Privacy Policy
            explains how we collect, use, and safeguard your data when you use
            our website or services. By accessing or using SwapFry, you consent
            to the practices described in this policy.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Information We Collect
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <span className="font-semibold">Personal Information:</span> We
              may collect personal information, such as your name, email
              address, and contact details when you register an account, contact
              our support team, or participate in surveys or promotions.
            </li>
            <li>
              <span className="font-semibold">Financial Information:</span> To
              facilitate transactions, we may collect certain financial
              information, including your wallet addresses and transaction
              details.
            </li>
            <li>
              <span className="font-semibold">Log Data:</span> Our servers
              automatically collect information when you access our website or
              use our services. This includes your IP address, browser type,
              operating system, referring URLs, and other usage information.
            </li>
            <li>
              <span className="font-semibold">Cookies:</span> We may use cookies
              and similar tracking technologies to enhance your experience on
              our platform. These technologies collect information about your
              browsing activities and preferences.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Use of Information</h2>
          <p>
            We use the information collected to provide, maintain, and improve
            our services, including processing transactions, verifying
            identities, and addressing customer inquiries. We may use your email
            address to send you updates, newsletters, or promotional materials
            related to SwapFry. You can opt out of receiving these
            communications at any time. We may also use aggregated and
            anonymized data for analytical purposes, market research, and to
            improve our platform's functionality and user experience.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
          <p>
            We take appropriate security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or
            destruction. These measures include encryption, firewalls, secure
            networks, and regular security assessments. While we strive to
            protect your data, no method of transmission over the internet or
            electronic storage is 100% secure. Therefore, we cannot guarantee
            absolute security.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Data Sharing and Disclosure
          </h2>
          <p>
            We may share your personal information with trusted third parties,
            including service providers, financial institutions, and regulatory
            authorities, to facilitate transactions and comply with legal
            obligations. We may disclose your information in response to valid
            legal requests, such as court orders or government investigations.
            We do not sell, rent, or trade your personal information to third
            parties for marketing purposes without your explicit consent.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Third-Party Websites and Services
          </h2>
          <p>
            Our website may contain links to third-party websites or services.
            This Privacy Policy does not apply to those external sites or
            services. We encourage you to review the privacy policies of those
            third parties before providing any personal information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18.
            We do not knowingly collect personal information from children. If
            you believe we have inadvertently collected information from a
            child, please contact us, and we will promptly delete the
            information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Updates to this Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. The updated
            version will be posted on our website with the revised effective
            date. We encourage you to review this policy periodically to stay
            informed about our privacy practices.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or the handling of your personal information, please
            contact us at support@swapfry.com.
          </p>

          <p className="mt-8">
            By using SwapFry, you acknowledge that you have read and understood
            this Privacy Policy and agree to the collection, use, and disclosure
            of your information as described herein.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
