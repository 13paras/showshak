import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'

const Chat = () => {
  return (
    <SafeAreaView>
      <Text>Chat</Text>
      <SearchInput />
    </SafeAreaView>
  )
}

export default Chat