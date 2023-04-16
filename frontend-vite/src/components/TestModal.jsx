import { Transition } from '@headlessui/react'
import { useState } from "react"


function TestModal({ isShowing }) {
  // const [isShowing, setIsShowing] = useState(false)



  return (
    /* The `show` prop controls all nested `Transition.Child` components. */
    <Transition show={true}>
      {/* Background overlay */}
      <Transition.Child
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
       Hello
      </Transition.Child>

      {/* Sliding sidebar */}
      <Transition.Child
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
      Bye
      </Transition.Child>
    </Transition>
  )
}

export default TestModal