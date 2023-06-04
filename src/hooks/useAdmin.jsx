import { useQueries, useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const {user} = useAuth();
    const [ axiosSecure ] = useAxiosSecure();

    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async() => {
            if(!user) return;
            const res = await axiosSecure.get(`user/admin/${user?.email}`)
            console.log("is admin res", res);
            return res.data.admin;
        }
        
    })
    return [isAdmin, isAdminLoading];
    

}

export default useAdmin;