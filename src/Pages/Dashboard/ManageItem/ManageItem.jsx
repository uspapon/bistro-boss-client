import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageItem = () => {
    const [menu, , refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();

    const handleDelet = (item) => {
        Swal.fire({
            title: 'Are you sure, you want to delete it?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`menu/${item._id}`)
                .then(res => {
                    if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Item has been deleted.',
                            'success'
                          )
                    }
                    
                    console.log("deleted response",res.data);
                })
            
            }
          })
    }


    return (
        <div className="w-full px-10">
            <SectionTitle heading="Manage all Item" subheading="Hurry Up"></SectionTitle>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> #  </th>
                            <th>Item</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, index) => <tr key={index} >
                                <td>{ index + 1 }</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                   {item.category}
                                </td>
                                <td className="text-right">{item.price}</td>
                                <td>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </td>
                                <td>
                                <button onClick={() => handleDelet(item)} className="btn btn-ghost text-white bg-red-600"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                            </tr>
                            )}
                        
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ManageItem;