import React from "react";
import { Link } from 'react-router-dom'
import SidebarData from "./SidebarData";

export default function TeamProjects() {
  SidebarData.map((item, index) => {
    return (
      <li key={index} className={item.cName}>
        <Link to={item.path}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </li>
    );
  });

  return <div>TeamProjects</div>;
}
