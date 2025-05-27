"use client";

import { useEffect, useRef } from "react";

export function AuthWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.onTelegramWidgetAuth = (user) => {
      console.log("user ->", user);
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;

    script.setAttribute("data-telegram-login", "shop_rtk_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-radius", "10");
    script.setAttribute("data-onauth", "onTelegramWidgetAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-lang", "ru");

    containerRef.current?.appendChild(script);

    return () => {
      delete window.onTelegramWidgetAuth;
      containerRef.current?.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center items-center" ref={containerRef}>
      {/* <p>Widget</p> */}
    </div>
  );
}
