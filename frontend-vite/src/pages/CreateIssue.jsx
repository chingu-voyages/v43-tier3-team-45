// import CreateIssueModal from "../components/CreateIssueModal"
import { useState } from "react"
// import Example from "../components/ModalExample"
import ModalExample2 from '../components/ModalExample2.jsx'

function CreateIssue() {
    const [ openModal, setOpenModal ] = useState(false)

    return (
        <div>
            {openModal ? <ModalExample2 closeModal={setOpenModal}/> :             
                <button onClick={() => {setOpenModal(true)}}> Open </button>}
        </div>
    )

}

export default CreateIssue