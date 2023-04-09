import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

const TeamMemberDropdown = () => {
  const members = useSelector((state) => state.team.members);
  let selectedList = [];
  let filteredList = [];

  const handleClick = (member) => {
    selectedList.push(member);
    console.log({ selectedList });
  };

  return (
    <Popover className="relative">
      <Popover.Button>Add member</Popover.Button>
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
          {members.map((member) => (
            <button className="outline" onClick={(e) => handleClick(member)}>
              <img src={member.avatarUrl} alt={"avatar"} />
              <div>{member.lastName}</div>
            </button>
          ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default TeamMemberDropdown;
