import { FC } from 'react';

interface NavbarItemProps {
  label: string
}

const NavbarItem: FC<NavbarItemProps> = ({
  label
}) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 hover:scale-110 transition">
        <span className="link link-underline link-underline-black">{label}</span>
    </div>
  )
}

export default NavbarItem