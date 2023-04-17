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
    <Popover className="relative">
      <Popover.Button>
        <span>Add member</span>
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
        <Popover.Panel className="absolute z-10">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative grid gap-8 bg-white p-7 grid-cols-1">
              {filteredList &&
                filteredList.map((member, key) => (
                  <button
                    className="flex rounded-lg outline"
                    onClick={(e) => handleClick(e, member)}
                    key={key}
                  >
                    <Avatar
                      src={member.avatarUrl}
                      alt={member.firstName}
                      size={12}
                    />
                    <p className="text-sky-400">{member.firstName}</p>
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
