import { useState, useEffect } from "react";

function useGetTime(inputTime) {
  const [time, setTime] = useState();
  inputTime /= 3600;
  inputTime -= 2;

  const addZeroes = (num) => {
    return num < 10 ? "0" + num : num;
  };

  useEffect(() => {
    setInterval(() => {
      const today = new Date(new Date().setHours(new Date().getHours() + inputTime));
      const hr = addZeroes(today.getHours());
      const min = addZeroes(today.getMinutes());
      setTime(hr + ":" + min);
    }, 1000);
  }, [inputTime]);

  return {
    time,
  };
}

export default useGetTime;
