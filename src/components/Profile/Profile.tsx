import React, {Dispatch, FC, SetStateAction} from "react"
import Search from "../Search/Search"

import {Image, Skeleton} from "antd"

import {convertDate} from "../../utils/convertDate"
import {UserType, RepositoryType, ListTypeEnum} from "../../types"

import "./Profile.scss"

type ProfileProps = {
  user: UserType | undefined
  repositories: RepositoryType[] | undefined
  getRepositories: (query: string, setLoading: Dispatch<SetStateAction<boolean>>) => void
  loading: boolean
}

const Profile: FC<ProfileProps> = ({user, loading, repositories, getRepositories}) => (
  <div className="block">

    <h2>GitHub Profile</h2>

    {!loading && user ?
      <>
        <div className="profile__info">
          <Image width={200} src={user.avatar_url}/>
          <div>
            <div className="profile__name">{user.name ? user.name : user.login}</div>
            <div className="profile__list">
              {!!user.email && <div className="list__item"><span>Email:</span> {user.email}</div>}
              {!!user.location && <div className="list__item"><span>Location:</span> {user.location}</div>}
              {!!user.created_at &&
                <div className="list__item"><span>Registration date:</span> {convertDate(user.created_at)}</div>}
              {!!user.followers && <div className="list__item"><span>Followers:</span> {user.followers}</div>}
              {!!user.following && <div className="list__item"><span>Following:</span> {user.following}</div>}
            </div>
          </div>
        </div>

        {!!user.bio &&
          <>
            <h3>Bio</h3>
            <div>{user.bio}</div>
          </>
        }

        <h2>Repositories</h2>
        <Search list={repositories} listType={ListTypeEnum.REPOSITORIES} onSearch={getRepositories}/>
      </>
      : <>
        <div className="profile__skeleton">
          <Skeleton.Image/>
          <Skeleton active={loading} title={false} paragraph={{rows: 5}}/>
        </div>
        <Skeleton active={loading} paragraph={{rows: 2}}/>
      </>}

  </div>
)

export default Profile
