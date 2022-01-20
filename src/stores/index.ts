import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Day, Program, Units } from '../api';
import { getBestDay, today } from '../utils/days';
import { currentDay, currentLift } from '../utils/program';

export type GoToInput = {
  type: string;
  place: string;
};

export type Store = {
  units: Units;
  setUnits: (units: Units) => void;
  showStats: boolean;
  toggleStats: () => void;
  day: number;
  setDay: (day: number) => void;
  activeSet: number;
  setActiveSet: (index: number) => void;
  activeLift: number;
  setActiveLift: (index: number) => void;
  profile: string;
  setProfile: (profile: string) => void;
  // Voice intents ------------------------------------------------------------
  nextSet: (program: Program) => void;
  goTo: (program: Program, payload: GoToInput) => void;
  startWorkout: (program: Program) => void;
};

const useStore = create<Store>(
  devtools((set, get) => {
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
      // Voice intents ------------------------------------------------------------
      nextSet: (program) => {
        const state = get();
        const nSets =
          currentLift(program, state.day, state.activeLift)?.sets?.length || 0;
        const nLifts = currentDay(program, state.day)?.length || 0;
        if (state.activeSet + 1 >= nSets) {
          if (state.activeLift + 1 >= nLifts) {
            // done for today
          } else {
            // Go to next lift and reset set count
            state.setActiveSet(0);
            state.setActiveLift(state.activeLift + 1);
          }
        } else {
          // Not done with this lift yet
          state.setActiveSet(state.activeSet + 1);
        }
      },
      goTo: (program, payload) => {
        const state = get();
        const place = parseInt(payload.place[0] || '1');
        const type = payload.type;
        if (type === 'set') {
          const nSets =
            currentLift(program, state.day, state.activeLift)?.sets?.length ||
            0;
          if (place <= nSets) {
            state.setActiveSet(place - 1);
          }
        } else {
          const nLifts = currentDay(program, state.day)?.length || 0;
          if (place <= nLifts) {
            state.setActiveLift(place - 1);
            state.setActiveSet(0);
          }
        }
      },
      startWorkout: (program) => {
        const state = get();
        state.setDay(getBestDay(Object.keys(program) as Day[]));
        state.setActiveSet(0);
        state.setActiveLift(0);
      },
    };
  })
);

export default useStore;
