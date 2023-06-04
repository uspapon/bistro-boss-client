import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_token= import.meta.env.VITE_Image_Upload_token;

const AddItem = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
        const formData = new FormData;
        formData.append("image", data.image[0]);
        
        fetch(image_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imageResponse => {
            console.log(imageResponse);
            if(imageResponse.success){
                const imgURL = imageResponse.data.display_url;
                const {name, price, category, recipe} = data;
                const newItem = {name, price: parseFloat(price), category, recipe, image: imgURL};
                
                console.log(newItem);

                axiosSecure.post('/menu', newItem)
                .then(data => {
                    console.log("after posting new menu item", data.data)
                    if(data.data.insertedId){
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Item has been added',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          
                    }
                })


            }
        })

        console.log("From data",data);
    }

    
    // console.log(errors);
    return (
        <div className="w-full px-10">
            <SectionTitle heading="Add an Item" subheading="Whats New"></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text-alt font-semibold">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Recipe Name" {...register("name", { required: true, maxLength: 120 })} className="input input-bordered w-full " />
                </div>
                <div className="flex mb-4">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Category*</span>

                        </label>
                        <select defaultValue="Pick a Category" {...register("category", { required: true })} className="select select-bordered">
                            <option disabled>Pick one</option>
                            <option>Pizza</option>
                            <option>Salad</option>
                            <option>Deshi</option>
                            <option>Soup</option>
                            <option>Dessert</option>
                            <option>Drinks</option>
                        </select>
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text-alt font-semibold">Price*</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full " />
                    </div>
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Racipe Details</span>
                    </label>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                </div>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Item Image</span>
                    </label>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                </div>
                <input type="submit" value="Add Item" className="btn btn-sm mt-4" />
            </form>
        </div>
    );
};

export default AddItem;