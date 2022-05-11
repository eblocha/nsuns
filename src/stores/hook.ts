import { nanoid } from 'nanoid';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Units } from '../api';
import { today } from '../utils/days';
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
      };
    },
    {
      name: 'nsuns',
    }
  )
);
