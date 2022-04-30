import useStore, { Store } from '../stores';

const stateSelector = (state: Store) => state.units;
const setSelector = (state: Store) => state.setUnits;

/** Returns the current state and setter for the user's preferred units */
const useUnits = () => {
  const state = useStore(stateSelector);
  const setter = useStore(setSelector);
  return [state, setter] as const;
};

export default useUnits;
