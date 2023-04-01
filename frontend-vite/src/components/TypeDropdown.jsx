import { useDispatch } from 'react-redux';
import { addIssueType } from '../store/issueReducer';

const TypeDropdown = () => {
  const dispatch = useDispatch();

  const handleType = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(addIssueType(e.target.value));
  };

        return (
            <div className="relative w-full lg:max-w-sm">
            <select className="w-half  p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600" 
                onChange={handleType}
            >
                    <option>Type:</option>
                    <option>Type 1</option>
                    <option>Type 2</option>
                    <option>Type 3</option>
                </select>
            </div>
        );
    }

export default TypeDropdown