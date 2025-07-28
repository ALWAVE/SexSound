"use client";
import { useState } from "react";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/70 text-white shadow-md">
      {/* Верхняя панель */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Лого */}
        <Link href="/" className="text-2xl font-bold tracking-wide uppercase">
          Sex Sound
          <div className="text-xs font-bold tracking-wide flex">
            Стиль это наше
            <span className="text-purple-300 pl-1 font-bold">имя</span>
          </div>
        </Link>

        {/* Навигация: desktop */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="#" className="hover:text-indigo-400 transition">Главная</Link>
          <Link href="#" className="hover:text-indigo-400 transition">О нас</Link>
          <Link href="#" className="hover:text-indigo-400 transition">Контакты</Link>
        </nav>

        {/* Icons / Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button aria-label="Search" className="hover:text-indigo-400 transition">
            <Search className="w-5 h-5" />
          </button>
          <button aria-label="Cart" className="hover:text-indigo-400 transition">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button aria-label="Login" className="hover:text-indigo-400 transition">
            <User className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-300 rotate-180" />
          ) : (
            <Menu className="w-6 h-6 transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 pb-4 pt-2 bg-black/80 backdrop-blur-sm"
          >
            <div className="flex flex-col space-y-4 text-sm font-medium">
              <Link href="#" className="hover:text-indigo-400 transition">Главная</Link>
              <Link href="#" className="hover:text-indigo-400 transition">О нас</Link>
              <Link href="#" className="hover:text-indigo-400 transition">Контакты</Link>

              {/* Категории (моб) */}
              <div className="pt-2 border-t border-white/10 flex flex-col space-y-2">
                <Link href="#" className="hover:text-indigo-400 transition">Акция</Link>
                <Link href="#" className="hover:text-indigo-400 transition">Акустика</Link>
                <Link href="#" className="hover:text-indigo-400 transition">Сабвуферы</Link>
                <Link href="#" className="hover:text-indigo-400 transition">Усилители</Link>
                <Link href="#" className="hover:text-indigo-400 transition">Подбор компонентов</Link>
                <Link href="#" className="hover:text-indigo-400 transition">Аксессуары</Link>
              </div>

              {/* Авторизация */}
              <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded-full text-sm font-semibold">
                Авторизироваться
              </button>

              {/* Icons */}
              <div className="flex space-x-4 pt-4">
                <Search className="w-5 h-5" />
                <ShoppingCart className="w-5 h-5" />
                <User className="w-5 h-5" />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Категории: только desktop */}
      <div className="hidden md:block border-t border-white/10 bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center overflow-x-auto space-x-6 text-sm font-medium text-white">
          <div className="flex space-x-6 whitespace-nowrap">
            <Link href="#" className="hover:text-indigo-400 transition">Акция</Link>
            <Link href="#" className="hover:text-indigo-400 transition">Акустика</Link>
            <Link href="#" className="hover:text-indigo-400 transition">Сабвуферы</Link>
            <Link href="#" className="hover:text-indigo-400 transition">Усилители</Link>
            <Link href="#" className="hover:text-indigo-400 transition">Подбор компонентов</Link>
            <Link href="#" className="hover:text-indigo-400 transition">Аксессуары</Link>
          </div>

          {/* Авторизация */}
          <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">
            Авторизироваться
          </button>
        </div>
      </div>
    </header>
  );
}
