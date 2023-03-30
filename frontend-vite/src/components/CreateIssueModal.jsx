import { useDispatch, useSelector } from 'react-redux'
// import { Modal, Button, Box, Typography } from '@mui/material';
import { addTitle, addDescription } from "../store/issueReducer"


const CreateIssueModal = ({closeModal}) => {
    const dispatch = useDispatch()

    const handleTitle = (e) => {
        e.preventDefault()
        dispatch(addTitle(e.target.value))
    }

    const handleDescription = (e) => {
        e.preventDefault()
        dispatch(addDescription(e.target.value))
    }
    


    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button onClick={() => closeModal(false)}>X</button>
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
                    </form>
                </div>
                <div className="footer">
                    <button> Save </button>    
                 </div>
            </div>
        </div>
    )
}

export default CreateIssueModal

