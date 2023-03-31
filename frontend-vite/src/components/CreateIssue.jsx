import CreateIssueModal from "../components/CreateIssueModal"
import { useState } from "react"

function CreateIssue() {
    const [ openModal, setOpenModal ] = useState(false)

    return (
        <div>
            {openModal ? <CreateIssueModal closeModal={setOpenModal}/> :             
                <button onClick={() => {setOpenModal(true)}}> Open </button>}
        </div>
    )
}

export default CreateIssue