import { useDispatch, useSelector } from 'react-redux'
import { addPriority } from '../store/issueReducer'

const PriorityDropdown = () => {

    const dispatch = useDispatch()

    const handlePriority = (e) => {
        e.preventDefault()
        dispatch(addPriority(e.target.value))
    }

    return (
        <div className="relative w-full lg:max-w-sm">
            <select className="w-half  p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600" 
                onChange={handlePriority}
                >
                <option>Priority:</option>
                <option> 1</option>
                <option> 2</option>
                <option> 3</option>
            </select>
        </div>
    );
}

export default PriorityDropdown