import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import TabBarButton from './TabBarButton';

const TabBar = ({state, descriptors, navigation }) => {
  const primaryColor = '#2563eb';
  const greyColor = '#737373';
  return (
    <View 
    className='absolute flex-row justify-between items-center bottom-5'
    // style={style.tabbar}
     >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

            // console.log("Route named: ", route.name)

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton 
          key={route.name}
          style={styles.tabbarItem}
          onPress={onPress}
          onLongPress={onLongPress}
          isFocused={isFocused}
          routeName={route.name}
          color={isFocused? primaryColor: greyColor}
          label={label}
        />
          // <TouchableOpacity
          // key={route.name}
          // className='flex-1 justify-center items-center'
          //   accessibilityRole="button"
          //   accessibilityState={isFocused ? { selected: true } : {}}
          //   accessibilityLabel={options.tabBarAccessibilityLabel}
          //   testID={options.tabBarTestID}
          //   onPress={onPress}
          //   onLongPress={onLongPress}
          //   style={{ flex: 1 }}
          // >
          //   <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
          //     {label}
          //   </Text>
          // </TouchableOpacity>
        );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  /* tabbar: {
      position: 'absolute', 
      bottom: 25,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      marginHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 25,
      borderCurve: 'continuous',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 10},
      shadowRadius: 10,
      shadowOpacity: 0.1
  } */
})



export default TabBar