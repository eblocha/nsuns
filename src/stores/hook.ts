import { nanoid } from 'nanoid';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Program, Units } from '../api';
import { today } from '../utils/days';
import { rolloverSet } from '../utils/program';
import { JumpTypes } from '../voiceControl';
import { Store } from './types';

export const useStore = create<Store>(
  devtools(
    (set, get) => {
      return {
        units: Units.LB,
        setUnits: (units) => set({ units }),
        showStats: false,
        toggleStats: () => {
          set((state) => {
            return {
              showStats: !state.showStats,
            };
          });
        },
        day: today(),
        setDay: (day) => set({ day }),
        activeSet: 0,
        setActiveSet: (index) => set({ activeSet: index }),
        activeLift: 0,
        setActiveLift: (index) => set({ activeLift: index }),
        profile: '',
        setProfile: (profile) => set({ profile }),
        messages: {},
        messageOrder: [],
        addMessage: (message) => {
          const id = nanoid();
          const { messages, messageOrder } = get();
          set({
            messages: { ...messages, [id]: { ...message, id } },
            messageOrder: [...messageOrder, id],
          });
        },
        removeMessage: (id) => {
          const { messages, messageOrder } = get();
          const newMessages = { ...messages };
          delete newMessages[id];
          set({
            messages: newMessages,
            messageOrder: messageOrder.filter((i) => i !== id),
          });
        },
        nextSet: (program: Program) => {
          const state = get();
          const [lift, set] = rolloverSet(
            program,
            state.day,
            state.activeLift,
            state.activeSet + 1
          );
          state.setActiveLift(lift);
          state.setActiveSet(set);
        },
        goTo: (program, type, index) => {
          const state = get();

          const newLift = type === JumpTypes.SET ? state.activeLift : index;
          const newSet = type === JumpTypes.SET ? index : 0;

          const [lift, set] = rolloverSet(program, state.day, newLift, newSet);
          state.setActiveLift(lift);
          state.setActiveSet(set);
        },
      };
    },
    {
      name: 'nsuns',
    }
  )
);
