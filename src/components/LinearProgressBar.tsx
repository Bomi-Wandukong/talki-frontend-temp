import React, { useEffect, useState } from "react";

interface LinearProgressBarProps {
  label: string;
  score: number;
  maxScore?: number;
}

const LinearProgressBar: React.FC<LinearProgressBarProps> = ({
  label,
  score,
  maxScore = 100,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  /** 점수에 따른 색상 */
  const getBarColor = (score: number) => {
    if (score < 40) return "#DB1013";
    if (score < 70) return "#FFA956";
    return "#4DCB56";
  };

  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    const increment = score / steps;

    let current = 0;
    const timer = setInterval(() => {
      current++;
      if (current <= steps) {
        setAnimatedScore(Math.round(increment * current));
      } else {
        setAnimatedScore(score);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const percentage = Math.min((animatedScore / maxScore) * 100, 100);

  return (
    <div className="fontRegular flex items-center w-full gap-4">
      {/* Label */}
      <span className="text-[15px] mr-[13%]">{label}</span>

      {/* Progress Bar */}
      <div className="flex-1 h-4 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: getBarColor(score),
          }}
        />
      </div>

      {/* Score */}
      <span className="text-center text-[15px] text-[#3B3B3B] fontRegular">
        <span className="text-[#5650FF] fontBold text-[20px]">
          {animatedScore}
        </span>
        /{maxScore}
      </span>
    </div>
  );
};

export default LinearProgressBar;
