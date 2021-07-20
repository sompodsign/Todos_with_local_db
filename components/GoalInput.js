import React, {useState} from "react";
import {StyleSheet, View} from 'react-native';
import { TextInput } from 'react-native-paper';

const GoalInput = ({addHandler}) => {
    const [title, setTitle] = useState("");

    const pressHandler = (title) => {
        addHandler(title);
        setTitle("");
    };

    return (

        <View>
            <TextInput
                style={{backgroundColor: '#DBE6FD', marginTop: 10}}
                mode='focused'
                label="Type Here"
                value={title}
                onChangeText={title => setTitle(title)}
                right={<TextInput.Icon style={{color: '#293B5F', fontSize: 34}} onPress={() => pressHandler(title)} name="plus" />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 5,
    },
    button: {
        padding: 10,
    }
});

export default GoalInput;
