import { Transition } from '@headlessui/react'
import { useState } from 'react'
import CreateIssueModal from './CreateIssueModal'

function TestModal() {
  const [isShowing, setIsShowing] = useState(false)

  return (
    <>
      <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
        Toggle
      </button>
      <Transition
        show={isShowing}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <CreateIssueModal />
      </Transition>
    </>
  )
}

export default TestModal