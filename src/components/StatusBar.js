import React, { useState, useEffect } from 'react';
import { setupNetworkMonitor } from '../services/NetworkService';
import { getQueueLength } from '../services/OfflineQueues';

const StatusBar = () => {
  const [status, setStatus] = useState({
    networkDown: false,
    serverDown: false,
    queuedItems: 0
  });

  useEffect(() => {
    // Set up network monitoring
    const cleanupNetworkMonitor = setupNetworkMonitor(({ networkDown, serverDown }) => {
      setStatus(prev => ({ ...prev, networkDown, serverDown }));
    }, 5000); // Check every 15 seconds

    // Set up queue monitoring
    const checkQueue = () => {
      setStatus(prev => ({ ...prev, queuedItems: getQueueLength() }));
    };
    
    const queueInterval = setInterval(checkQueue, 5000);
    checkQueue(); // Initial check

    return () => {
      cleanupNetworkMonitor();
      clearInterval(queueInterval);
    };
  }, []);

  if (!status.networkDown && !status.serverDown && status.queuedItems === 0) {
    return null;
  }

  return (
    <div className="status-bar">
      {status.networkDown && (
        <div className="status-item network-down">
          ⚠️ No internet connection - working offline
        </div>
      )}
      
      {!status.networkDown && status.serverDown && (
        <div className="status-item server-down">
          ⚠️ Server unavailable - working offline
        </div>
      )}
      
      {status.queuedItems > 0 && (
        <div className="status-item queued-ops">
          ⏳ {status.queuedItems} pending operation(s) - will sync when back online
        </div>
      )}
    </div>
  );
};

export default StatusBar;