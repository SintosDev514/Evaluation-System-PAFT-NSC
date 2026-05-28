const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Analytics", href: "/analytics" },
        { label: "Home", href: "/" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <p className="text-lg font-bold text-white">PAFT-NSC</p>
              <p className="mt-1 text-sm font-medium text-slate-300">
                Evaluation System
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              A comprehensive platform for university feedback, evaluation
              management, and data-driven analytics.
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-400">
            © {currentYear} PAFT-NSC Evaluation System. All rights reserved.
          </p>
          <p className="text-sm text-slate-400">
            Developed with <span className="text-red-500">❤</span> by{" "}
            <span className="font-medium text-slate-300">SintosDev45</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
