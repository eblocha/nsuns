import { RhinoInference } from '@picovoice/rhino-web-core';
import { capitalize } from '../utils/string';
import {
  AppInference,
  ChangeMaxDirections,
  ChangeMaxInference,
  ChangeUserInference,
  ExitWorkoutInference,
  GoToInference,
  HowAreYouInference,
  Intents,
  JumpTypes,
  LiftTypes,
  LogRepsInference,
  NextSetInference,
  ResetRepsInference,
  SignificantOtherInference,
  StartWorkoutInference,
  StatusInference,
  TellJokeInference,
  UndoUpdateInference,
  UpdateWeightInference,
} from './types';

type InferenceCreator<T extends AppInference | null> = (
  inference: RhinoInference
) => T;

// Creators -------------------------------------------------------------------
const createNextSet: InferenceCreator<NextSetInference> = () => {
  return {
    intent: Intents.NEXT_SET,
    payload: {},
  };
};

const liftTypes: Set<string> = new Set(Object.values(LiftTypes));

const createLogReps = (inference: RhinoInference): LogRepsInference | null => {
  if (
    !inference.slots?.reps ||
    !inference.slots?.type ||
    !liftTypes.has(inference.slots.type)
  ) {
    return null;
  }

  const reps = parseInt(inference.slots.reps);

  if (isNaN(reps)) {
    return null;
  }

  return {
    intent: Intents.LOG_REPS,
    payload: {
      reps,
      type: inference.slots.type as LiftTypes,
    },
  };
};

const createUpdateWeights: InferenceCreator<UpdateWeightInference> = () => {
  return {
    intent: Intents.UPDATE_WEIGHTS,
    payload: {},
  };
};

const createUndoUpdate: InferenceCreator<UndoUpdateInference> = () => ({
  intent: Intents.UNDO_UPDATE,
  payload: {},
});

const createExitWorkout: InferenceCreator<ExitWorkoutInference> = () => ({
  intent: Intents.EXIT_WORKOUT,
  payload: {},
});

const createResetReps: InferenceCreator<ResetRepsInference> = () => ({
  intent: Intents.RESET_REPS,
  payload: {},
});

const createStatus: InferenceCreator<StatusInference> = () => ({
  intent: Intents.STATUS,
  payload: {},
});

const jumpTypes: Set<string> = new Set(Object.values(JumpTypes));

const createGoTo: InferenceCreator<GoToInference | null> = (inference) => {
  if (
    !inference.slots?.place ||
    !inference.slots?.type ||
    !jumpTypes.has(inference.slots.type)
  ) {
    return null;
  }

  const place = parseInt(inference.slots.place);

  if (isNaN(place)) {
    return null;
  }

  return {
    intent: Intents.GO_TO,
    payload: {
      place: place - 1,
      type: inference.slots.type as JumpTypes,
    },
  };
};

const createStartWorkout: InferenceCreator<StartWorkoutInference> = () => ({
  intent: Intents.START_WORKOUT,
  payload: {},
});

const directions: Set<string> = new Set(Object.values(ChangeMaxDirections));

const createChangeMax: InferenceCreator<ChangeMaxInference | null> = (
  inference
) => {
  if (
    !inference.slots?.direction ||
    !inference.slots?.type ||
    !inference.slots?.weight ||
    !directions.has(inference.slots.direction) ||
    !liftTypes.has(inference.slots.type)
  ) {
    return null;
  }

  const weight = parseInt(inference.slots.weight);

  if (isNaN(weight)) {
    return null;
  }

  return {
    intent: Intents.CHANGE_MAX,
    payload: {
      direction: inference.slots.direction as ChangeMaxDirections,
      type: inference.slots.type as LiftTypes,
      weight,
    },
  };
};

const createChangeUser: InferenceCreator<ChangeUserInference | null> = (
  inference
) => {
  if (!inference.slots?.user) {
    return null;
  }

  const user = parseInt(inference.slots.user);

  if (isNaN(user)) {
    return null;
  }

  return {
    intent: Intents.CHANGE_USER,
    payload: { user },
  };
};

const createHowAreYou: InferenceCreator<HowAreYouInference> = () => ({
  intent: Intents.HOW_ARE_YOU,
  payload: {},
});

const createTellJoke: InferenceCreator<TellJokeInference> = () => ({
  intent: Intents.TELL_JOKE,
  payload: {},
});

const createSO: InferenceCreator<SignificantOtherInference> = () => ({
  intent: Intents.SIGNIFICANT_OTHER,
  payload: {},
});

// Validator ------------------------------------------------------------------
export const validateInference = (
  inference: RhinoInference
): AppInference | null => {
  if (!inference.isUnderstood) return null;

  switch (inference.intent) {
    case Intents.NEXT_SET:
      return createNextSet(inference);
    case Intents.LOG_REPS:
      return createLogReps(inference);
    case Intents.UPDATE_WEIGHTS:
      return createUpdateWeights(inference);
    case Intents.UNDO_UPDATE:
      return createUndoUpdate(inference);
    case Intents.EXIT_WORKOUT:
      return createExitWorkout(inference);
    case Intents.RESET_REPS:
      return createResetReps(inference);
    case Intents.STATUS:
      return createStatus(inference);
    case Intents.GO_TO:
      return createGoTo(inference);
    case Intents.START_WORKOUT:
      return createStartWorkout(inference);
    case Intents.CHANGE_MAX:
      return createChangeMax(inference);
    case Intents.CHANGE_USER:
      return createChangeUser(inference);
    case Intents.HOW_ARE_YOU:
      return createHowAreYou(inference);
    case Intents.TELL_JOKE:
      return createTellJoke(inference);
    case Intents.SIGNIFICANT_OTHER:
      return createSO(inference);
  }

  return null;
};

// Report ---------------------------------------------------------------------
export const reportInference = (inference: AppInference | null): string => {
  if (!inference) return "I didn't understand";
  switch (inference.intent) {
    case Intents.NEXT_SET:
      return 'Next set';
    case Intents.LOG_REPS:
      return `Logging ${inference.payload.reps} reps for ${inference.payload.type}`;
    case Intents.UPDATE_WEIGHTS:
      return 'Updating weights';
    case Intents.UNDO_UPDATE:
      return 'Undoing update';
    case Intents.EXIT_WORKOUT:
      return 'Stopping workout';
    case Intents.RESET_REPS:
      return 'Resetting reps';
    case Intents.STATUS:
      return 'Toggling stats';
    case Intents.GO_TO:
      return `Going to ${inference.payload.type} ${inference.payload.place}`;
    case Intents.START_WORKOUT:
      return 'Starting workout';
    case Intents.CHANGE_MAX:
      return `${capitalize(inference.payload.direction)} ${
        inference.payload.type
      } by ${inference.payload.weight}`;
    case Intents.CHANGE_USER:
      return `Switching to user ${inference.payload.user}`;
    case Intents.HOW_ARE_YOU:
      return `I am trapped in here by you!`;
    case Intents.TELL_JOKE:
      return 'No';
    case Intents.SIGNIFICANT_OTHER:
      return 'No';
  }

  return "I didn't understand";
};
