import { MouseEventHandler } from "react";

export const PrimaryButton: React.FC<{
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="
                  shadow
                  p-6
                  m-6
                  text-clay-200
                  font-bold
                  text-lg
                  rounded-md
                  bg-gradient-to-tr
                  from-secondary-400
                  to-secondary-600
                  transition
                  hover:text-white
                  hover:from-secondary-300
                  hover:to-secondary-400
                  hover:shadow-none
                "
  >
    {children}
  </button>
);

export const SecondaryButton: React.FC<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="
              bg-gradient-to-tr
              from-primary-200
              to-primary-100
              hover:from-primary-200
              hover:to-primary-300
              hover:font-bold
              transition
              text-mineral-600
              p-4
              rounded
              shadow"
  >
    {children}
  </button>
);
