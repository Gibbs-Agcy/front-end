'use client'

import React from 'react';
import Image from 'next/image';
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Hydration hatalarını önlemek için
  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { name: "Ana Sayfa", href: "#hero" },
    { name: "Hizmetler", href: "#services" },
    { name: "Projeler", href: "#portfolio" },
    { name: "Hakkımızda", href: "#about" },
    { name: "İletişim", href: "#contact" },
  ];

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    console.log("Theme switched to:", newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full bg-background/70 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <NextUINavbar 
          onMenuOpenChange={setIsMenuOpen}
          maxWidth="full"
          position="static"
          className="bg-transparent"
        >
          {/* Logo - Sol taraf */}
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <Link 
                href={pathname === '/' ? '#hero' : '/#hero'} 
                className="flex items-center gap-2"
                onClick={(e) => {
                  if (pathname !== '/') {
                    e.preventDefault();
                    router.push('/#hero');
                  }
                }}
              >
                <Image 
                  src={theme === "dark" ? "/gibbsbg.png" : "/gibbsbl.png"} 
                  alt="Gibbs Logo" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
                <span 
                  className="font-bold text-xl"
                  style={{ color: theme === "dark" ? "#f1f1f1" : "#353535" }}
                >
                  Gibbs<span style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}>.</span>
                </span>
              </Link>
            </NavbarBrand>
          </NavbarContent>

          {/* Desktop Menu - Orta */}
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {menuItems.map((item) => (
              <NavbarItem key={item.name}>
                <Link
                  color="foreground"
                  href={pathname === '/' ? item.href : `/${item.href}`}
                  className="hover:text-primary transition-colors cursor-pointer"
                  onClick={(e) => {
                    if (pathname !== '/') {
                      e.preventDefault();
                      router.push(`/${item.href}`);
                    } else {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {item.name}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>

          {/* Dark Mode Toggle - Sağ taraf */}
          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                isIconOnly
                variant="light"
                onClick={toggleTheme}
                aria-label="Tema değiştir"
                className="text-foreground hover:bg-default-100"
              >
                {theme === "dark" ? (
                  <FiSun size={20} className="text-warning" />
                ) : (
                  <FiMoon size={20} className="text-primary" />
                )}
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden md:flex">
              <Button 
                color="primary" 
                variant="flat"
                onClick={() => {
                  if (pathname !== '/') {
                    router.push('/#contact');
                  } else {
                    const element = document.querySelector('#contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                İletişime Geç
              </Button>
            </NavbarItem>
          </NavbarContent>

          {/* Mobile Menu */}
          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.name}-${index}`}>
                <Link
                  color="foreground"
                  className="w-full text-lg"
                  href={pathname === '/' ? item.href : `/${item.href}`}
                  size="lg"
                  onPress={() => {
                    setIsMenuOpen(false);
                    if (pathname !== '/') {
                      router.push(`/${item.href}`);
                    } else {
                      setTimeout(() => {
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  }}
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </NextUINavbar>
      </div>
    </div>
  );
}

