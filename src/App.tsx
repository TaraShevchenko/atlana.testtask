import React, {Dispatch, SetStateAction, useState} from "react"
import Users from "./components/Users/Users"
import Profile from "./components/Profile/Profile"

import {Row, Col} from "antd"

import {convertStringToURLSearchParams} from "./utils/convertStringToURLSearchParams"
import {UserType, RepositoryType} from "./types"

import "./App.scss"
import 'antd/dist/antd.css';


const App = () => {

  const [users, setUsers] = useState<UserType[] | undefined>(undefined)
  const [user, setUser] = useState<UserType | undefined>(undefined)
  const [repositories, setRepositories] = useState<RepositoryType[] | undefined>(undefined)
  const [profileLoading, setProfileLoading] = useState<boolean>(false)

  const getUsers = async (query: string, setLoading: Dispatch<SetStateAction<boolean>>) => {
    if (query) {
      const response = await fetch("https://api.github.com/search/users?per_page=10&q=" + convertStringToURLSearchParams(query)).then(res => res.json())
      const getProfiles = response.items.map((el: any) => fetch(el.url).then(res => res.json()))
      const profiles = await Promise.all(getProfiles)
      setUsers(profiles)
    }
    setLoading(false)
  }

  const getProfile = async (id: number) => {
    if (users) {
      setProfileLoading(true)
      const getRepositories = (): Promise<RepositoryType[]> => fetch(users[id].repos_url + "?per_page=5").then(res => res.json())
      const repositories = await getRepositories()

      setUser(users[id])
      setRepositories(repositories)
      setProfileLoading(false)
    }
  }

  const getRepositories = async (query: string, setLoading: Dispatch<SetStateAction<boolean>>) => {
    if (query && user) {
      const queryString = `https://api.github.com/search/repositories?q=${convertStringToURLSearchParams(query)}+user:${user.login}&per_page=5`
      const response = await fetch(queryString).then(res => res.json())
      setRepositories(response.items)
    }
    setLoading(false)
  }

  return (
    <Row className="app" gutter={16}>

      <Col className="gutter-row" md={{span: 11, offset: 1}} lg={{span: 8, offset: 4}}>
        <Users list={users} getUsers={getUsers} getProfile={getProfile}/>
      </Col>
      <Col className="gutter-row" md={{span: 11}} lg={{span: 8}}>
        <Profile user={user} repositories={repositories} getRepositories={getRepositories} loading={profileLoading}/>
      </Col>

    </Row>
  )
}

export default App
