import {  useState } from "react"

type UseArrayProps = {
  value: any[]
  identifier?: null | string
  allowDuplicate?: boolean
}

export const useArray = ({ value, identifier = null, allowDuplicate = false }: UseArrayProps) => {
  const [_value, setValue] = useState(value)

    const _setValue = (data:unknown) => {
        if (Array.isArray(data)) {
            setValue([...data])
          } else {
            console.warn("Only arrays are supported in use array hook")
            setValue([])
          }
    } 

  const _findIndex = (data: unknown, arr = _value) => {
    return arr.findIndex((_item) => {
      const item = identifier ? _item[identifier] : _item
      return item === data
    })
  }

  const insertOrRemove = (data: unknown) => {
    const temp = _value
    const index = _findIndex(data)

    if (index < 0) {
      temp.push(data)
    } else {
      temp.splice(index, 1)
    }

    _setValue([...temp])
  }

  /**
   * @param data to insert into array
   * @adds data in array, it checks for duplicates
   */
  const insert = (data: unknown) => {
    const temp = _value
    if (allowDuplicate) {
      temp.push(data)
      return _setValue([...temp])
    }
    const index = _findIndex(data)
    if (index < 0) {
      temp.push(data)
      _setValue([...temp])
    }
  }

    /**
   * @param remove from the array
   * @removes data from array if exist
   */
    const remove = (data: unknown) => {
        const temp = _value;
        const index = _findIndex(data)
        if (index >= 0) {
          temp.splice(index, 1)
          _setValue([...temp])
        }
      }


      const updateValue = (data) => _setValue(data)

  return {
    value: _value,
    insertOrRemove,
    insert,
    remove,
    updateValue
  }
}
