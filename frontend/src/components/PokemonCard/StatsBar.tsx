interface StatBarProps {
  label: string;
  value: number;
}

const MAX_STAT_VALUE = 255;

function StatBar({ label, value }: StatBarProps) {
  const barWidth = Math.min((value / MAX_STAT_VALUE) * 100, 100);

  return (
    <div>
      <div className="flex justify-between items-center gap-2 text-sm font-bold">
        <span className="w-25 text-left">{label}</span>
        <div className="w-full bg-yellow-200/50 rounded-full h-1.5 shadow-inner">
          <div
            className="bg-gradient-to-r from-blue-200 to-blue-500 h-1.5 rounded-full"
            style={{ width: `${barWidth}%` }}
          ></div>
        </div>
        <span>{value}</span>
      </div>
    </div>
  );
}

export default StatBar;
