import React, { useState } from "react";
import { Alert, View,  } from "react-native";
import { TextInput } from "react-native-paper";

const GoalInput = ({ addHandler, inputStyle }) => {
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
    <View style={inputStyle}>
      <TextInput
        onSubmitEditing={() => pressHandler(title)}
        style={{ backgroundColor: "#DBE6FD"}}
        mode="focused"
        label="Type Here"
        value={title}
        onChangeText={title => setTitle(title)}
        right={<TextInput.Icon style={{ color: "#293B5F", fontSize: 34 }} onPress={() => pressHandler(title)}
                               name="send" />}
      />
    </View>
  );
};


export default GoalInput;
