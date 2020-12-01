import React, { useState, useEffect, useMemo, useContext, createContext } from 'react';
import { CastReceiverContext } from '../@types/CastReceiver';

declare const cast: any;

const NAMESPACE = 'urn:x-cast:dev.esanchezvz.custom-cast-test';

const CastContext = createContext<Context>({
  castReady: false,
  context: null,
  provider: 'youtube',
  videoId: '',
  startSeconds: 0,
});

/**
 * videoId: {
 *  vimeo: '47612678',
 *  youtube: 'z6EchXyieos'
 * }
 */
export const CastProvider: React.FC = ({ children }) => {
  const [castReady, setReady] = useState(false);
  const [videoId, setVideoId] = useState('47612678');
  const [provider, setProvider] = useState<'youtube' | 'vimeo'>('vimeo');
  const [startSeconds, setStartSeconds] = useState<number>(0);
  const [context, setContext] = useState<CastReceiverContext | null>(null);

  const providerValue = useMemo(
    () => ({ castReady, context, videoId, startSeconds, provider }),
    [castReady, context, videoId, startSeconds, provider]
  );

  useEffect(() => {
    setContext(cast.framework.CastReceiverContext.getInstance());
  }, []);

  useEffect(() => {
    if (!castReady && context && process.env.NODE_ENV !== 'development') {
      const _listener = (e: { type: string; data: any }) => {
        console.log(e);
        if (e.data.command === 'INIT_COMMUNICATION') {
          setVideoId(e.data.videoId as string);
          setProvider(e.data.provider);
          setStartSeconds(e.data.startSeconds);
          setReady(true);
        }
      };

      context.addCustomMessageListener(NAMESPACE, _listener);
      context.start();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  return <CastContext.Provider value={providerValue}>{children}</CastContext.Provider>;
};

export const useCast = () => useContext(CastContext);

interface Context {
  castReady: boolean;
  context: any;
  provider: 'youtube' | 'vimeo';
  videoId: string;
  startSeconds: number;
}
