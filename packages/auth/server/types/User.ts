import { Paginated } from "@corejam/base/dist/typings/Utils";
import { User } from "../Models/User";

export type UserList = Paginated & {
    totalItems: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    items?: User[] | [];
  };