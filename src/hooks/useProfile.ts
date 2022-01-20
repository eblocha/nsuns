import useStore, { Store } from '../stores';

const stateSelector = (state: Store) => state.profile;
const setSelector = (state: Store) => state.setProfile;

const useProfile = () => {
  const state = useStore(stateSelector);
  const setter = useStore(setSelector);
  return [state, setter] as const;
};

export default useProfile;
