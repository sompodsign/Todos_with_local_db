import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import Header from "./components/Header";
import Realm from "realm";


const date = new Date().getDate(); //To get the Current Date
const month = new Date().getMonth() + 1; //To get the Current Month
const year = new Date().getFullYear(); //To get the Current Year


export default function App() {

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  async function getTodos() {
    const realm = await Realm.open({
      path: "todos",
      schema: [TaskSchema],
    });

    return realm.objects("Task");

  }

  useEffect(() => {
    getTodos().then(r => setTodos(r));
  }, [title]);

  const TaskSchema = {
    name: "Task",
    properties: {
      _id: "int",
      title: "string",
      date: "int",
      month: "int",
      year: "int",
    },
    primaryKey: "_id",
  };

  async function pressHandler(title) {
    setTitle(title);
    const realm = await Realm.open({
      path: "todos",
      schema: [TaskSchema],
    });

    const lastTask = realm.objects("Task").sorted("_id", true)[0];
    const highestId = lastTask == null ? 0 : lastTask._id + 1;

    realm.write(() => {
      realm.create("Task", {

        _id: highestId,
        title: title,
        date: date,
        month: month,
        year: year,
      });
    });
  }

  async function deleteHandler(id) {

    setTodos(todos.filter(r => r._id !== id));

    const realm = await Realm.open({
      path: "todos",
      schema: [TaskSchema],
    });

    realm.write(() => {
      const taskTodelete = realm.objects("Task").filtered(`_id==${id}`);
      realm.delete(taskTodelete);
    });

  }

  const keyboardVerticalOffset = Platform.OS === "ios" ? 60 : 50;


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.background} onPress={Keyboard.dismiss}>
        <Header />
        {/*<KeyboardAvoidingView style={styles.container} behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>*/}
        <View style={styles.container}>
          <View onPress={() => Keyboard.dismiss()}>
            <GoalItem deleteItem={deleteHandler} items={todos} addHandler={pressHandler} />
          </View>
        </View>
        {/*</KeyboardAvoidingView>*/}


          <GoalInput inputStyle={styles.input} addHandler={pressHandler} />

      </View>
    </TouchableWithoutFeedback>
  );
};

const windowHeight = Dimensions.get("window").height - 200;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#47597E",
    flex: 1,
  },
  container: {
    padding: 30,
    marginTop: 10,
  },
  messageContainer: {},
  input: {

  }
});
