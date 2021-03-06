import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { Input, Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";

export default class UserProfileView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
              }}
            />

            <Text style={styles.name}>John Doe </Text>
            <Text style={styles.userInfo}> Agent </Text>
            <Text style={styles.userInfo}>Florida </Text>

            <Text style={styles.userInfo}>30 Days Left </Text>
            <Button
              icon={
                <Feather
                  style={{ color: "white", marginRight: 10 }}
                  name={Platform.OS === "android" ? "edit" : "edit"}
                  size={24}
                  color="black"
                />
              }
              title="Edit"
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#DCDCDC",
  },
  headerContent: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "blue",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600",
  },
  body: {
    backgroundColor: "#778899",
    height: 500,
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },
  editLine: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
