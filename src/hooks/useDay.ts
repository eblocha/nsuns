import useStore, { Store } from '../stores'

const stateSelector = (state: Store) => state.day
const setSelector = (state: Store) => state.setDay

const useDay = () => {
  const state = useStore(stateSelector)
  const setter = useStore(setSelector)
  return [state, setter] as const
}

export default useDay
