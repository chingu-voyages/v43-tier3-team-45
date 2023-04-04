import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { addTitle, addDescription } from "../store/issueReducer"
import TypeDropdown from './TypeDropdown.jsx'
import PriorityDropdown from './PriorityDropdown.jsx'

// GET route /api/projects${projectId} associate with project
// POST route /api/issues/${issueId} post new issue

const Example = ({closeModal}) => {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  const dispatch = useDispatch()

  const handleTitle = (e) => {
      e.preventDefault()
      dispatch(addTitle(e.target.value))
  }

  const handleDescription = (e) => { 
      e.preventDefault()
      dispatch(addDescription(e.target.value))
  }
  
  const handleSave = (e) => {
      e.preventDefault()

      // make POST request and close modal eventually connect to Shawn's API file
      closeModal(false)
  }


  return (
    <div bg-white-200 opacity-80 fixed inset-o z-50>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Create Issue</h1>     
                </div>
                <div className="body"> 
                    <form>
                        <label>
                        Title:
                            <input type="text" name="name" onChange={handleTitle}/>
                        </label>
                        <label>
                        Description:
                            <input type="text" name="name" onChange={handleDescription}/>
                        </label>
                        <label>
                        Comments:
                            <input type="text" name="name" onChange={handleDescription}/>
                        </label>
                        <div>
                            <TypeDropdown />
                        </div>
                        <div>
                            <PriorityDropdown />
                        </div>
                    </form>
                    <p>Created by: {useSelector(state => state.user.email)} </p>
                </div>
                <div className="footer">
                    <button onClick={handleSave}> Save </button>
                    <button onClick={() => closeModal(false)}>Cancel</button> 
                 </div>
            </div>
        </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </div>
  )
}

export default Example
