import { useState, Fragment } from "react";
import CreateIssueForm from "../components/CreateIssueForm";
import { Transition } from "@headlessui/react";
import { BsPlus } from "react-icons/bs";

function CreateIssue() {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div>
      <button
        className="flex items-center px-2 py-1 bg-gray-700 rounded-md shadow hover:bg-gray-600"
        onClick={() => setIsShowing((isShowing) => !isShowing)}
      >
        <BsPlus className="h-6 w-6 text-white" /> New Issue
        </button>
        <Transition
          show={isShowing}
          enter="transition-opacity duration-125"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
        <div>
          {isShowing ? (
            <CreateIssueForm onClose={() => setIsShowing(false)} />
          ) : null}
        </div>
      </Transition>
    </div>
  );
}

export default CreateIssue;
