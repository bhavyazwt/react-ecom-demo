import { createContext, useContext, useEffect, useState } from "react";

const SpinContext = createContext({
  loading: false,
  setLoading: () => {},
});
export const useSpin = () => useContext(SpinContext);
const SpinnerProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <SpinContext.Provider value={{ loading, setLoading }}>
      {children}
    </SpinContext.Provider>
  );
};

export default SpinnerProvider;
