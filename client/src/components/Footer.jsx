const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="space-y-6">
          {/* Brand Section */}
          <div className="space-y-3">
            <div>
              <p className="text-lg font-bold text-white">PAFT-NSC</p>
              <p className="mt-1 text-sm font-medium text-slate-300">
                Evaluation System
              </p>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
              A comprehensive platform for university feedback, evaluation
              management, and data-driven analytics.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700"></div>

          {/* Bottom Section */}
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-slate-400">
              © {currentYear} PAFT-NSC Evaluation System. All rights reserved.
            </p>
            <p className="text-sm text-slate-400">
              Developed by{" "}
              <span className="font-medium text-slate-300">SintosDev45</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
