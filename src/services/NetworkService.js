export const checkNetworkStatus = async () => {
  try {
    // Check browser connectivity
    const online = navigator.onLine;
    if (!online) return { networkDown: true, serverDown: false };
    
    // Check server connectivity
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/health`, {
      method: 'HEAD',
      cache: 'no-store'
    });
    return {
      networkDown: false,
      serverDown: !response.ok
    };
  } catch (error) {
    return { networkDown: false, serverDown: true };
  }
};

export const setupNetworkMonitor = (callback, interval = 30000) => {
  // Immediate first check
  checkNetworkStatus().then(callback);
  
  // Set up periodic checking
  const intervalId = setInterval(() => {
    checkNetworkStatus().then(callback);
  }, interval);
  
  // Listen to browser online/offline events
  window.addEventListener('online', () => checkNetworkStatus().then(callback));
  window.addEventListener('offline', () => callback({ networkDown: true, serverDown: false }));
  
  return () => {
    clearInterval(intervalId);
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};