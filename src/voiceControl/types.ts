// Intents --------------------------------------------------------------------
export enum Intents {
  NEXT_SET = 'nextSet',
  LOG_REPS = 'logReps',
  UPDATE_WEIGHTS = 'updateWeights',
  UNDO_UPDATE = 'undoUpdate',
  EXIT_WORKOUT = 'exitWorkout',
  RESET_REPS = 'resetReps',
  STATUS = 'status',
  GO_TO = 'goTo',
  START_WORKOUT = 'startWorkout',
  CHANGE_MAX = 'changeMax',
  CHANGE_USER = 'changeUser',
  HOW_ARE_YOU = 'howAreYou',
  TELL_JOKE = 'tellJoke',
  SIGNIFICANT_OTHER = 'significantOther',
}

// Slots ----------------------------------------------------------------------
type empty = Record<string, never>;

export enum LiftTypes {
  BENCH = 'bench',
  PRESS = 'press',
  SQUAT = 'squat',
  DEADLIFT = 'deadlift',
  ROW = 'row',
}

export type LogRepsSlots = {
  /** The lift type to log reps for */
  type: LiftTypes;
  /** The number of reps to log */
  reps: number;
};

export enum JumpTypes {
  SET = 'set',
  EXERCISE = 'exercise',
  LIFT = 'lift',
}

export type GoToSlots = {
  /** The type of jump */
  type: JumpTypes;
  /** The position to jump to */
  place: number;
};

export enum ChangeMaxDirections {
  REDUCE = 'reduce',
  INCREASE = 'increase',
  DECREASE = 'decrease',
}

export type ChangeMaxSlots = {
  direction: ChangeMaxDirections;
  type: LiftTypes;
  weight: number;
};

export type ChangeUserSlots = {
  user: number;
};

// Inferences -----------------------------------------------------------------
type Inference<T extends Intents, S extends object = empty> = {
  intent: T;
  payload: S;
};

export type NextSetInference = Inference<Intents.NEXT_SET>;

export type LogRepsInference = Inference<Intents.LOG_REPS, LogRepsSlots>;

export type UpdateWeightInference = Inference<Intents.UPDATE_WEIGHTS>;

export type UndoUpdateInference = Inference<Intents.UNDO_UPDATE>;

export type ExitWorkoutInference = Inference<Intents.EXIT_WORKOUT>;

export type ResetRepsInference = Inference<Intents.RESET_REPS>;

export type StatusInference = Inference<Intents.STATUS>;

export type GoToInference = Inference<Intents.GO_TO, GoToSlots>;

export type StartWorkoutInference = Inference<Intents.START_WORKOUT>;

export type ChangeMaxInference = Inference<Intents.CHANGE_MAX, ChangeMaxSlots>;

export type ChangeUserInference = Inference<
  Intents.CHANGE_USER,
  ChangeUserSlots
>;

export type HowAreYouInference = Inference<Intents.HOW_ARE_YOU>;
export type TellJokeInference = Inference<Intents.TELL_JOKE>;
export type SignificantOtherInference = Inference<Intents.SIGNIFICANT_OTHER>;

export type AppInference =
  | NextSetInference
  | LogRepsInference
  | UpdateWeightInference
  | UndoUpdateInference
  | ExitWorkoutInference
  | ResetRepsInference
  | StatusInference
  | GoToInference
  | StartWorkoutInference
  | ChangeMaxInference
  | ChangeUserInference
  | HowAreYouInference
  | TellJokeInference
  | SignificantOtherInference;
