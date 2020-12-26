import React, {createContext, useState} from 'react'

const AccessTokenContext = createContext()

const AccessTokenProvider = ({children}) => {
  const [value, setValue] = useState(null)

  return (
    <AccessTokenContext.Provider value={{value, setValue}}>
      {children}
    </AccessTokenContext.Provider>
  )
}

export {AccessTokenContext, AccessTokenProvider}
