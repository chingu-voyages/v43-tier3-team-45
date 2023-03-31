import CreateIssueModal from "../components/CreateIssueModal"
import { useState } from "react"
import Example from "../components/ModalExample"

function CreateIssue() {
    const [ openModal, setOpenModal ] = useState(false)

    return (
        <div>
            {openModal ? <Example closeModal={setOpenModal}/> :             
                <button onClick={() => {setOpenModal(true)}}> Open </button>}
        </div>
    )
}

export default CreateIssue