import useStore, { Store } from '../stores'

const stateSelector = (state: Store) => state.activeSet
const setSelector = (state: Store) => state.setActiveSet

const useActiveSet = () => {
  const state = useStore(stateSelector)
  const setter = useStore(setSelector)
  return [state, setter] as const
}

export default useActiveSet
