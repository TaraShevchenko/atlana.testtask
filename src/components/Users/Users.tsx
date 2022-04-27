import React, {Dispatch, FC, SetStateAction} from "react"
import Search from "../Search/Search"

import {ListTypeEnum, UserType} from "../../types"

type UsersProps = {
  list: UserType[] | undefined
  getUsers: (query: string, setLoading: Dispatch<SetStateAction<boolean>>) => void
  getProfile: (id: number) => void
}

const Users:FC<UsersProps> = ({list, getUsers, getProfile}) => {
  return (
    <div className="block">
      <h2>GitHub Users</h2>
      <Search list={list} listType={ListTypeEnum.USERS} onSearch={getUsers} onListItemClick={getProfile}/>
    </div>
  )
}

export default Users
