
const PriorityDropdown = (props) => {

    let handlePriority = props.handlePriority

    const listener = (e) => {
        e.preventDefault()
       handlePriority(e.target.value)
    }

    return (
            <select 
                className="w-half text-sm font-bold bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                onChange={(e) => listener(e)}
                >
                <option> LOW</option>
                <option> MODERATE</option>
                <option> HIGH</option>
                <option> CRITICAL</option>
            </select>
    );
}

export default PriorityDropdown