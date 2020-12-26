import Axios from 'axios'
import React, {useContext, useEffect} from 'react'
import {Route, Switch, useHistory, useLocation} from 'react-router-dom'

import DocuSign from './environment/DocuSign'
import Server from './environment/Server'
import {AccessTokenContext} from './providers/AccessToken'
import Home from './views/Home'

const Authorization = () => {
  const AccessToken = useContext(AccessTokenContext)
  const {push: travel} = useHistory()
  const {search: query} = useLocation()

  useEffect(() => {
    const authorization = window.btoa(
      DocuSign.INTEGRATION_KEY + ':' + DocuSign.SECRET_KEY
    )
    const parameters = new URLSearchParams(query)
    const code = parameters.get('code')

    Axios.post(
      `${Server.URL}/docusign/authorization`,
      {authorization, code},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(({data}) => {
        AccessToken.setValue(data.access_token)
        travel('/home')
      })
      .catch(console.warn)

    // eslint-disable-next-line
  }, [query])

  return null
}

const Client = () => {
  const getAuthorizationCode = () => {
    window.location.href =
      `${DocuSign.URI}/oauth/auth` +
      `?client_id=${DocuSign.INTEGRATION_KEY}` +
      `&redirect_uri=${DocuSign.REDIRECT_URI}` +
      '&response_type=code' +
      '&scope=signature spring_read spring_write'
  }

  return (
    <Switch>
      <Route exact path='/' render={getAuthorizationCode} />
      <Route exact path='/docusign/authorization'>
        <Authorization />
      </Route>
      <Route path='/home/'>
        <Home />
      </Route>
    </Switch>
  )
}

export default Client
