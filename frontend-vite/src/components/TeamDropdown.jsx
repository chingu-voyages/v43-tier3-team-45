import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { setMembers, setTeam } from "../store/teamReducer";
import { resetProject } from "../store/projectReducer";
import { ChevronDown } from '@heroicons/react/24/solid'
const TeamDropdown = ({ teams }) => {
  const dispatch = useDispatch();
  const selectedTeam = useSelector((state) => state.team.currentTeam);

  const handleSelect = (team) => {
    dispatch(resetProject());
    dispatch(setTeam(team));
    dispatch(setMembers(team.members));
  };

  return (
    <div className="w-48">
      <Listbox value={selectedTeam} onChange={handleSelect}>
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncat">
            {selectedTeam ? selectedTeam.name : "Choose a Team"}
          </span>  
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-1/5 z-10 rounded-md bg-orange py-1 text-base shadow-lg ring-1 bg-yellow-300 ring-black ring-opacity-5 focus:outline-none sm:text-sm truncate">
            {teams.map((team, i) => (
              <Listbox.Option
                key={i}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? `bg-amber-100 text-amber-900` : `text-gray-900`
                  }`
                }
                value={team}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {team.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};

export default TeamDropdown;