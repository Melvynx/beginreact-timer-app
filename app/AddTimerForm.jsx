import { useState } from "react";
import { useTimerStore } from "./timer.store";

const InputField = ({ name, value, onChange }) => (
  <input
    name={name}
    value={value}
    onChange={onChange}
    className="h-24 w-20 rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content focus:outline-none md:h-20 md:w-32 md:text-6xl lg:h-32 lg:w-40 lg:text-8xl"
  />
);

const formatTimeValue = (value, maxValue) => {
  const intValue = parseInt(value, 10);
  if (isNaN(intValue)) return "";
  return Math.min(intValue, maxValue).toString().slice(-2).padStart(2, "0");
};

export const AddTimerForm = () => {
  const addTimer = useTimerStore((state) => state.addTimer);
  const [time, setTime] = useState({ hrs: "00", mins: "01", secs: "00" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatTimeValue(value, name === "hrs" ? 23 : 59);
    setTime((prevTime) => ({ ...prevTime, [name]: formattedValue }));
  };

  const handleAddTimer = () => {
    const ms =
      parseInt(time.hrs, 10) * 3600000 +
      parseInt(time.mins, 10) * 60000 +
      parseInt(time.secs, 10) * 1000;

    if (ms < 10000) {
      alert("Timer must be at least 10 seconds");
      return;
    }

    addTimer(ms);
  };

  return (
    <div className="mx-auto flex w-fit flex-col gap-4">
      <div className="flex items-center justify-between ">
        {["hr", "min", "sec"].map((label) => (
          <p key={label} className="flex-1 text-center text-neutral-content">
            {label}
          </p>
        ))}
      </div>
      <div className="flex items-center rounded-md border border-neutral bg-base-200 p-2">
        <InputField name="hrs" value={time.hrs} onChange={handleInputChange} />
        <p className="text-lg">:</p>
        <InputField
          name="mins"
          value={time.mins}
          onChange={handleInputChange}
        />
        <p className="text-lg">:</p>
        <InputField
          name="secs"
          value={time.secs}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-end gap-4">
        <button className="btn btn-success" onClick={handleAddTimer}>
          Add Timer
        </button>
      </div>
    </div>
  );
};
