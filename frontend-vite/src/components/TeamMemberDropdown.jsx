import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { addMemberToSelectedList } from "../store/teamReducer";
import Avatar from "./Avatar";

const TeamMemberDropdown = () => {
  const dispatch = useDispatch();
  const filteredList = useSelector((state) => state.team.filteredList);

  const handleClick = (e, member) => {
    e.preventDefault();
    dispatch(addMemberToSelectedList(member));
  };

  return (
    <Popover className="relative mt-2">
      <Popover.Button>
        <span
          className="text-black py-1 px-2
                      text-sm bg-indigo-300
                      rounded-lg
                      transition-colors
                      duration-150
                      focus:shadow-outline
                      hover:bg-indigo-500"
        >
          Add member
        </span>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 w-60 mt-3 transform px-2 sm:px-0">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative grid gap-2 bg-white p-1 grid-cols-1">
              {filteredList &&
                filteredList.map((member, key) => (
                  <button
                    className="flex rounded-lg outline items-center"
                    onClick={(e) => handleClick(e, member)}
                    key={key}
                  >
                    <Avatar
                      src={member.avatarUrl}
                      alt={member.firstName}
                      size={12}
                    />
                    <p className="text-sky-400 ml-2 truncate">
                      {member.firstName} {member.lastName}
                    </p>
                  </button>
                ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default TeamMemberDropdown;
