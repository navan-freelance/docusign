import React, {createContext, useState} from 'react'

const FoldersContext = createContext()

const FoldersProvider = ({children}) => {
  const [value, setState] = useState([])

  const setValue = (folders) => {
    setState(
      folders.map((folder) => {
        return {
          id: folder.folderId,
          name: folder.name,
          subfoldersCount: folder.subFolderCount,
          type: folder.type
        }
      })
    )
  }

  return (
    <FoldersContext.Provider value={{value, setValue}}>
      {children}
    </FoldersContext.Provider>
  )
}

export {FoldersContext, FoldersProvider}
