import React, {createContext, useState} from 'react'

const GroupsContext = createContext()

const GroupsProvider = ({children}) => {
  const [value, setState] = useState([])

  const setValue = (groups) => {
    setState(
      groups.map((group) => {
        return {
          id: group.groupId,
          name: group.groupName,
          type: group.groupType,
          usersCount: group.usersCount
        }
      })
    )
  }

  return (
    <GroupsContext.Provider value={{value, setValue}}>
      {children}
    </GroupsContext.Provider>
  )
}

export {GroupsContext, GroupsProvider}
