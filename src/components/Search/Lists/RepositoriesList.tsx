import React, {FC} from "react"

import {List, Skeleton} from "antd"
import {StarOutlined, ForkOutlined} from "@ant-design/icons"

import {RepositoryType} from "../../../types"

type RepositoriesListProps = {
  list: RepositoryType[],
  loading: boolean,
}

const RepositoriesList: FC<RepositoriesListProps> = ({list, loading}) => (
  <div>
    {list.map((el) => <List.Item key={el.id}>
      <Skeleton title={false} loading={loading} active>
        <List.Item.Meta
          title={el.name}
        />
        <div><ForkOutlined/>{el.forks_count} </div>
        <div><StarOutlined/>{el.stargazers_count} </div>
      </Skeleton>
    </List.Item>)}
  </div>
)

export default RepositoriesList
