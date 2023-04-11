import React, { Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { addMemberToSelectedList } from "../store/teamReducer";

const TeamMemberDropdown = () => {
  const dispatch = useDispatch();
  const selectedList = useSelector((state) => state.team.selectedList);
  const filteredList = useSelector((state) => state.team.filteredList);

  const handleClick = (member) => {
    dispatch(addMemberToSelectedList(member.id));
    console.log({ selectedList });
    console.log({ filteredList });
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
          {filteredList &&
            filteredList.map((member) => (
              <button className="outline" onClick={(e) => handleClick(member)}>
                <img src={member.avatarUrl} alt={"avatar"} />
                <div>{member.firstName}</div>
              </button>
            ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default TeamMemberDropdown;
