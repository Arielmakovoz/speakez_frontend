import { FaICursor } from "react-icons/fa6";
import LengthRadioButton from "./length-radio-button";
import type { lengths } from "~/utils/phrases";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";

export const LengthSelector: React.FC<{
  length: lengths;
  setLength: React.Dispatch<React.SetStateAction<lengths>>;
  onChange: (len: lengths) => void;
}> = ({ length, setLength, onChange }) => {
  const [isShowing, setIsShowing] = useState(false);

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div
      className="group relative flex text-bg-main-light dark:text-bg-main-dark"
      ref={parent}
    >
      <FaICursor
        size="1.5rem"
        className="z-0 transition-all hover:scale-110"
        onClick={() => setIsShowing((p) => !p)}
      />
      {isShowing && (
        <>
          <LengthRadioButton
            groupName="length"
            title="10"
            onClick={() => {
              setLength(10);
              onChange(10);
            }}
            selected={length === 10}
          />
          <LengthRadioButton
            groupName="length"
            title="30"
            onClick={() => {
              setLength(30);
              onChange(30);
            }}
            selected={length === 30}
          />
          <LengthRadioButton
            groupName="length"
            title="60"
            onClick={() => {
              setLength(60);
              onChange(60);
            }}
            selected={length === 60}
          />
        </>
      )}
    </div>
  );
};
