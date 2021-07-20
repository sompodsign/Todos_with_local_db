import React, { useState } from "react";
import { Alert, View,  } from "react-native";
import { TextInput } from "react-native-paper";

const GoalInput = ({ addHandler }) => {
  const [title, setTitle] = useState("");

  const pressHandler = (title) => {
    if (title) {
      addHandler(title);
      setTitle("");
    } else {
      Alert.alert(
        "",
        "Field is empty.",
        [{ text: "OK" }],
      );
    }
  };

  return (
    <View>
      <TextInput
        onSubmitEditing={() => pressHandler(title)}
        style={{ backgroundColor: "#DBE6FD", marginTop: 10 }}
        mode="focused"
        label="Type Here"
        value={title}
        onChangeText={title => setTitle(title)}
        right={<TextInput.Icon style={{ color: "#293B5F", fontSize: 34 }} onPress={() => pressHandler(title)}
                               name="plus" />}
      />
    </View>
  );
};


export default GoalInput;
