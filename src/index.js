import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import Client from './Client'
import {AccessTokenProvider} from './providers/AccessToken'
import {FoldersProvider} from './providers/Folders'
import {GroupsProvider} from './providers/Groups'
import {UserProvider} from './providers/User'

render(
  <BrowserRouter>
    <AccessTokenProvider>
      <FoldersProvider>
        <GroupsProvider>
          <UserProvider>
            <Client />
          </UserProvider>
        </GroupsProvider>
      </FoldersProvider>
    </AccessTokenProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
