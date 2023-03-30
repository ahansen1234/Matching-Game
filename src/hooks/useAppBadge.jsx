import { useState } from 'react';

const useAppBadge = () => {
  const [counter, setCounter] = useState(1);
    //set badge
  const setBadge = () => {
    setCounter(counter + 1);
    if (navigator.setAppBadge) {
      navigator.setAppBadge(counter);
    } else if (navigator.setClientBadge) {
      navigator.setClientBadge();
    }
  };
  //clear badge
  const clearBadge = () => {
    setCounter(1);
    if (navigator.clearAppBadge) {
      navigator.clearAppBadge();
    } else if (navigator.clearClientBadge) {
      navigator.clearClientBadge();
    }
  };

  return [setBadge, clearBadge];
};

export default useAppBadge;