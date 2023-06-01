import { FaCalendarAlt, FaHome, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Dashboard = () => {
    const [cart] = useCart();
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side bg-[#d1a054]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-[#d1a054] text-base-content">
                    
                    <li><NavLink to="/dashboard/home" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}><FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to="/dashboard/reservations" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}><FaCalendarAlt></FaCalendarAlt>Calender</NavLink></li>
                    <li><NavLink to="/dashboard/mycart" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}><FaShoppingCart>
                        </FaShoppingCart>My Cart
                        <span className="badge badge-secondary">+{cart?.length || 0}</span>
                    </NavLink></li>
                    <li><NavLink to="/dashboard/history" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}><FaWallet></FaWallet>Payment History</NavLink></li>
                    <div className="divider"></div>
                    <li><NavLink to="/" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}><FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to="/menu" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}>Our Menu</NavLink></li>
                    <li><NavLink to="/order/salad" className={({ isActive }) => (isActive ? 'text-[#fff]' : 'default')}>Our Food</NavLink></li>
                                        
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;