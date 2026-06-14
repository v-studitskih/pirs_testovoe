import { useState } from 'react';
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#212529]">
      <div className="w-full px-4 mx-auto max-w-135 md:max-w-180 lg:max-w-240 xl:max-w-285 2xl:max-w-330">
        <div className="flex items-center justify-between py-2 h-14">
          
          <div className="flex items-center  md:gap-6 lg:gap-8">
            
            {/* Логотип */}
            <Link to="/" className="text-white sm:text-xl md:text-xl whitespace-nowrap">
              My Application
            </Link>

            {/* Десктопное меню */}
            <nav className="hidden md:flex gap-4 md:gap-5 lg:gap-6 text-sm md:text-base text-white/55">
              <NavLink to="/" className="hover:text-white transition-colors">
                Home
              </NavLink>
              <NavLink to="/swagger" className="hover:text-white transition-colors">
                Swagger
              </NavLink>
            </nav>
          </div>

          {/* Бургер-кнопка */}
          <button
            onClick={() => setVisible(!visible)}
            className="inline-flex flex-col justify-between w-12 h-9 sm:w-14 sm:h-10 p-[8px_10px] sm:p-[10px_14px] bg-transparent border border-white/10 rounded-[7px] md:hidden cursor-pointer focus:shadow-[0_0_0_4px_rgba(255,255,255,0.5)]"
          >
            <span className="block w-full h-0.5 rounded-full bg-white/55" />
            <span className="block w-full h-0.5 rounded-full bg-white/55" />
            <span className="block w-full h-0.5 rounded-full bg-white/55" />
          </button>
        </div>

        {/* Мобильное меню */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            visible ? "max-h-40" : "max-h-0"
          }`}
        >
          <nav className="pb-2 flex flex-col bg-[#212529]">
            <NavLink 
              onClick={() => setVisible(false)} 
              to="/" 
              className="py-2 text-white/55 hover:text-white"
            >
              Home
            </NavLink>
            <NavLink 
              onClick={() => setVisible(false)} 
              to="/swagger" 
              className="py-2 text-white/55 hover:text-white"
            >
              Swagger
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;