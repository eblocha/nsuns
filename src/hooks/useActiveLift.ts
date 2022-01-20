import useStore, { Store } from '../stores'

const stateSelector = (state: Store) => state.activeLift
const setSelector = (state: Store) => state.setActiveLift

const useActiveLift = () => {
  const state = useStore(stateSelector)
  const setter = useStore(setSelector)
  return [state, setter] as const
}

export default useActiveLift
