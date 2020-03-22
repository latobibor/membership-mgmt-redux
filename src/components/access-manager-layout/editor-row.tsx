import React, { FunctionComponent } from 'react';

interface RowProps {
  darkTheme?: boolean;
}

export const EditorRow: FunctionComponent<RowProps> = ({ darkTheme, children }) => {
  const theme = darkTheme ? 'bg-secondary text-white' : 'bg-white';

  return <div className={`row mx-0 border-top ${theme}`}>{children}</div>;
};
