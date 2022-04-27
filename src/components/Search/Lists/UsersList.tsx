import React, {FC} from "react"

import {Avatar, List, Skeleton} from "antd"
import {BookOutlined} from "@ant-design/icons"

import {UserType} from "../../../types"

type UsersListProps = {
  list: UserType[]
  loading: boolean
  onListItemClick: (id: number) => void
}

const UsersList:FC<UsersListProps> = ({list, loading, onListItemClick}) => {
  return (
    <div className="users_list">
      {!!list?.length && list.map((el, index) => <List.Item onClick={() => onListItemClick(index)} key={el.id}>
        <Skeleton avatar title={false} loading={loading}>
          <List.Item.Meta
            avatar={<Avatar src={el.avatar_url}/>}
            title={el.name ? el.name : el.login}
          />
          <div><BookOutlined />{el.public_repos}</div>
        </Skeleton>
      </List.Item>)}
    </div>
  )
}

export default UsersList
