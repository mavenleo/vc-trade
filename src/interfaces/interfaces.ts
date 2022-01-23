import {
    User,
    Filter
} from "@/types/types";

export interface Data {
    users: Array<User>,
    filterOptions: Filter | null,
    selectedUser: User,
    loadingState: boolean,
    showScroller: boolean,
    loadedCount: number,
}
