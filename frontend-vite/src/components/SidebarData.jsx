import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import "../App.css";
import { setTeam } from "../store/teamReducer";
import { useSelector } from "react-redux";

const SidebarData = [
    {
        title: "PROFILE",
        path: '/profile',
        icon: <IoIcons.IoIosPaper/>,
        cName: "nav-text"
    },
    {
        title: "TEST",
        path: '/profile',
        icon: <IoIcons.IoIosPaper />,
        cName: "nav-text"
    },
    {
        title: "TEST",
        path: '/profile',
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text"
    },
    {
        title: "TEST",
        path: '/profile',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: "nav-text"
    }
];

export default SidebarData