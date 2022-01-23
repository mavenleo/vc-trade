export type UserName = {
    last: string,
    first: string
}

export type UserPicture = {
    large: string,
    medium: string,
    thumbnail: string,
}

export type UserLocation = {
    street: Record<string, string>,
    coordinates: Record<string, string>,
    timezone: Record<string, string>,
    city: string,
    state: string,
    postcode: string,
    country: string,
}

export type UserId = {
    name: string,
    value: string,
}

export type Filter = {
    name: string,
    gender: string
}
