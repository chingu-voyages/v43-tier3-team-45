import { useState } from "react"
import CreateIssueModal from '../components/CreateIssueModal'

// make API call here to get issue info? kanban board shares issueId and this component makes a fetch?

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