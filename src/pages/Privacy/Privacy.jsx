import { Link } from "react-router-dom";

const Privacy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal information you provide when registering, such as your name, email address, and profile details.",
        "Skill listings and swap requests you create on the platform.",
        "Messages and communications exchanged with other users.",
        "Usage data including pages visited, features used, and time spent on the platform.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "To create and manage your SkillSwap account.",
        "To facilitate skill exchange connections between users.",
        "To send you notifications about swap requests and platform updates.",
        "To improve our platform and personalize your experience.",
        "To ensure the safety and security of our community.",
      ],
    },
    {
      title: "Information Sharing",
      content: [
        "We do not sell your personal information to third parties.",
        "Your profile information is visible to other SkillSwap users to enable skill exchanges.",
        "We may share data with trusted service providers who help us operate the platform.",
        "We may disclose information if required by law or to protect user safety.",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We use industry-standard encryption to protect your data in transit and at rest.",
        "Access to personal data is restricted to authorized personnel only.",
        "We regularly review and update our security practices.",
        "In case of a data breach, we will notify affected users promptly.",
      ],
    },
    {
      title: "Your Rights",
      content: [
        "You can access, update, or delete your personal information at any time from your account settings.",
        "You may opt out of marketing communications while still receiving essential account notifications.",
        "You can request a copy of all data we hold about you.",
        "You have the right to withdraw consent for data processing at any time.",
      ],
    },
    {
      title: "Cookies",
      content: [
        "We use cookies to keep you logged in and remember your preferences.",
        "Analytics cookies help us understand how users interact with our platform.",
        "You can control cookie settings through your browser at any time.",
        "Disabling cookies may affect some features of the platform.",
      ],
    },
    {
      title: "Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time.",
        "We will notify you of significant changes via email or a prominent notice on the platform.",
        "Continued use of SkillSwap after changes means you accept the updated policy.",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-[fadeIn_0.5s_ease-in-out]">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
              Legal
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-eg", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 text-[17px] leading-relaxed">
            At <span className="font-semibold">SkillLeek</span>, we value your
            privacy. This policy explains how we collect, use, and protect your
            personal information when you use our skill exchange platform.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-lg bg-blue-500 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <h2 className="text-[18px] font-semibold text-gray-800">
                  {section.title}
                </h2>
              </div>
              <ul className="flex flex-col gap-2">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[17px] text-gray-500">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 text-center">
          <h3 className="text-base font-semibold text-gray-800 mb-2">
            Questions about this policy?
          </h3>
          <p className="text-lg text-gray-500 mb-4">
            If you have any questions or concerns, feel free to reach out to us.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;