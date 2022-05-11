import { Units } from '../api';

export type Message = {
  message: string;
  level: 'error' | 'warning' | 'info' | 'success';
  /** timeout in ms, 0 for infinite */
  timeout: number;
};

export type PostedMessage = Message & {
  id: string;
};

export type Store = {
  /** The user's preferred weight units */
  units: Units;
  setUnits: (units: Units) => void;
  /** Whether to show weight/rep history */
  showStats: boolean;
  toggleStats: () => void;
  /** The current workout day */
  day: number;
  setDay: (day: number) => void;
  /** The index of the active set in the lifts for today */
  activeSet: number;
  setActiveSet: (index: number) => void;
  /** The index of the active lift for the day */
  activeLift: number;
  setActiveLift: (index: number) => void;
  /** User id */
  profile: string;
  setProfile: (profile: string) => void;
  messages: Record<string, PostedMessage>;
  messageOrder: string[];
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
};
