import { RhinoInference } from '@picovoice/rhino-web-core';
import { useCallback } from 'react';
import useStore, { Store } from '../stores';
import { Intents, validateInference } from '../voiceControl';
import useProfile from './useProfile';
import useProgram from './useProgram';
import { useUpdateReps } from './useReps';
import { useUndoUpdate } from './useUndoUpdate';
import { useUpdate } from './useUpdate';

// Selectors
const selectAddMessage = (state: Store) => state.addMessage;
const selectNextSet = (state: Store) => state.nextSet;

const DEFAULT_TIMEOUT = 5000;

/**
 * Handle rhino inferences
 * @returns An inference handler callback to process inferences from Rhino
 */
export const useVoice = () => {
  const [profile] = useProfile();

  const { data: program } = useProgram(profile);

  const addMessage = useStore(selectAddMessage);
  const nextSet = useStore(selectNextSet);
  const { mutate: logReps } = useUpdateReps(profile);
  const updateWeights = useUpdate();
  const undoUpdate = useUndoUpdate();
  const { mutate: updateReps } = useUpdateReps(profile);

  const success = useCallback(
    (msg: string) => {
      addMessage({
        level: 'success',
        message: msg,
        timeout: DEFAULT_TIMEOUT,
      });
    },
    [addMessage]
  );

  return useCallback(
    (rhinoInference: RhinoInference) => {
      const inference = validateInference(rhinoInference);

      if (!inference) {
        addMessage({
          level: 'error',
          message: "I didn't understand",
          timeout: DEFAULT_TIMEOUT,
        });
        return;
      }

      switch (inference.intent) {
        case Intents.NEXT_SET:
          if (program) {
            nextSet(program);
            success('Next set');
          } else {
            addMessage({
              level: 'warning',
              message: 'Program not yet loaded',
              timeout: DEFAULT_TIMEOUT,
            });
          }
          break;
        case Intents.LOG_REPS:
          logReps(
            {
              reps: { [inference.payload.type]: inference.payload.reps },
            },
            {
              onSuccess: () => {
                success(
                  `Logging ${inference.payload.reps} reps for ${inference.payload.type}`
                );
              },
              onError: () => {
                addMessage({
                  level: 'error',
                  message: 'Failed to log reps',
                  timeout: DEFAULT_TIMEOUT,
                });
              },
            }
          );
          break;
        case Intents.UPDATE_WEIGHTS:
          updateWeights();
          success('Updating weights');
          break;
        case Intents.UNDO_UPDATE:
          undoUpdate();
          success('Undoing weight update');
          break;
        case Intents.RESET_REPS:
          updateReps(
            { replace: true, reps: {} },
            {
              onSuccess: () => success('Reset reps'),
              onError: () => {
                addMessage({
                  level: 'error',
                  message: 'Failed to reset reps',
                  timeout: DEFAULT_TIMEOUT,
                });
              },
            }
          );
          break;
        default:
          addMessage({
            level: 'warning',
            message: `Command "${inference.intent}" not programmed`,
            timeout: DEFAULT_TIMEOUT,
          });
          break;
      }
    },
    [
      addMessage,
      logReps,
      nextSet,
      program,
      success,
      undoUpdate,
      updateReps,
      updateWeights,
    ]
  );
};
