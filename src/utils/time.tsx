export const getDefaultFilterTimestamp = () => {
  const start = new Date();
  start.setDate(-30);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date();
  end.setUTCHours(23, 59, 59, 999);
  return { start: start.toISOString(), end: end.toISOString() };
};
