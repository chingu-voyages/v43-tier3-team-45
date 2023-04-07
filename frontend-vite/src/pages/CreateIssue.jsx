import { useState, Fragment } from "react"
import CreateIssueModal from '../components/CreateIssueModal'
import { Transition } from '@headlessui/react'

function CreateIssue() {
    const [isShowing, setIsShowing] = useState(false)

    const setShowing = (e) => {
        e.preventDefault
        // not sure why DOM refresh is still happening
        setIsShowing((isShowing) => !isShowing)
    }

    return (
        <div>
            {/* {openModal ? <CreateIssueModal setOpenModal={setOpenModal}/> :             
                <button onClick={() => {setOpenModal(true)}}> Open </button>} */}
            <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
                Create Issue
            </button>
            <Transition
                show={isShowing}
                enter="transition-opacity duration-125"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <CreateIssueModal setShowing={setShowing}/>
            </Transition>
        </div>
    )
}

export default CreateIssue

