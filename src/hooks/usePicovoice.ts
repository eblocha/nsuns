/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * This is a modified version of the official picovoice hook, fixing a horrible bug
 */
import { useState, useEffect } from 'react';

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

type EngineControlType = 'ppn' | 'rhn';

export function usePicovoice(
  picovoiceWorkerFactory: PicovoiceWorkerFactory | null,
  picovoiceHookArgs: PicovoiceHookArgs | null,
  keywordCallback: (keywordLabel: string) => void,
  inferenceCallback: (inference: RhinoInference) => void
): {
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
} {
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
  // const porcupineCallback = useRef(keywordCallback);
  // const rhinoCallback = useRef(inferenceCallback);

  const start = (): boolean => {
    if (webVoiceProcessor !== null) {
      webVoiceProcessor.start().then(() => {
        setIsListening(true);
        return true;
      });
    }
    return false;
  };

  const pause = (): boolean => {
    if (webVoiceProcessor !== null) {
      webVoiceProcessor.pause();
      setIsListening(false);
      return true;
    }
    return false;
  };

  const stop = (): boolean => {
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
  };

  /** Refresh the keyword and inference callbacks
   * when they change (avoid stale closure) */
  useEffect(() => {
    if (picovoiceWorker !== null) {
      picovoiceWorker.onmessage = (
        message: MessageEvent<PicovoiceWorkerResponse>
      ): void => {
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
    if (
      picovoiceWorkerFactory === null ||
      picovoiceWorkerFactory === undefined
    ) {
      return (): void => {
        /* NOOP */
      };
    }

    if (picovoiceHookArgs === null || picovoiceHookArgs === undefined) {
      return (): void => {
        /* NOOP */
      };
    }

    async function startPicovoice(): Promise<{
      webVp: WebVoiceProcessor;
      pvWorker: PicovoiceWorker;
    }> {
      const { start: startWebVp = true } = picovoiceHookArgs!;

      // Argument checking; the engines will also do checking but we can get
      // clearer error messages from the hook
      if (picovoiceHookArgs!.porcupineKeyword === undefined) {
        throw Error('porcupineKeyword is missing');
      }
      if (picovoiceHookArgs!.rhinoContext === undefined) {
        throw Error('rhinoContext is missing');
      }

      const pvWorker: PicovoiceWorker = await picovoiceWorkerFactory!.create({
        ...picovoiceHookArgs!,
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
  }, [
    picovoiceWorkerFactory,
    // https://github.com/facebook/react/issues/14476#issuecomment-471199055
    // ".... we know our data structure is relatively shallow, doesn't have cycles,
    // and is easily serializable ... doesn't have functions or weird objects like Dates.
    // ... it's acceptable to pass [JSON.stringify(variables)] as a dependency."
    JSON.stringify(picovoiceHookArgs),
  ]);

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
