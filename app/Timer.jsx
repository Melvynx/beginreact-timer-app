import clsx from "clsx";
import { Bell, Pause, Play, RotateCcw, X } from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import { useTimerStore } from "./timer.store";

export const Timer = ({ id: propsId }) => {
  const timer = useTimerStore((s) => s.timers.find((t) => t?.id === propsId));

  if (!timer) return null;

  const { id, duration, timeLeft, isRunning } = timer;

  const finishDate = new Date(Date.now() + duration);

  const timeText = getTimeText(timeLeft);
  const durationText = getDurationText(duration);

  return (
    <div className="relative flex flex-col gap-2 rounded-md bg-base-200 p-4">
      <div className="relative flex size-48 flex-col items-center justify-center gap-1">
        <CircularProgress
          className="absolute"
          style={{ transform: "rotate(-90deg)" }}
          timeLeft={timeLeft}
          duration={duration}
          width={198}
          radiusRatio={0.9}
        ></CircularProgress>
        <TimerHeader finishDate={finishDate} />
        <TimerDisplay
          timeText={timeText}
          timeLeftFormatted={formatTimeList(timeLeft)}
        />
        <DurationDisplay durationText={durationText} />
      </div>
      <TimerControls id={id} isRunning={isRunning} timeLeft={timeLeft} />
    </div>
  );
};

const TimerHeader = ({ finishDate }) => (
  <div className="flex items-center justify-between gap-2">
    <Bell size={16} className="text-neutral-content" />
    <p>{`${finishDate.getHours()}:${finishDate.getMinutes()}`}</p>
  </div>
);

const TimerDisplay = ({ timeText, timeLeftFormatted }) => (
  <div className="relative flex items-center justify-center">
    <p
      className={clsx("text-base-content", {
        "text-5xl": !timeLeftFormatted.mins && !timeLeftFormatted.hrs,
        "text-4xl": timeLeftFormatted.mins && !timeLeftFormatted.hrs,
        "text-2xl": timeLeftFormatted.hrs,
      })}
    >
      {timeText}
    </p>
  </div>
);

const DurationDisplay = ({ durationText }) => (
  <div>
    <p className="text-sm text-neutral-content">{durationText}</p>
  </div>
);

const TimerControls = ({ id, isRunning, timeLeft }) => {
  const removeTimer = useTimerStore((state) => state.removeTimer);
  const toggleRunning = useTimerStore((state) => state.toggleRunning);

  return (
    <>
      <button
        className="absolute bottom-3 left-3 flex size-7 items-center justify-center rounded-full bg-base-300 p-0 text-base-content"
        onClick={() => removeTimer(id)}
      >
        <X size={14} />
      </button>
      <button
        className={clsx(
          "absolute bottom-3 right-3 flex size-7 items-center justify-center rounded-full p-0",
          {
            "bg-warning text-warning-content": isRunning,
            "bg-success text-success-content": !isRunning,
          }
        )}
        onClick={() => toggleRunning(id)}
      >
        {isRunning ? (
          <Pause fill="currentColor" size={14} />
        ) : timeLeft > 0 ? (
          <Play fill="currentColor" size={14} />
        ) : (
          <RotateCcw size={14} />
        )}
      </button>
    </>
  );
};

const getTimeText = (timeLeft) => {
  const timeLeftFormatted = formatTimeList(timeLeft);
  const timeLeftWithPadTime = padTime(timeLeftFormatted);
  let timeText = `${timeLeftWithPadTime.mins}:${timeLeftWithPadTime.secs}`;

  if (timeLeftFormatted.hrs > 0) {
    timeText = `${timeLeftWithPadTime.hrs}:${timeText}`;
  }

  return timeText;
};

const getDurationText = (duration) => {
  const durationFormatted = formatTimeList(duration);
  const durationWithPadTime = padTime(durationFormatted);
  let durationText = `${durationWithPadTime.secs} secs`;

  if (durationFormatted.mins > 0) {
    durationText = `${durationWithPadTime.mins} mins`;
  }

  if (durationFormatted.hrs > 0) {
    durationText = `${durationWithPadTime.hrs} hrs`;
  }

  return durationText;
};

// A method that takes ms in parameters and return an object with hours, minutes and seconds
const formatTimeList = (ms) => {
  const hrs = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);

  return {
    hrs: hrs,
    mins: mins % 60,
    secs: secs % 60,
  };
};

const padTime = (time) => {
  return {
    hrs: String(time.hrs).padStart(2, "0"),
    mins: String(time.mins).padStart(2, "0"),
    secs: String(time.secs).padStart(2, "0"),
  };
};
