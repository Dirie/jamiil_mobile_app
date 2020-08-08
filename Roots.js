import "react-native-gesture-handler";
import React, { useState } from "react";
import { Platform, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { connect } from "react-redux";

import * as actions from "./store/actions";

import UserProfileView from "./screens/UserProfile/profileTitle";
import Bills from "./screens/UserProfile/bills";
import Settings from "./screens/UserProfile/settings";

import Login from "./screens/auth/login";
import Register from "./screens/auth/register";

import Home from "./screens/home";

import CustomHeaderButton from "./components/UI/HeaderButton";
import Splash from "./screens/auth/main";

import { Ionicons } from "@expo/vector-icons";

import Colors from "./constants/Colors";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Roots(props) {
  const StackScreenOptions = (Color) => {
    return {
      headerTitleStyle: {
        color: Color,
        fontFamily: "open-sans-bold",
        textAlign: "center",
      },
      BackTitleStyle: {
        fontFamily: "open-sans",
      },
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.navy : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    };
  };

  // =======================================================================================================
  // stack navigators.....

  const HomeStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={StackScreenOptions("white")}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation, route }) => ({
            headerTitle: "Home",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
      </Stack.Navigator>
    );
  };

  const ProfileStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName=" User profile"
        screenOptions={StackScreenOptions("white")}
      >
        <Stack.Screen
          name="User profile"
          component={UserProfileView}
          options={({ navigation, route }) => ({
            headerTitle: "User profile",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
      </Stack.Navigator>
    );
  };

  const BillsStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Bills"
        screenOptions={StackScreenOptions("white")}
      >
        <Stack.Screen
          name="Pay bills"
          component={Bills}
          options={({ navigation, route }) => ({
            headerTitle: "Pay bills",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
      </Stack.Navigator>
    );
  };

  const SettingsStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={StackScreenOptions("white")}
      >
        <Stack.Screen
          name="Settings"
          component={Bills}
          options={({ navigation, route }) => ({
            headerTitle: "Settings",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
      </Stack.Navigator>
    );
  };

  const handleLogout = () => {
    props.logout();
  };

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <UserProfileView />
        <DrawerItemList {...props} />
        <DrawerItem
          onPress={handleLogout}
          label="Logout"
          icon={() => (
            <Ionicons
              name={Platform.OS === "android" ? "md-lock" : "ios-lock"}
              size={23}
              color={"black"}
            />
          )}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <NavigationContainer>
      {props.isSignout ? (
        <>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={StackScreenOptions("white")}
          >
            <Stack.Screen name="Home" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </>
      ) : (
        <>
          <Drawer.Navigator
            drawerType="slide"
            initialRouteName="Home"
            drawerContentOptions={{ activeTintColor: Colors.primary }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen
              name="Home"
              component={HomeStackNavigator}
              options={{
                drawerIcon: (drawerConfig) => (
                  <Ionicons
                    name={Platform.OS === "android" ? "md-home" : "ios-home"}
                    size={23}
                    color={drawerConfig.tintColor}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Profile"
              component={ProfileStackNavigator}
              options={{
                drawerIcon: (drawerConfig) => (
                  <Ionicons
                    name={
                      Platform.OS === "android" ? "md-contact" : "ios-contact"
                    }
                    size={23}
                    color={drawerConfig.tintColor}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Bills"
              component={BillsStackNavigator}
              options={{
                drawerIcon: (drawerConfig) => (
                  <Ionicons
                    name={Platform.OS === "android" ? "md-cash" : "ios-cash"}
                    size={23}
                    color={drawerConfig.tintColor}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Settings"
              component={SettingsStackNavigator}
              options={{
                drawerIcon: (drawerConfig) => (
                  <Ionicons
                    name={
                      Platform.OS === "android" ? "md-settings" : "ios-settings"
                    }
                    size={23}
                    color={drawerConfig.tintColor}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  const { userToken, isSignout } = state.auth;

  return {
    userToken,
    isSignout,
  };
};

export default connect(mapStateToProps, actions)(Roots);
