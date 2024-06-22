"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { AddTimerForm } from "./AddTimerForm";
import { Timer } from "./Timer";
import { useTimerInterval, useTimerStore } from "./timer.store";
import useRequestNotification from "./useRequestNotification";

export default function Home() {
  useRequestNotification();
  useTimerInterval();
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
    <div
      className={clsx("grid grid-cols-1 gap-4", {
        "lg:grid-cols-2": timers.length === 2,
        "lg:grid-cols-3": timers.length > 2,
      })}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {timers.map((timerId) => (
          <motion.div
            key={timerId}
            layout
            className="m-auto size-fit"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Timer id={timerId} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
