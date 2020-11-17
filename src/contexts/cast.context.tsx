import React, { useState, useEffect, useMemo, useContext, createContext } from 'react';
import { CastReceiverContext } from '../@types/CastReceiver';

declare const cast: any;

const NAMESPACE = 'urn:x-cast:dev.esanchezvz.custom-cast-test';

const CastContext = createContext<Context>({
  castReady: false,
  context: null,
});

export const CastProvider: React.FC = ({ children }) => {
  const [castReady, setReady] = useState(false);
  const [context, setContext] = useState<CastReceiverContext | null>(null);
  const providerValue = useMemo(() => ({ castReady, context }), [castReady, context]);

  useEffect(() => {
    setContext(cast.framework.CastReceiverContext.getInstance());
  }, []);

  useEffect(() => {
    if (!castReady && context) {
      const _listener = (e: { type: string; data: any }) => {
        console.log(e);
      };

      context.addCustomMessageListener(NAMESPACE, _listener);
      context.start();
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  return <CastContext.Provider value={providerValue}>{children}</CastContext.Provider>;
};

export const useCast = () => useContext(CastContext);

interface Context {
  castReady: boolean;
  context: any;
}
