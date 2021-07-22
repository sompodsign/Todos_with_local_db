import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import GoalInput from "./GoalInput";

const GoalItem = ({ items, deleteItem, addHandler }) => {


  return (

    <FlatList
      keyExtractor={(item) => item._id.toString()}
      data={items}
      renderItem={({ item }) => (
        <Card
          mode="outlined"
          style={{ backgroundColor: "#293B5F", borderRadius: 10, marginBottom: 3 }}
        >

          <Card.Title
            style={{ color: "green" }}
            onPress={deleteItem}
            title={item.title}
            titleStyle={{ color: "white" }}
            subtitle={`${item.date}/0${item.month}/${item.year}`}
            subtitleStyle={{ color: "#EEEEEE" }}
            left={(props) => <Avatar.Icon color="#B2AB8C" style={{ backgroundColor: "#47597E" }} {...props}
                                          icon="calendar-check" />}
            right={(props) => (
              <IconButton {...props} color="#B2AB8C" icon="check" onPress={() => deleteItem(item._id)} />
            )}

          />

        </Card>

      )}
      // ListFooterComponent={<GoalInput addHandler={addHandler}/>}
    />

  );
};

const styles = StyleSheet.create({
flatList: {
        height: 50,
        backgroundColor: 'red'
    }
})

export default GoalItem;


