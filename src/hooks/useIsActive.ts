import { useCallback, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'

/** Return a boolean indicating the user is active */
const useIsActive = ({ timeout = 5000, debounce = 200 }) => {
  const [show, setShow] = useState(true)

  useIdleTimer({
    timeout,
    onIdle: useCallback(() => setShow(false), []),
    onActive: useCallback(() => setShow(true), []),
    onAction: useCallback(() => setShow(true), []),
    debounce,
  })

  return show
}

export default useIsActive
