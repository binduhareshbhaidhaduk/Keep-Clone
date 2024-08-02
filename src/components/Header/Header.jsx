import { useState } from 'react';
import { CgMenuGridO } from 'react-icons/cg';
import {  CiSearch} from 'react-icons/ci';
import { FaRegBell } from 'react-icons/fa';
import { IoIosMenu, IoMdRefresh } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import {  MdDeleteOutline, MdLightbulbOutline, MdOutlineArchive, MdOutlineEdit, MdOutlineIndeterminateCheckBox } from 'react-icons/md';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <>
      <header className="header d-flex justify-content-between align-item-center">
        <div className='p-2 d-flex col-3'>
          <button className="menu-btn" onClick={toggleSidebar}>
          <IoIosMenu />
          </button>
          <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt="logo" className='ms-3'/>
          <div className="logo ms-3">Keep</div>
        </div>
        <div className=' col-6 search p-2'>
          <CiSearch />
          <input type="text" placeholder='search' className='ps-4' />
        </div>
        <div className='col-2 d-flex align-item-center justify-content-end'>
          <IoMdRefresh className='m-2'/>
          <MdOutlineIndeterminateCheckBox className='m-2'/>
          <IoSettingsOutline className='m-2' />

        </div>
        <div className='col-1 d-flex justify-content-end align-item-center'>
        <CgMenuGridO className='me-4'/>
          <div className='profile'><img src="https://lh3.googleusercontent.com/ogw/AF2bZyiFBXmo8eDX97HZTgNBmi0J_lVjt5-lZOKO0UQILAasSQ=s64-c-mo" alt="" /></div>
        </div>
      </header>

      {/* sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <ul className="sidebar-menu">
          <li className='d-flex p-3 '>
            <MdLightbulbOutline />
            <div className='p-1'>Notes</div>
          </li>
          <li className='d-flex p-3 '>
            <FaRegBell />
            <div className='p-1'>Reminder</div>
          </li>
          <li className='d-flex p-3 '>
            <MdOutlineEdit />
            <div className='p-1'>Edit</div>
          </li>
          <li className='d-flex p-3 '>
            <MdOutlineArchive />
            <div className='p-1'>Archive</div>
          </li >
          <li className='d-flex p-3 '>
            <MdDeleteOutline />
            <div className='p-1'>Bin</div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
