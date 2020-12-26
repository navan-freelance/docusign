import Axios from 'axios'
import React, {useContext, useEffect} from 'react'
import {Link, Route, Switch, useHistory, useLocation} from 'react-router-dom'

import Navbar from '../components/Navbar'
import Server from '../environment/Server'
import {AccessTokenContext} from '../providers/AccessToken'
import {FoldersContext} from '../providers/Folders'
import {GroupsContext} from '../providers/Groups'
import {UserContext} from '../providers/User'

const Home = () => {
  const AccessToken = useContext(AccessTokenContext)
  const Folders = useContext(FoldersContext)
  const Groups = useContext(GroupsContext)
  const User = useContext(UserContext)
  const {push: travel} = useHistory()
  const {pathname: path} = useLocation()

  useEffect(() => {
    if (!AccessToken.value) travel('/')
    else {
      Axios.post(
        `${Server.URL}/user`,
        {access_token: AccessToken.value},
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(({data}) => User.setValue(data.accounts[0]))
        .catch((error) => {
          console.warn(error)
          AccessToken.setValue(null)
          travel('/')
        })
    }

    // eslint-disable-next-line
  }, [AccessToken.value])

  useEffect(() => {
    if (User.value.accountID) {
      Axios.post(
        `${Server.URL}/folders`,
        {
          access_token: AccessToken.value,
          account_id: User.value.accountID,
          base_uri: User.value.baseURI
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(({data}) => Folders.setValue(data.folders))
        .catch(console.warn)
    }

    // eslint-disable-next-line
  }, [User.value])

  useEffect(() => {
    if (User.value.accountID) {
      Axios.post(
        `${Server.URL}/groups`,
        {
          access_token: AccessToken.value,
          account_id: User.value.accountID,
          base_uri: User.value.baseURI
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(({data}) => Groups.setValue(data.groups))
        .catch(console.warn)
    }

    // eslint-disable-next-line
  }, [User.value])

  return (
    <div>
      <Navbar />
      <section className='section'>
        <div className='container'>
          <div className='tabs is-boxed'>
            <ul>
              <li className={path === '/home' ? 'is-active' : ''}>
                <Link style={{outline: 'none'}} to='/home'>
                  Folders
                </Link>
              </li>
              <li className={path === '/home/groups' ? 'is-active' : ''}>
                <Link style={{outline: 'none'}} to='/home/groups'>
                  Groups
                </Link>
              </li>
            </ul>
          </div>
          <Switch>
            <Route exact path='/home'>
              <table className='table is-hoverable' style={{width: '100%'}}>
                <thead>
                  <tr>
                    <th style={{width: '60%'}}>Name</th>
                    <th style={{width: '20%'}}>Type</th>
                    <th style={{width: '20%'}}>Subfolders</th>
                  </tr>
                </thead>
                <tbody>
                  {Folders.value.length
                    ? Folders.value.map((folder) => {
                        return (
                          <tr key={folder.id}>
                            <td>{folder.name}</td>
                            <td>{folder.type}</td>
                            <td>{folder.subfoldersCount}</td>
                          </tr>
                        )
                      })
                    : null}
                </tbody>
              </table>
            </Route>
            <Route exact path='/home/groups'>
              <table className='table is-hoverable' style={{width: '100%'}}>
                <thead>
                  <tr>
                    <th style={{width: '60%'}}>Name</th>
                    <th style={{width: '20%'}}>Type</th>
                    <th style={{width: '20%'}}>Users</th>
                  </tr>
                </thead>
                <tbody>
                  {Groups.value.length
                    ? Groups.value.map((group) => {
                        return (
                          <tr key={group.id}>
                            <td>{group.name}</td>
                            <td>{group.type}</td>
                            <td>{group.usersCount}</td>
                          </tr>
                        )
                      })
                    : null}
                </tbody>
              </table>
            </Route>
          </Switch>
        </div>
      </section>
    </div>
  )
}

export default Home
