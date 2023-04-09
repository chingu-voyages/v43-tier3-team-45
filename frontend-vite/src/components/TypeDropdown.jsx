
const TypeDropdown = (props) => {

    let handleType = props.handleType

        const listener = (e) => {
            e.preventDefault();
            handleType(e.target.value)
        };

        return (
            <div className="relative w-full lg:max-w-sm">
            <select className="w-half  p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600" 
                onChange={listener}
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