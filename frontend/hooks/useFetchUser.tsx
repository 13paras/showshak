import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useGetUserQuery } from '@/redux/api/user.api'

const useFetchUser = ({id} :string | any) => {
    const [userData, setUserData] = useState(null)
    const {data} = useGetUserQuery(id)

    
  return (
    <View>
      <Text>useFetchUser</Text>
    </View>
  )
}

export default useFetchUser