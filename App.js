import React, { useEffect, useState } from "react";
import { StyleSheet, View, Keyboard } from "react-native";
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

    realm.write(() => {
      realm.create("Task", {
        _id: realm.objects("Task").length + 1,
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

  return (
    <View style={styles.background}>
      <Header />
      <View style={styles.container} onPress={() => Keyboard.dismiss()}>
        <GoalItem deleteItem={deleteHandler} items={todos} />

        <GoalInput addHandler={pressHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#47597E",
    flex: 1,
  },
  container: {
    padding: 30,
    marginTop: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
});
