"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import tailwindColors from "tailwindcss/colors";

const getTailwindColorFromHex = (hex: string) => {
  for (const [colorName, colorValues] of Object.entries(tailwindColors)) {
    if (typeof colorValues === "object") {
      for (const [shade, shadeValue] of Object.entries(colorValues)) {
        if (shadeValue === hex) {
          return { color: colorName, shade };
        }
      }
    }
  }
  return { color: "", shade: "" };
};

export default function ColorPicker({
  currentColor,
  onColorChange,
}: {
  currentColor: string;
  onColorChange: Function;
}) {
  const colors = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ];
  const shades = [
    "white",
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ];
  const twColor = getTailwindColorFromHex(currentColor);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const onColorClick = (color: string) => {
    // setShowColorPicker(!showColorPicker);
    onColorChange(color);
  };
  const [maxHeight, setMaxHeight] = useState(0);
  const colorPickerContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef(null);

  const updateMaxHeight = () => {
    const viewportHeight = window.innerHeight;
    if (colorPickerContainerRef.current !== null) {
      const triggerRect =
        colorPickerContainerRef.current.getBoundingClientRect();
      const maxHeight = viewportHeight - triggerRect.top;
      setMaxHeight(maxHeight);
    }
  };

  // Set max height
  useEffect(() => {
    updateMaxHeight();
    // window.addEventListener('resize', updateMaxHeight);

    // return () => {
    //   window.removeEventListener('resize', updateMaxHeight);
    // };
  }, []);

  // close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        colorPickerContainerRef.current &&
        !colorPickerContainerRef.current.contains(event.target as Node) &&
        buttonRef.current !== event.target
      ) {
        setShowColorPicker(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="h-6 w-10 rounded-md"
        style={{ backgroundColor: currentColor }}
        onClick={() => setShowColorPicker(!showColorPicker)}
      ></button>
      <div ref={colorPickerContainerRef}>
        {showColorPicker && (
          <div
            style={{ maxHeight }}
            className="absolute -right-2 z-50  min-w-fit overflow-auto rounded border bg-white px-2 py-1 shadow"
          >
            <div className="grid min-w-max grid-cols-12 gap-1">
              {colors.map((color) =>
                shades.map((shade) =>
                  shade !== "white" ? (
                    <button
                      key={`${color}-${shade}`}
                      className={clsx(
                        " h-5 w-6 rounded",
                        twColor.color === color &&
                          twColor.shade === shade &&
                          "outline outline-offset-1 outline-gray-600"
                      )}
                      // @ts-ignore
                      style={{ backgroundColor: tailwindColors[color][shade] }}
                      onClick={(e) => {
                        e.stopPropagation;
                        e.preventDefault;
                        // @ts-ignore
                        onColorClick(tailwindColors[color][shade]);
                      }}
                    ></button>
                  ) : (
                    <button
                      key={`${color}-${shade}`}
                      className=" h-5 w-6 rounded border border-gray-50"
                      style={{ backgroundColor: "#ffffff" }}
                      onClick={(e) => {
                        e.stopPropagation;
                        e.preventDefault;
                        onColorClick("#ffffff");
                      }}
                    ></button>
                  )
                )
              )}
            </div>
            <div className="mt-2">
              <p>Pick custom color:</p>
              <input
                type="color"
                className="bg-white hover:cursor-pointer"
                value={currentColor}
                onChange={(e) => onColorClick(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
