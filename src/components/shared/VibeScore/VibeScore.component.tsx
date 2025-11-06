import { TrendingDown, TrendingUpDown, TrendingUp } from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { useEffect, useState } from "react";

type VibeScoreData = {
  companyName: string;
  vibeScore: number;
};

interface VibeScoreProps {
  data: VibeScoreData;
}

export default function VibeScore({ data }: VibeScoreProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) => Math.round(value));
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(rounded, "change", (latest) => {
    setDisplayValue(latest);
  });

  useEffect(() => {
    const controls = animate(count, data.vibeScore, {
      duration: (data.vibeScore / 100) * 3,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [data.vibeScore, count]);

  const getScoreColor = (score: number) => {
    if (score <= 35) {
      return {
        border: "border-red-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        hover: "hover:bg-red-100 dark:hover:bg-red-950/30",
        text: "text-red-700 dark:text-red-400",
        icon: "text-red-600 dark:text-red-500",
        iconComponent: TrendingDown,
      };
    } else if (score > 35 && score <= 70) {
      return {
        border: "border-yellow-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        hover: "hover:bg-yellow-100 dark:hover:bg-yellow-950/30",
        text: "text-yellow-700 dark:text-yellow-400",
        icon: "text-yellow-600 dark:text-yellow-500",
        iconComponent: TrendingUpDown,
      };
    } else {
      return {
        border: "border-green-500",
        bg: "bg-green-50 dark:bg-green-950/20",
        hover: "hover:bg-green-100 dark:hover:bg-green-950/30",
        text: "text-green-700 dark:text-green-400",
        icon: "text-green-600 dark:text-green-500",
        iconComponent: TrendingUp,
      };
    }
  };

  const colorScheme = getScoreColor(data.vibeScore);
  const Icon = colorScheme.iconComponent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-fit my-4 border-2 rounded-lg px-4 py-3 shadow-md ${colorScheme.bg} ${colorScheme.hover} transition-colors`}
    >
      <div className="flex items-center gap-3">
        <div className={`${colorScheme.icon} flex-shrink-0`}>
          <Icon size={24} />
        </div>
        <div className="flex items-center gap-1">
          <h1 className={`min-w-18 text-3xl font-bold ${colorScheme.text}`}>
            {displayValue}%
          </h1>
          <div className="flex flex-col">
            <p className="text-sm font-bold text-gray-600 dark:text-white">
              {data.companyName}&apos;s
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Vibe Score
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
