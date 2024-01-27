import moment from "moment";
import React, { useEffect, useState } from "react";

interface RelativeTimeDisplayProps {
  timestamp: string; // Assuming timestamp is a string in the format '2024-01-26T17:10:24.756+00:00'
}

const MomentTimeDisplay: React.FC<RelativeTimeDisplayProps> = ({
  timestamp,
}) => {
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const calculateRelativeTime = () => {
      const now = moment();
      const time = moment(timestamp);
      const diffInMinutes = now.diff(time, 'minutes');

      if (diffInMinutes < 1) {
        setRelativeTime('Just now');
      } else if (diffInMinutes < 60) {
        setRelativeTime(`${diffInMinutes} mins ago`);
      } else if (diffInMinutes < 60 * 24) {
        setRelativeTime(`${Math.floor(diffInMinutes / 60)} hrs ago`);
      } else if (now.isSame(time, 'day')) {
        setRelativeTime('Today');
      } else if (now.isSame(time.clone().subtract(1, 'day'), 'day')) {
        setRelativeTime('Yesterday');
      } else if (now.isSame(time, 'year')) {
        setRelativeTime(time.format('dddd D MMM'));
      } else {
        setRelativeTime(time.format('dddd D MMM, YYYY'));
      }
    };

    calculateRelativeTime();
  }, [timestamp]);

  return <p className="text-[12px] text-gray-400">{relativeTime}</p>;
};

export default MomentTimeDisplay;
