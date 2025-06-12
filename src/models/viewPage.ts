import { useCallback, useState } from 'react';

export default () => {
  const [isView, setEdit] = useState(false);
  const toggleView = useCallback((state: boolean) => setEdit(state), []);
  return { isView, toggleView };
};
