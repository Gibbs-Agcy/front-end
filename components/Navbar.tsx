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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
    <NextUINavbar 
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      position="sticky"
      className="bg-background/70 backdrop-blur-md"
    >
      {/* Logo - Sol taraf */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="#hero" className="flex items-center gap-2">
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
              href={item.href}
              className="hover:text-primary transition-colors"
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
          <Button as={Link} color="primary" href="#contact" variant="flat">
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
              href={item.href}
              size="lg"
              onPress={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
}

