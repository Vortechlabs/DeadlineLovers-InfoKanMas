import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getTanggalSekarang() {
  const now = new Date();
  return now.toLocaleString("id-ID", {
    weekday: "long",     // Minggu
    day: "2-digit",      // 13
    month: "long",       // Juli
    year: "numeric",     // 2025
    hour: "2-digit",     // 14
    minute: "2-digit",   // 30
    hour12: false,
    timeZone: "Asia/Jakarta"
  }) + " WIB";
}

export function getTanggalPendek() {
  const now = new Date();
  const tgl = now.toLocaleDateString("id-ID"); // Contoh: 13/07/2025
  const jam = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }); // Contoh: 14:55

  return `${tgl} ${jam} WIB`; // Output: 13/07/2025 14:55 WIB
}