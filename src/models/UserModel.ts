import axios from "axios";
import {User} from "@/interfaces/Interfaces"


const UserModel = {
    /**
     * Fetch list of users from randomuser api
     */
    getUsers: (params: Record<string, number>) : Promise<any> => {
        return axios.get('https://randomuser.me/api/?inc=gender,name,nat,email,location,phone,picture,id', {params})
            .then(response => response.data)
            .catch(error => {
                throw error;
            })
    }



}

export default UserModel;
