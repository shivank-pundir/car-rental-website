import React, { useState } from "react";
import { assets, dummyUserData, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const user = dummyUserData;
  const location = useLocation();
  const [image, setImage] = useState(null);

  const updateImage = () => {
    if (image) {
      user.image = URL.createObjectURL(image);
      setImage(null);
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-16 md:max-w-60 w-full border-r border-borderColor text-sm">

      {/* Profile Image */}
      <div className="group relative">
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />

          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="absolute inset-0 hidden rounded-full bg-black/30 group-hover:flex items-center justify-center">
            <img
              src={assets.edit_icon}
              alt="Edit"
              className="w-6 h-6"
            />
          </div>
        </label>
      </div>

      {/* Save Button */}
      {image && (
        <button
          onClick={updateImage}
          className="mt-3 flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-md cursor-pointer"
        >
          Save
          <img src={assets.check_icon} alt="Save" width={14} />
        </button>
      )}

      {/* User Name */}
      <p className="mt-4 text-base font-medium max-md:hidden">
        {user?.name}
      </p>

      {/* Sidebar Menu */}
      <div className="w-full mt-6">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-3 w-full py-3 pl-4 transition-all ${
              location.pathname === link.path
                ? "bg-primary/10 text-primary"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <img
              src={
                location.pathname === link.path
                  ? link.coloredIcon
                  : link.icon
              }
              alt={link.name}
              className="w-5 h-5"
            />

            <span className="max-md:hidden">{link.name}</span>

            {location.pathname === link.path && (
              <div className="absolute right-0 w-1.5 h-8 bg-primary rounded-l-full"></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;