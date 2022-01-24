import {MutationEnum} from "@/store";

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

export type User = {
    gender: string,
    phone: string,
    nat: string,
    name: UserName,
    picture: UserPicture,
    location: UserLocation,
    id: UserId,
}

export type State = {
    users: Array<User>,
    filterOptions: Filter,
    selectedUser: User,
}

// Mutation types
export type MutationTypes <S = State> = {
    [MutationEnum.SAVE_USERS](
        state: S,
        payload: Array<User>
    ):void;

    [MutationEnum.SAVE_SELECTED_USER](
        state: S,
        payload: User
    ):void;

    [MutationEnum.SAVE_FILTER_OPTIONS](
        state: S,
        payload: Filter
    ):void;
}

