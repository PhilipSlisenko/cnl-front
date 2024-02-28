"use client";

import { CopyIcon, Palette } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Theme } from "../types";
import ColorPicker from "./colorPicker";

interface ThemeForm {
  colors: {
    accent_color: string;
    bg_color: string;
    user_message_bg_color: string;
    user_message_text_color: string;
    bot_message_bg_color: string;
    bot_message_text_color: string;
  };
  rounded: string;
}

export default function ThemeEditor({
  onThemeChange,
  currentTheme,
}: {
  onThemeChange: Function;
  currentTheme: Theme;
}) {
  const currentThemeForm: ThemeForm = {
    colors: {
      accent_color: currentTheme.accentColor,
      bg_color: currentTheme.bgColor,
      bot_message_bg_color: currentTheme.botMessageBgColor,
      bot_message_text_color: currentTheme.botMessageTextColor,
      user_message_bg_color: currentTheme.userMessageBgColor,
      user_message_text_color: currentTheme.userMessageTextColor,
    },
    rounded: currentTheme.rounded,
  };
  const [themeForm, setThemeForm] = useState<ThemeForm>(currentThemeForm);
  const [showThemePicker, setShowThemePicker] = useState<boolean>(false);
  const handleColorChange = (key: any, value: any) => {
    // debugger;
    const newThemeForm: ThemeForm = {
      ...themeForm,
      colors: { ...themeForm.colors, [key]: value },
    };
    setThemeForm(newThemeForm);
    const newTheme: Theme = {
      accentColor: newThemeForm.colors.accent_color,
      bgColor: newThemeForm.colors.bg_color,
      botMessageBgColor: newThemeForm.colors.bot_message_bg_color,
      botMessageTextColor: newThemeForm.colors.bot_message_text_color,
      userMessageBgColor: newThemeForm.colors.user_message_bg_color,
      userMessageTextColor: newThemeForm.colors.user_message_text_color,
      size: "lg",
      rounded: newThemeForm.rounded,
    };
    onThemeChange(newTheme);
  };

  const themeEditorContainerRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        themeEditorContainerRef.current &&
        // @ts-ignore
        !themeEditorContainerRef.current.contains(event.target) &&
        // @ts-ignore
        !buttonRef.current.contains(event.target)
      ) {
        setShowThemePicker(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative p-1 px-1.5">
      <div className="flex justify-end">
        <button
          ref={buttonRef}
          onClick={() => setShowThemePicker(!showThemePicker)}
          className="rounded-full p-2 hover:bg-gray-200"
        >
          <Palette className="h-6 w-6" />
        </button>
      </div>
      {showThemePicker && (
        <div
          ref={themeEditorContainerRef}
          className="z-50 mt-0.5 w-auto max-w-fit rounded-md border bg-white p-4"
        >
          <div className="grid grid-cols-[auto_auto] items-center gap-4">
            {Object.entries(themeForm.colors).map(([key, value]) => (
              <React.Fragment key={key}>
                <div className="justify-self-end text-sm font-semibold capitalize">
                  {key.split("_").join(" ")}
                </div>
                <ColorPicker
                  currentColor={value}
                  onColorChange={(color: string) => {
                    handleColorChange(key, color);
                  }}
                />
              </React.Fragment>
            ))}
            <React.Fragment key="rounded">
              <div className="justify-self-end text-sm font-semibold capitalize">
                Rounded
              </div>
              <select
                value={themeForm.rounded}
                onChange={(e) =>
                  setThemeForm({ ...themeForm, rounded: e.target.value })
                }
                className="rounded-md py-0.5 pl-1 pr-3  focus:ring-0"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </React.Fragment>
            <React.Fragment key="copy-config">
              <Button
                variant={"outline"}
                onClick={() => {
                  const jsonString = JSON.stringify(themeForm, null, 2); // Stringify with formatting
                  navigator.clipboard.writeText(jsonString);
                }}
              >
                Copy config <CopyIcon className="size-5 ml-2" />
              </Button>
            </React.Fragment>
          </div>
        </div>
      )}
    </div>
  );
}
