const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 py-8 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-center sm:flex-row sm:justify-between sm:text-left sm:px-6">
        <div>
          <p className="text-sm font-semibold text-white">
            PAFT-NSC Evaluation System
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Built for university feedback and analytics.
          </p>
        </div>
        <div>
          <p className="text-sm">Developed by SintosDev45.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
