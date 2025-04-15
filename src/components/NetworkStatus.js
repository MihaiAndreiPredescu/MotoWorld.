import { useEffect, useState } from 'react';
import { checkNetworkStatus } from '../services/NetworkService';

const NetworkStatus = () => {
  const [status, setStatus] = useState({ networkDown: false, serverDown: false });

  useEffect(() => {
    const checkStatus = async () => {
      const newStatus = await checkNetworkStatus();
      setStatus(newStatus);
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!status.networkDown && !status.serverDown) return null;

  return (
    <div className="network-status">
      {status.networkDown && <div>Network offline - working locally</div>}
      {status.serverDown && <div>Server unavailable - working locally</div>}
    </div>
  );
};