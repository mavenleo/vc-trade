interface UserName {
    last: string,
    first: string
}

interface UserPicture {
    large: string,
    medium: string,
    thumbnail: string,
}

interface UserLocation {
    street: Record<string, string>,
    coordinates: Record<string, string>,
    timezone: Record<string, string>,
    city: string,
    state: string,
    postcode: string,
    country: string,
}

interface UserId {
    name: string,
    value: string,
}

export interface User{
    gender: string,
    phone: string,
    nat: string,
    name: UserName,
    picture: UserPicture,
    location: UserLocation,
    id: UserId,
}

export interface Filter{
    name: string,
    gender: string
}

export interface Data {
    users: Array<User>,
    filterOptions: Filter,
    selectedUser: User,
    loadingState: boolean,
    showScroller: boolean,
    loadedCount: number,
}
