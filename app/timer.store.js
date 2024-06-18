import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * @typedef {Object} Timer
 * @property {string} id - The unique identifier for the timer. Generated using Date.now()
 * @property {number} duration - The duration of the timer in milliseconds.
 * @property {number} timeLeft - The remaining time of the timer in milliseconds.
 * @property {boolean} isRunning - Indicates if the timer is currently running.
 */

export const useTimerStore = create(
  persist(
    (set) => ({
      timers: [],
      addTimer: (duration) => {
        const id = Date.now();
        set((state) => ({
          timers: [
            ...state.timers,
            {
              id,
              duration,
              timeLeft: duration,
              isRunning: true,
            },
          ],
        }));
      },
      removeTimer: (id) => {
        set((state) => ({
          timers: state.timers.filter((timer) => timer.id !== id),
        }));
      },
      toggleRunning: (id) => {
        set((state) => ({
          timers: state.timers.map((timer) => {
            if (timer.id !== id) return timer;

            if (!timer.isRunning && timer.timeLeft === 0) {
              return { ...timer, isRunning: true, timeLeft: timer.duration };
            }

            return { ...timer, isRunning: !timer.isRunning };
          }),
        }));
      },
    }),
    {
      name: "timers",
    }
  )
);

setInterval(() => {
  useTimerStore.setState((state) => ({
    timers: state.timers.map((timer) => {
      if (!timer.isRunning) {
        return timer;
      }

      if (timer.timeLeft <= 0) {
        state.removeTimer(timer.id);
        const audio = new Audio("/ring.mp3");
        audio.play();
        return {
          ...timer,
          timeLeft: 0,
          isRunning: false,
        };
      }
      return {
        ...timer,
        timeLeft: timer.timeLeft - 1000,
      };
    }),
  }));
}, 1000);
