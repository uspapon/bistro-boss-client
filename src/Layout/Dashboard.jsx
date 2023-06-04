import { FaBook, FaCalendarAlt, FaHome, FaShoppingCart, FaUser, FaUtensils, FaWallet } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [cart] = useCart();
    // Todo: load data from the server to have dynamic isAdmin based on data
    // const isAdmin = true;
    const isAdmin = useAdmin();
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side bg-[#d1a054]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-[#d1a054] text-base-content">

                    {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/home" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/addItem" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}><FaCalendarAlt></FaCalendarAlt><FaUtensils></FaUtensils> Add an Item</NavLink></li>
                            
                            <li><NavLink to="/dashboard/manageItem" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}><FaWallet></FaWallet>Manage Items</NavLink></li>
                            <li><NavLink to="/dashboard/allusers" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}><FaUser></FaUser>All Users</NavLink></li>
                        </>
                            : <>
                                <li><NavLink to="/" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}><FaHome></FaHome> Home</NavLink></li>
                                <li><NavLink to="/menu" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}>Our Menu</NavLink></li>
                                <li><NavLink to="/order/salad" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}>Our Food</NavLink></li>

                            </>
                    }




                </ul>

            </div>
        </div>
    );
};

export default Dashboard;