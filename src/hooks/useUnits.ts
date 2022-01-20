import useStore, { Store } from '../stores'

const stateSelector = (state: Store) => state.units
const setSelector = (state: Store) => state.setUnits

const useUnits = () => {
  const state = useStore(stateSelector)
  const setter = useStore(setSelector)
  return [state, setter] as const
}

export default useUnits
