"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  RotateCcw,
  Volume2,
  VolumeX,
  FileText,
} from "lucide-react";

type KeyboardLayout = "80% TKL" | "100%" | "65%";

interface KeyInfo {
  code: string;
  label: string;
  width?: string;
}

export default function KeyboardTesterPage() {
  const [layout, setLayout] = useState<KeyboardLayout>("80% TKL");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [testedKeys, setTestedKeys] = useState<Set<string>>(new Set());
  const [lastKey, setLastKey] = useState<{ code: string; label: string; keyCode: number }>({
    code: "None",
    label: "None",
    keyCode: 0,
  });

  const [activeModifiers, setActiveModifiers] = useState<string[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play Mechanical Click Sound using Web Audio API
  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio context fallbacks silently if restricted by browser policies
    }
  }, [soundEnabled]);

  // Global Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser default actions for keys like Tab, Backspace, Arrow keys, spacebar scroll
      if (["Tab", "Backspace", "Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
      }

      const code = e.code;
      let label = e.key.toUpperCase();
      if (code === "Space") label = "SPACEBAR";
      if (code === "ShiftLeft") label = "L-SHIFT";
      if (code === "ShiftRight") label = "R-SHIFT";
      if (code === "ControlLeft") label = "L-CTRL";
      if (code === "ControlRight") label = "R-CTRL";
      if (code === "AltLeft") label = "L-ALT";
      if (code === "AltRight") label = "R-ALT";

      // Track active modifiers
      const modifiers: string[] = [];
      if (e.shiftKey) modifiers.push("SHIFT");
      if (e.ctrlKey) modifiers.push("CTRL");
      if (e.altKey) modifiers.push("ALT");
      if (e.metaKey) modifiers.push("CMD");
      setActiveModifiers(modifiers);

      setPressedKeys((prev) => {
        if (!prev.has(code)) playClickSound();
        return new Set(prev).add(code);
      });

      setTestedKeys((prev) => new Set(prev).add(code));
      setLastKey({ code, label, keyCode: e.keyCode || 0 });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const code = e.code;
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(code);
        return next;
      });

      // Update active modifiers
      const modifiers: string[] = [];
      if (e.shiftKey) modifiers.push("SHIFT");
      if (e.ctrlKey) modifiers.push("CTRL");
      if (e.altKey) modifiers.push("ALT");
      if (e.metaKey) modifiers.push("CMD");
      setActiveModifiers(modifiers);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [playClickSound]);

  const handleReset = () => {
    setTestedKeys(new Set());
    setPressedKeys(new Set());
    setLastKey({ code: "None", label: "None", keyCode: 0 });
    setActiveModifiers([]);
  };

  // Export Test Report File
  const handleExportReport = () => {
    const totalKeysInLayout = layout === "100%" ? 104 : layout === "65%" ? 68 : 87;
    const reportText = `====================================
KEYBOARD TEST REPORT
====================================
Layout Mode   : ${layout}
Keys Tested   : ${testedKeys.size} / ${totalKeysInLayout}
Tested Keys   : ${Array.from(testedKeys).join(", ") || "None"}
Timestamp     : ${new Date().toLocaleString()}
====================================`;

    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `keyboard-test-report-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Layout Rows
  const row1: KeyInfo[] = [
    { code: "Escape", label: "Esc" },
    { code: "F1", label: "F1" },
    { code: "F2", label: "F2" },
    { code: "F3", label: "F3" },
    { code: "F4", label: "F4" },
    { code: "F5", label: "F5" },
    { code: "F6", label: "F6" },
    { code: "F7", label: "F7" },
    { code: "F8", label: "F8" },
    { code: "F9", label: "F9" },
    { code: "F10", label: "F10" },
    { code: "F11", label: "F11" },
    { code: "F12", label: "F12" },
  ];

  const row2: KeyInfo[] = [
    { code: "Backquote", label: "~" },
    { code: "Digit1", label: "1" },
    { code: "Digit2", label: "2" },
    { code: "Digit3", label: "3" },
    { code: "Digit4", label: "4" },
    { code: "Digit5", label: "5" },
    { code: "Digit6", label: "6" },
    { code: "Digit7", label: "7" },
    { code: "Digit8", label: "8" },
    { code: "Digit9", label: "9" },
    { code: "Digit0", label: "0" },
    { code: "Minus", label: "-" },
    { code: "Equal", label: "=" },
    { code: "Backspace", label: "Backspace", width: "w-20" },
  ];

  const row3: KeyInfo[] = [
    { code: "Tab", label: "Tab", width: "w-14" },
    { code: "KeyQ", label: "Q" },
    { code: "KeyW", label: "W" },
    { code: "KeyE", label: "E" },
    { code: "KeyR", label: "R" },
    { code: "KeyT", label: "T" },
    { code: "KeyY", label: "Y" },
    { code: "KeyU", label: "U" },
    { code: "KeyI", label: "I" },
    { code: "KeyO", label: "O" },
    { code: "KeyP", label: "P" },
    { code: "BracketLeft", label: "[" },
    { code: "BracketRight", label: "]" },
    { code: "Backslash", label: "\\", width: "w-12" },
  ];

  const row4: KeyInfo[] = [
    { code: "CapsLock", label: "Caps Lock", width: "w-16" },
    { code: "KeyA", label: "A" },
    { code: "KeyS", label: "S" },
    { code: "KeyD", label: "D" },
    { code: "KeyF", label: "F" },
    { code: "KeyG", label: "G" },
    { code: "KeyH", label: "H" },
    { code: "KeyJ", label: "J" },
    { code: "KeyK", label: "K" },
    { code: "KeyL", label: "L" },
    { code: "Semicolon", label: ";" },
    { code: "Quote", label: "'" },
    { code: "Enter", label: "Enter", width: "w-20" },
  ];

  const row5: KeyInfo[] = [
    { code: "ShiftLeft", label: "Shift", width: "w-24" },
    { code: "KeyZ", label: "Z" },
    { code: "KeyX", label: "X" },
    { code: "KeyC", label: "C" },
    { code: "KeyV", label: "V" },
    { code: "KeyB", label: "B" },
    { code: "KeyN", label: "N" },
    { code: "KeyM", label: "M" },
    { code: "Comma", label: "," },
    { code: "Period", label: "." },
    { code: "Slash", label: "/" },
    { code: "ShiftRight", label: "Shift", width: "w-24" },
  ];

  const row6: KeyInfo[] = [
    { code: "ControlLeft", label: "Ctrl", width: "w-12" },
    { code: "AltLeft", label: "Opt", width: "w-12" },
    { code: "MetaLeft", label: "Cmd", width: "w-12" },
    { code: "Space", label: "Spacebar", width: "flex-1" },
    { code: "MetaRight", label: "Cmd", width: "w-12" },
    { code: "AltRight", label: "Opt", width: "w-12" },
  ];

  // Render Keycap Component
  const renderKey = (key: KeyInfo) => {
    const isPressed = pressedKeys.has(key.code);
    const isTested = testedKeys.has(key.code);

    let keyStyle =
      "bg-white text-slate-700 border-slate-200/80 shadow-[0_2px_4px_rgba(0,0,0,0.04)]";

    if (isPressed) {
      keyStyle =
        "bg-[#3b82f6] text-white border-[#2563eb] shadow-md scale-[0.97]";
    } else if (isTested) {
      keyStyle =
        "bg-[#46eacb] text-slate-800 border-[#32d8b8] shadow-[0_2px_4px_rgba(70,234,203,0.3)]";
    }

    return (
      <div
        key={key.code}
        className={`flex h-11 items-center justify-center rounded-xl border-2 text-xs font-bold transition-all select-none ${
          key.width || "w-11"
        } ${keyStyle}`}
      >
        {key.label}
      </div>
    );
  };

  const totalKeysInCurrentLayout =
    layout === "100%" ? 104 : layout === "65%" ? 68 : 87;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Header Title */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Keyboard Key Tester
        </h1>
        <p className="text-sm font-medium text-slate-500">
          Validate switch consistency and ghosting profiles in real-time.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* LEFT COLUMN: Controls & Info */}
        <div className="space-y-6 lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
            {/* Keyboard Layout Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                KEYBOARD LAYOUT
              </label>
              <select
                value={layout}
                onChange={(e) => setLayout(e.target.value as KeyboardLayout)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 focus:border-indigo-500 focus:outline-none cursor-pointer"
              >
                <option value="80% TKL">80% TKL</option>
                <option value="100%">100% Full-Size</option>
                <option value="65%">65% Compact</option>
              </select>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-3">
              {/* Keys Tested */}
              <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f0edff] p-5 text-center">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">
                  KEYS TESTED
                </span>
                <span className="mt-2 text-2xl font-black text-indigo-600">
                  {testedKeys.size} / {totalKeysInCurrentLayout}
                </span>
              </div>

              {/* Last Key */}
              <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f0edff] p-5 text-center">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">
                  LAST KEY
                </span>
                <span className="mt-1 text-base font-black text-slate-900 leading-tight truncate max-w-full px-1">
                  [ {lastKey.label} ]
                </span>
              </div>
            </div>

            {/* Sound Feedback Toggle */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5 text-indigo-600" />
                ) : (
                  <VolumeX className="h-5 w-5 text-slate-400" />
                )}
                <span>Sound Feedback</span>
              </div>
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  soundEnabled ? "bg-indigo-600" : "bg-slate-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    soundEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Reset Board Button */}
            <button
              type="button"
              onClick={handleReset}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-indigo-400 bg-white text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-50 active:scale-[0.99] cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Board</span>
            </button>
          </div>

          {/* Premium Ad Placement Box */}
          <div className="flex flex-col items-center justify-center h-32 w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              PREMIUM AD PLACEMENT
            </span>
            <span className="mt-1 text-xs italic text-slate-400">
              728x90 Billboard Placeholder
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Virtual Keyboard */}
        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f4f6f8] shadow-xs">
            {/* macOS Window Title Bar */}
            <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/60 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <span className="font-mono text-xs font-bold text-slate-400 tracking-wider">
                VIRTUAL_KEYBOARD_ENGINE v2.4
              </span>
            </div>

            {/* Keyboard Canvas Board Area */}
            <div className="p-6 overflow-x-auto">
              <div className="min-w-[620px] space-y-3">
                {/* Row 1 (Top F-Keys Row) - Hidden in 65% Compact mode */}
                {layout !== "65%" && (
                  <div className="flex items-center gap-2">
                    {row1.slice(0, 1).map(renderKey)}
                    <div className="w-6" /> {/* ESC Gap */}
                    {row1.slice(1, 5).map(renderKey)}
                    <div className="w-6" /> {/* F4-F5 Gap */}
                    {row1.slice(5, 9).map(renderKey)}
                    <div className="w-6" /> {/* F8-F9 Gap */}
                    {row1.slice(9, 13).map(renderKey)}
                  </div>
                )}

                {/* Row 2 */}
                <div className="flex items-center gap-2">{row2.map(renderKey)}</div>

                {/* Row 3 */}
                <div className="flex items-center gap-2">{row3.map(renderKey)}</div>

                {/* Row 4 */}
                <div className="flex items-center gap-2">{row4.map(renderKey)}</div>

                {/* Row 5 */}
                <div className="flex items-center gap-2">{row5.map(renderKey)}</div>

                {/* Row 6 */}
                <div className="flex items-center gap-2">{row6.map(renderKey)}</div>
              </div>
            </div>

            {/* Dynamic Signal Footer Bar */}
            <div className="flex flex-wrap items-center justify-between border-t border-slate-200 bg-[#edeef3] p-4 gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  ACTIVE KEY SIGNAL
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-slate-900 px-3 py-1.5 font-mono text-xs font-bold text-white shadow-xs">
                    {lastKey.code !== "None"
                      ? `KeyCode: ${lastKey.code} (${lastKey.keyCode})`
                      : "No Key Pressed"}
                  </span>

                  {activeModifiers.map((mod) => (
                    <span
                      key={mod}
                      className="rounded-md bg-indigo-600 px-2.5 py-1 text-xs font-bold text-white shadow-xs"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>

              {/* Export Test Report Button */}
              <button
                type="button"
                onClick={handleExportReport}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-xs transition-all hover:bg-slate-50 cursor-pointer"
              >
                <FileText className="h-4 w-4 text-slate-600" />
                <span>Export Test Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}