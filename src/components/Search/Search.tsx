import React, {FC, Dispatch, SetStateAction, useState} from "react"
import UsersList from "./Lists/UsersList"
import RepositoriesList from "./Lists/RepositoriesList"

import {Input} from "antd"
import {List} from "antd"

import {RepositoryType, UserType, ListTypeEnum} from "../../types"

import "./Search.scss"

let timer: ReturnType<typeof setTimeout>

type SearchProps = {
  onSearch: (value: string, setLoading: Dispatch<SetStateAction<boolean>>) => void
  onListItemClick?: (id: number) => void
  list: UserType[] | RepositoryType[] | undefined
  listType: "users" | "repositories"
}

const Search: FC<SearchProps> = ({list, listType, onSearch, onListItemClick}) => {

  const {Search} = Input

  const timeout = (func: () => void, time: number) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func()
    }, time)
  }

  const [loading, setLoading] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>("")

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    setSearchInput(searchValue)
    !loading && setLoading(true)
    timeout(() => {
      onSearch(searchValue, setLoading)
    }, 1000)
  }

  const getList = () => {
    switch (listType) {
      case ListTypeEnum.USERS:
        return !!onListItemClick && <UsersList list={list as UserType[]} loading={loading} onListItemClick={onListItemClick}/>
      case ListTypeEnum.REPOSITORIES:
        return <RepositoriesList list={list as RepositoryType[]} loading={loading}/>
      default:
        return null
    }
  }

  return (
    <div className="search">
      <Search value={searchInput} onChange={onSearchChange} placeholder="Search" size="large" loading={loading} enterButton/>
      <List
        className="search__list"
        itemLayout="horizontal"
        loading={loading}>
        {getList()}
      </List>
    </div>
  )
}

export default Search
