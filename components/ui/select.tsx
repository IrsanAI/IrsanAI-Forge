"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type SelectContextValue = {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
};

const SelectContext = React.createContext<SelectContextValue>({});

function Select({ value, onValueChange, disabled, children }: { value?: string; onValueChange?: (value: string) => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <SelectContext.Provider value={{ value, onValueChange, disabled }}>
      <div data-slot="select">{children}</div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      data-slot="select-trigger"
      className={cn(
        "border-input bg-background text-sm flex h-10 w-full items-center rounded-md border px-3 py-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = React.useContext(SelectContext);
  return <span data-slot="select-value">{value || placeholder}</span>;
}

function SelectContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { value, onValueChange, disabled } = React.useContext(SelectContext);

  return (
    <select
      className={cn(
        "border-input bg-background ring-offset-background focus:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      value={value}
      onChange={(event) => onValueChange?.(event.target.value)}
      disabled={disabled}
    >
      {children}
    </select>
  );
}

function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}

function SelectGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SelectLabel({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SelectScrollDownButton() {
  return null;
}

function SelectScrollUpButton() {
  return null;
}

function SelectSeparator() {
  return null;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
