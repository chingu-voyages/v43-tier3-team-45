import { useDispatch, useSelector } from 'react-redux'
import { addTitle, addDescription } from "../store/issueReducer"
import TypeDropdown from './TypeDropdown.jsx'
import PriorityDropdown from './PriorityDropdown.jsx'


const ModalExample2 = ({closeModal}) => {

    const dispatch = useDispatch()
  
    const handleTitle = (e) => {
        e.preventDefault()
        dispatch(addTitle(e.target.value))
    }
  
    const handleDescription = (e) => { 
        e.preventDefault()
        dispatch(addDescription(e.target.value))
    }

    const handleComment = (e) => { 
        e.preventDefault()
        dispatch(addDescription(e.target.value))
    }
    
    const handleSave = (e) => {
        e.preventDefault()
  
        // make POST request and close modal eventually connect to Shawn's API file
        closeModal(false)
    }
  

  return (
    <div class="modal">
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden " >
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
            Create Issue
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label>
              <span className="text-gray-700">{useSelector(state => state.user.email)}</span>
              <input
                type="text"
                name="name"
                className="

            w-full
            block px-16 py-2 mt-2
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                placeholder="Title"
                onChange={handleTitle}
              />
            </label>
          </div>
          <div>
                <TypeDropdown />
            </div>
            <div>
                <PriorityDropdown />
            </div>
          <div className="mb-2">
            <label>
              <span class="text-gray-700">Description</span>
              <textarea
                name="message"
                className="
            block
            w-full
            mt-2 px-16 py-8
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                rows="5"
                onChange={handleDescription}
              ></textarea>
            </label>
          </div>

          <div className="mb-2">
            <label>
              <span class="text-gray-700">Comment</span>
              <textarea
                name="message"
                className="
            block
            w-full
            mt-2 px-16 py-8
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                rows="5"
                onChange={handleComment}
              ></textarea>
            </label>
          </div>

          <div class="mb-6">
            <button
              type="submit"
              className="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
          onClick={handleSave}
            >
              Save
            </button>
          </div>
          <div class="mb-6">
            <button
              type="submit"
              className="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
          onClick={() => closeModal(false)}
            >
              Cancel
            </button>
          </div>

          <div></div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ModalExample2;