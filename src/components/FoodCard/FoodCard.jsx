import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
    const { _id, image, price, recipe, name } = item;
    const { user } = useContext(AuthContext);
    const [, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    console.log("location",location)



    const handleAddToCart = item => {
        console.log(item);
        

        if(user && user.email) {
            const orderItem = {menuItemId: _id, name, image, price, email: user.email }
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(orderItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch(); // refetch to update the number of item in the cart
                        console.log('insesrting');
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Item added to the cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }else{
            console.log('swal below');
            Swal.fire({
                title: 'Please Login to Order the Food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state: {from:location}});

                }
            })
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline border-0 border-b-4 border-yellow-600 text-yellow-600 bg-slate-100 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;