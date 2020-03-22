import React from 'react';
import { CreationButtons } from './creation-buttons';

export function Header() {
  return (
    <div className="m-5 p-4 bg-white">
      <ul className="nav nav-pills justify-content-between">
        <li className="nav-item">
          <a
            className="nav-link h5 mb-0"
            href="https://github.com/latobibor/membership-mgmt"
            target="_blank"
            rel="noopener noreferrer"
          >
            András Dániel Tóth
          </a>
        </li>
        <li className="nav-item">
          <CreationButtons />
        </li>
      </ul>
    </div>
  );
}
