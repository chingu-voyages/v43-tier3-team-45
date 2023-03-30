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
    
    const handleSave = (e) => {
        e.preventDefault()
        // make POST request and close modal
        closeModal(false)
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
                    <p>Created by: {useSelector(state => state.user.email)} </p>
                </div>
                <div className="footer">
                    <button onClick={handleSave}> Save </button>    
                 </div>
            </div>
        </div>
    )
}

export default CreateIssueModal

