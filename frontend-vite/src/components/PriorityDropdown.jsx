

const PriorityDropdown = () => {
    return (
        <div className="relative w-full lg:max-w-sm">
            <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                <option>Priority:</option>
                <option>Type 1</option>
                <option>Type 2</option>
                <option>Type 3</option>
            </select>
        </div>
    );
}

export default PriorityDropdown