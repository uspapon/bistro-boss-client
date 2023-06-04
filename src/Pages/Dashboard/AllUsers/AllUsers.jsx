import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })
    // const { data: users = [], refetch } = useQuery(['users'], async () => {
    //     const res = await fetch('http://localhost:5000/users')
    //     return res.json()
    // })

    const handleManageRole = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} has been made admin`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
        
    }

    const handleDelet = (user) => {

    }
    return (
        <div className='w-full'>
            <Helmet>
                <title>Bistro Boss | All Users</title>
            </Helmet>
            <h3 className="text-3xl font-semibold my-4">Total Users: {users.length}</h3>
            <div className="overflow-x-auto w-full">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr  key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role === "admin" ? "admin" : <FaUserShield></FaUserShield>}</td>
                                <td>
                                <button onClick={() => handleManageRole(user)} className="btn btn-ghost text-white bg-orange-600 me-4"><FaUserShield></FaUserShield></button>
                                <button onClick={() => handleDelet(user)} className="btn btn-ghost text-white bg-red-600"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                            </tr>)
                        }
                        
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;