import Image from "next/image";
import { ArrowRight } from "lucide-react";
import BannerImg from "@/assets/banner.png"

export default function Hero() {
  return (
    <section className="container-app grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 dark">
      <div className="flex flex-col items-start gap-5">
        <span className="badge badge-outline border-primary/40 bg-primary/10 px-3 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Workout Library
        </span>
        <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide sm:text-5xl lg:text-6xl">
          Train with intent.
          <br />
          Log every set.
        </h1>
        <p className="max-w-md text-sm text-base-content/60 sm:text-base">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a href="#library" className="btn btn-primary rounded-full px-6">
          Browse Workouts
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-box border border-base-300 bg-base-200">
        <Image
          src={BannerImg}
          alt="FitLog workout illustration"
          fill
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}
