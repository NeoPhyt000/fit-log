import Image from "next/image";
import Logo from "@/assets/logo.png"

export default function Footer() {
  return (
    <footer className="border-t border-base-300">
      <div className="site-padding flex flex-col items-center gap-3 py-6 sm:flex-row sm:justify-between">

        <div className="flex items-center gap-2">
          <Image src={Logo} alt="FitLog logo" width={22} height={22} />
          <span className="font-display text-base font-bold tracking-wide">
            FITLOG
          </span>
        </div>

        <p className="text-xs text-base-content/60">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
