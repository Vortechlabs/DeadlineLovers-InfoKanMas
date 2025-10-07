import React from 'react';

const HeatMap = ({ data, title }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeks = Array.from({ length: 4 }, (_, i) => i + 1);

  const getColorIntensity = (value) => {
    if (value === 0) return 'bg-gray-100';
    if (value < 25) return 'bg-green-100';
    if (value < 50) return 'bg-green-200';
    if (value < 75) return 'bg-green-300';
    return 'bg-green-500';
  };

  const getTooltipText = (value, day, week) => {
    if (value === 0) return `No activity on ${day}, Week ${week}`;
    return `${value} activities on ${day}, Week ${week}`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="flex items-center mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 25, 50, 75, 100].map((value) => (
                <div
                  key={value}
                  className={`w-4 h-4 rounded ${getColorIntensity(value)}`}
                ></div>
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {/* Day labels */}
        <div className="flex flex-col gap-2 pt-6">
          {days.map(day => (
            <div key={day} className="h-6 flex items-center justify-center text-xs text-gray-500 font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-2">
            {weeks.map(week => (
              <div key={week} className="flex flex-col gap-2">
                <div className="text-xs text-gray-500 text-center font-medium h-6 flex items-center justify-center">
                  W{week}
                </div>
                {days.map(day => {
                  const value = data[week]?.[day] || 0;
                  return (
                    <div
                      key={`${week}-${day}`}
                      className={`w-6 h-6 rounded border border-white ${getColorIntensity(value)} transition-all duration-200 hover:scale-125 hover:z-10 relative group`}
                      title={getTooltipText(value, day, week)}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                        <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          {getTooltipText(value, day, week)}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;