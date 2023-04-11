

const DeleteModalForm = () => {
    
    return (
        <div className="flex justify-center">
            <div className="fixed z-10 inset-0 overflow-y-auto text-black">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <form className="w-full max-w-md">
                            <h1>Are you sure?</h1>
                            <br/>
                            <button>Yes</button>
                            <br/>
                            <button>Cancel</button>
                        </form >
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModalForm