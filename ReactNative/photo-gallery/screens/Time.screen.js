import React from "react"
import { Text, View, StyleSheet, Alert, Button } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TimeScreen() {
    const [date, setDate] = React.useState(new Date(Date.now()));
  
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        displayTimeAlert();
    };

    const displayTimeAlert = () => 
        Alert.alert("Selected Time", `${date.toLocaleString('en-GB')}`, [
            {
                text: "Okay",
                onPress: () => {},
                style: 'cancel'

            }
        ]);

    return (
        <View style={styles.container}>
            <View style={{height: "10%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={"date"}
                        is24Hour={true}
                        onChange={onChange}
                    />
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"time"}
                    is24Hour={true}
                    onChange={onChange}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
});