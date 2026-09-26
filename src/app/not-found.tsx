import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-padding flex flex-col items-center justify-center gap-4 py-28 text-center">
      <span className="font-display text-7xl font-bold text-primary">404</span>
      <h1 className="font-display text-2xl font-bold uppercase tracking-wide">
        Page not found
      </h1>
      <p className="max-w-sm text-sm text-base-content/60">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
        Let&apos;s get you back to the library.
      </p>
      <Link href="/" className="btn btn-primary mt-2 rounded-full px-6">
        Go to workouts
      </Link>
    </div>
  );
}