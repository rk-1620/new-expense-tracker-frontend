// utils/pingBackend.js
export const pingBackend = async () => {
  try {
    await fetch('https://new-expense-tracker-server.onrender.com/api/ping'); // or any lightweight endpoint
    console.log('Backend pinged!');
  } catch (err) {
    console.warn('Backend ping failed:', err.message);
  }
};
