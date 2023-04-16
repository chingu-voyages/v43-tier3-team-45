import { useState, Fragment } from "react";
import CreateIssueForm from "../components/CreateIssueForm";
import { Transition } from "@headlessui/react";

function CreateIssue() {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div>
      <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
        New Issue
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
            <CreateIssueModal
              onClose={() => setIsShowing(false)}
            />
          ) : null}
        </div>
      </Transition>
    </div>
  );
}

export default CreateIssue;
