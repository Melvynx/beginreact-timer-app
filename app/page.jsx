"use client";

import { useShallow } from "zustand/react/shallow";
import { AddTimerForm } from "./AddTimerForm";
import { Timer } from "./Timer";
import { useTimerStore } from "./timer.store";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-full max-w-3xl flex-col gap-8 p-4">
      <div className="mx-auto w-fit rounded-md bg-base-200 px-4 py-2 text-lg font-bold text-base-content">
        Timer
      </div>
      <AddTimerForm />
      <Timers />
    </main>
  );
}

const Timers = () => {
  const timers = useTimerStore(useShallow((s) => s.timers.map((t) => t?.id)));

  if (timers.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {timers.map((timerId) => (
        <Timer key={timerId} id={timerId} />
      ))}
    </div>
  );
};
