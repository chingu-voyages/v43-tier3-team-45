
const PriorityDropdown = (props) => {

    let handlePriority = props.handlePriority

    const listener = (e) => {
        e.preventDefault()
       handlePriority(e.target.value)
    }

    return (
        <div className="relative w-full lg:max-w-sm">
            Priority:
            <select className="w-half  p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600" 
                onChange={(e) => listener(e)}
                >
                {/* <option>Priority:</option> */}
                <option> 1</option>
                <option> 2</option>
                <option> 3</option>
            </select>
        </div>
    );
}

export default PriorityDropdown