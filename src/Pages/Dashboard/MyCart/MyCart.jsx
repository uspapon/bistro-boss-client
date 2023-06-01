import { Helmet } from 'react-helmet-async';
import useCart from '../../../hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyCart = () => {
    const [cart, refetch] = useCart();
    const total = cart.reduce((sum, item) => item.price + sum, 0);
    console.log(cart);

    const handleDelet = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(`http://localhost:5000/carts/${item._id}`)
                
                // todo: delete operation
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    console.log("confirmed data", data)
                    console.log(item._id)
                    if(data.deletedCount>0){
                        console.log('inside')
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })
            }
        })

    }

    return (
        <div className='w-full'>
            <Helmet>
                <title>Bistro Boss | My Cart</title>
            </Helmet>
            <div className='uppercase flex justify-evenly items-center h-[60px] font-semibold'>
                <h3 className="text-3xl">Total Items: {cart?.length}</h3>
                <h3 className="text-3xl">Total Price: ${total}</h3>
                <button className="btn btn-warning btn-sm">Pay </button>
            </div>
            <div className='w-full'>
                <table className="table w-4/5 ms-16">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Food</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr
                                key={item._id}
                            >
                                <td>{index + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td className='text-end'>${item.price}</td>
                                <td>
                                    <button onClick={() => handleDelet(item)} className="btn btn-ghost text-white bg-red-600"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyCart;