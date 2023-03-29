import issueReducer from "../store/issueReducer"
import { useDispatch, useSelector } from 'react-redux'
// import { Modal, Button, Box, Typography } from '@mui/material';


const CreateIssueModal = ({closeModal}) => {


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
                        Email:
                            <input type="text" name="name" />
                        </label>
                    </form>
                </div>
                <div className="footer">
                    <button >Save</button>    
                 </div>
            </div>
        </div>
    )
}

export default CreateIssueModal

