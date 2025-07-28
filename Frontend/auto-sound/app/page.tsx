"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: 1,
    },
  });

  return (
    <main className="min-h-screen bg-black text-white pt-[130px] px-4 md:px-20">
      {/* Блок баннера */}
      <section className="mb-16 relative">
        <div
          ref={sliderRef}
          className="keen-slider max-w-6xl mx-auto rounded-xl overflow-hidden"
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="keen-slider__slide relative"
              style={{ aspectRatio: "1440 / 326" }}
            >
              <Image
                src={`/banners/banner${i}.jpg`}
                alt={`Баннер ${i}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold">🔥 Акция #{i}</h3>
                <p className="text-sm">Успей до конца недели!</p>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопки навигации */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="bg-black/50 hover:bg-black/80 transition rounded-full p-2"
          >
            ◀
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
          <button
            onClick={() => instanceRef.current?.next()}
            className="bg-black/50 hover:bg-black/80 transition rounded-full p-2"
          >
            ▶
          </button>
        </div>

        {/* Точки-индикаторы */}
        <div className="flex justify-center mt-4 space-x-2">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              className={`h-2 w-2 rounded-full ${
                currentSlide === i ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Блок новостей */}
      <section className="space-y-8 mb-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold">📰 Новости</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Link
              href="#"
              key={i}
              className="bg-zinc-900 rounded-xl overflow-hidden shadow hover:shadow-indigo-500/30 transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={`/news/news${i}.webp`}
                  alt={`Новость ${i}`}
                  fill
                  className="object-cover"
                  
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Новость #{i}</h3>
                <p className="text-sm text-zinc-300">
                  Обновление ассортимента, новинки, акции и спецпредложения —
                  следите за нашими новостями!
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
