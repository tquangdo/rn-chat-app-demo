import AddPostScreen from '../screens/AddPostScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const FeedStack = ({ navigation }) => (
    <Stack.Navigator
    // KO duoc lam vay se anh huong all StackScreen!!! Muon lam thi lam rieng biet nhu ProfileStack!
    // screenOptions={{
    //     headerShown: false
    // }}
    >
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#2e64e5',
                    fontSize: 18,
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerRight: () => (
                    <View style={{ marginRight: 10 }}>
                        <FontAwesome5.Button
                            name="plus"
                            size={22}
                            backgroundColor="#fff"
                            color="#2e64e5"
                            onPress={() => navigation.navigate('AddPost')}
                        />
                    </View>
                ),
            }}
        />
        <Stack.Screen
            name="AddPost"
            component={AddPostScreen}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#2e64e515',
                    shadowColor: '#2e64e515',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
        />
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
        />
    </Stack.Navigator>
)
const MessageStack = () => (
    <Stack.Navigator>
        {/* <Stack.Screen name="Messages" component={MessagesScreen} /> */}
        <Stack.Screen
            name="Chat"
            component={ChatScreen}
        // options={({ route }) => ({
        //     title: route.params.userName,
        //     headerBackTitleVisible: false,
        // })}
        />
    </Stack.Navigator>
);

const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                headerShown: false,
            }}
        />
        {/* <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
                headerTitle: 'Edit Profile',
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
            }}
        /> */}
    </Stack.Navigator>
)
const AppStack = () => {
    const getTabBarVisibility = (arg_route) => {
        const routeName = getFocusedRouteNameFromRoute(arg_route) ?? ''
        if (routeName === 'Chat') {
            return false;
        }
        return true;
    }
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#2e64e5',
            }}>
            <Tab.Screen
                name="Home"
                component={FeedStack}
                options={({ route }) => ({
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home-outline"
                            color={color}
                            size={size}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Messages"
                component={MessageStack}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="chatbox-ellipses-outline"
                            color={color}
                            size={size}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default AppStack;
