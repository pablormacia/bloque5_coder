import {NavigationContainer} from '@react-navigation/native'
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import React, {useState} from 'react';

const MainNavigator = () =>{
    const [user,setUser] = useState(null);

    return (
        <NavigationContainer>
          {
            user
            ? <TabNavigator />
            : <AuthNavigator />
          }
          
        </NavigationContainer>
        );
}

export default MainNavigator;