import CreateIssueModal from "../components/CreateIssueModal"
import { useState } from "react"

function CreateIssue() {
    const [ openModal, setOpenModal ] = useState(false)

    return (
        <div>

            <button 
                onClick={() => {
                setOpenModal(true)
                }}
            >Open</button>
            {openModal && <CreateIssueModal closeModal={setOpenModal}/>}
        </div>
    )
}

export default CreateIssue