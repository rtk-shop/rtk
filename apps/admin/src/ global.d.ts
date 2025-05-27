import type { TgAuthWidgetUserData } from "@/types/user";

declare global {
  interface Window {
    onTelegramWidgetAuth?: (user: TgAuthWidgetUserData) => void;
  }
}

export {};
