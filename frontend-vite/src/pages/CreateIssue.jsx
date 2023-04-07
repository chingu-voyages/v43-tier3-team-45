import { useState } from "react"
import CreateIssueModal from '../components/CreateIssueModal'
// import TestModal from '../components/TestModal.jsx'
import { Transition } from '@headlessui/react'

// make API call here to get issue info? kanban board shares issueId and this component makes a fetch?

function CreateIssue() {
    // const [ openModal, setOpenModal ] = useState(false)
    const [isShowing, setIsShowing] = useState(false)

    const setShowing = (e) => {
        e.preventDefault
        // not sure why DOM refresh is still happening
        setIsShowing((isShowing) => !isShowing)
    }

    return (
        <div>
            {/* {openModal ? <TestModal closeModal={setOpenModal}/> :             
                <button onClick={() => {setOpenModal(true)}}> Open </button>} */}
            <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
                Create Issue
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
                <CreateIssueModal setIsShowing={setShowing}/>
            </Transition>
        </div>
    )
}

export default CreateIssue

