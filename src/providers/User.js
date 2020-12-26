import React, {createContext, useState} from 'react'

const UserContext = createContext()

const UserProvider = ({children}) => {
  const [value, setState] = useState({
    accountID: null,
    baseURI: null
  })

  const setValue = (account) => {
    setState({
      accountID: account.account_id,
      baseURI: account.base_uri
    })
  }

  return (
    <UserContext.Provider value={{value, setValue}}>
      {children}
    </UserContext.Provider>
  )
}

export {UserContext, UserProvider}
