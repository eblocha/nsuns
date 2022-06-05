/**
 * This is a modified version of the official picovoice hook
 */
import { useState, useEffect, useCallback } from 'react';

import { WebVoiceProcessor } from '@picovoice/web-voice-processor';

import {
  PicovoiceWorker,
  PicovoiceWorkerFactory,
  PicovoiceWorkerResponse,
} from '@picovoice/picovoice-web-core';

import { PorcupineKeyword } from '@picovoice/porcupine-web-core';

import { RhinoContext, RhinoInference } from '@picovoice/rhino-web-core';

export type PicovoiceHookArgs = {
  accessKey: string;
  porcupineKeyword: PorcupineKeyword;
  rhinoContext: RhinoContext;
  requireEndpoint?: boolean;
  start?: boolean;
};

export type PicovoiceReturnValue = {
  contextInfo: string | null;
  isLoaded: boolean;
  isListening: boolean;
  isError: boolean | null;
  errorMessage: string | null;
  engine: EngineControlType;
  webVoiceProcessor: WebVoiceProcessor | null;
  start: () => void;
  pause: () => void;
  stop: () => void;
};

type EngineControlType = 'ppn' | 'rhn';

export function usePicovoice(
  picovoiceWorkerFactory: PicovoiceWorkerFactory,
  picovoiceHookArgs: PicovoiceHookArgs,
  keywordCallback: (keywordLabel: string) => void,
  inferenceCallback: (inference: RhinoInference) => void
): PicovoiceReturnValue {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [contextInfo, setContextInfo] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean | null>(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [engine, setEngine] = useState<EngineControlType>('ppn');
  const [picovoiceWorker, setPicovoiceWorker] =
    useState<PicovoiceWorker | null>(null);
  const [webVoiceProcessor, setWebVoiceProcessor] =
    useState<WebVoiceProcessor | null>(null);

  const start = useCallback(() => {
    if (webVoiceProcessor !== null) {
      webVoiceProcessor.start().then(() => {
        setIsListening(true);
        return true;
      });
    }
    return false;
  }, [webVoiceProcessor]);

  const pause = useCallback(() => {
    if (webVoiceProcessor !== null) {
      webVoiceProcessor.pause();
      setIsListening(false);
      return true;
    }
    return false;
  }, [webVoiceProcessor]);

  const stop = useCallback(() => {
    if (webVoiceProcessor !== null) {
      webVoiceProcessor.stop().then(() => {
        setIsListening(false);
        setEngine('ppn');
        if (picovoiceWorker !== null) {
          picovoiceWorker.postMessage({ command: 'reset' });
        }
        return true;
      });
    }
    return false;
  }, [picovoiceWorker, webVoiceProcessor]);

  /** Refresh the keyword and inference callbacks
   * when they change (avoid stale closure) */
  useEffect(() => {
    if (picovoiceWorker !== null) {
      picovoiceWorker.onmessage = (
        message: MessageEvent<PicovoiceWorkerResponse>
      ) => {
        switch (message.data.command) {
          case 'ppn-keyword':
            keywordCallback(message.data.keywordLabel);
            setEngine('rhn');
            break;
          case 'rhn-inference':
            inferenceCallback(message.data.inference);
            setEngine('ppn');
            break;
          case 'rhn-info':
            setContextInfo(message.data.info);
            break;
          default:
            break;
        }
      };
    }
  }, [inferenceCallback, keywordCallback, picovoiceWorker]);

  useEffect(() => {
    async function startPicovoice(): Promise<{
      webVp: WebVoiceProcessor;
      pvWorker: PicovoiceWorker;
    }> {
      const { start: startWebVp = true } = picovoiceHookArgs;

      const pvWorker: PicovoiceWorker = await picovoiceWorkerFactory.create({
        ...picovoiceHookArgs,
        start: true,
      });

      pvWorker.postMessage({ command: 'info' });

      try {
        const webVp = await WebVoiceProcessor.init({
          engines: [pvWorker],
          start: startWebVp,
        });

        return { webVp, pvWorker };
      } catch (error) {
        pvWorker.postMessage({ command: 'release' });
        throw error;
      }
    }

    const startPicovoicePromise = startPicovoice();

    startPicovoicePromise
      .then(({ webVp, pvWorker }) => {
        setIsLoaded(true);
        setIsListening(webVp.isRecording);
        setWebVoiceProcessor(webVp);
        setPicovoiceWorker(pvWorker);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.toString());
      });

    return (): void => {
      startPicovoicePromise
        .then(({ webVp, pvWorker }) => {
          if (webVp !== undefined && webVp !== null) {
            webVp.release();
          }
          if (pvWorker !== undefined && pvWorker !== undefined) {
            pvWorker.postMessage({ command: 'release' });
            pvWorker.terminate();
          }
        })
        .catch(() => {
          // do nothing
        });
    };
  }, [picovoiceHookArgs, picovoiceWorkerFactory]);

  return {
    contextInfo,
    isLoaded,
    isListening,
    isError,
    errorMessage,
    engine,
    webVoiceProcessor,
    start,
    pause,
    stop,
  };
}
