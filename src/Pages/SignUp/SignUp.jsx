import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";


const SignUp = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { user, createUser, updateUserProfile, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const newUser = result.user;
                console.log(newUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email }
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(result => result.json())
                            .then(data => {
                                if (data.insertedId) {
                                    console.log("user info has been stored to the DB")
                                    reset()
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User has been Created Successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })

                                    navigate('/login');

                                    // logOut()
                                    //     .then(() => {
                                    //         navigate('/login');
                                    //     })
                                    //     .catch(error => console.log(error))
                                }
                            })



                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }

    console.log(watch("example")); // watch input value by passing the name of it
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Signup now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="photo url" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>

                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    MaxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/
                                })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className="text-red-600">Password field is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 character long.</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-600">Password must be less than 20 character long.</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have one upper case one lower case one number and one special character.</span>}
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />

                            </div>
                        </form>
                        <p className="text-center"><small>Already have an account? Please <Link to="/login">Login</Link></small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;