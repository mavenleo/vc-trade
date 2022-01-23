import {
    UserId,
    UserLocation,
    UserName,
    UserPicture,
    Filter
} from "@/types/types";

export interface User{
    gender: string,
    phone: string,
    nat: string,
    name: UserName,
    picture: UserPicture,
    location: UserLocation,
    id: UserId,
}

export interface Data {
    users: Array<User>,
    filterOptions: Filter | null,
    selectedUser: User,
    loadingState: boolean,
    showScroller: boolean,
    loadedCount: number,
}
