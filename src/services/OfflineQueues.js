const QUEUE_KEY = 'offline_operations';

export const getQueueLength = () => {
  const queue = JSON.parse(localStorage.getItem(QUEUE_KEY)) || [];
  return queue.length;
};

export const addToQueue = (operation) => {
  const queue = JSON.parse(localStorage.getItem(QUEUE_KEY)) || [];
  queue.push(operation);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
};

export const processQueue = async () => {
  const queue = JSON.parse(localStorage.getItem(QUEUE_KEY)) || [];
  const successfulOps = [];
  
  for (const op of queue) {
    try {
      await fetch(op.url, {
        method: op.method,
        headers: op.headers || {},
        body: op.body
      });
      successfulOps.push(op);
    } catch (error) {
      console.error('Failed to sync operation:', op, error);
      break; // Stop processing if we hit an error
    }
  }
  
  // Remove successful operations
  const newQueue = queue.filter(op => !successfulOps.includes(op));
  localStorage.setItem(QUEUE_KEY, JSON.stringify(newQueue));
  
  return newQueue.length === 0;
};