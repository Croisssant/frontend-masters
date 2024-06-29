import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#fff',
  backgroundGradientToOpacity: 0.5,
  fillShadowGradientOpacity: 0,

  color: (opacity = 1) => `#023047`,
  labelColor: (opacity = 1) => `#333`,

  strokeWidth: 10, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

let num = 0;
const initData = []
const initLabels = []
setInterval(() => {

  if (initData.length > 10) {
    initLabels.shift();
    initData.shift();
  }

  initLabels.push(num);
  initData.push(Math.random() * (100 - 0 ) + 0);
  num++;
}, 1000);

const data = {
  labels: [1, 2, 3, 4 , 5, 6, 7, 8 , 9, 10],
  datasets: [
    {
      data: [1, 2, 3, 4 , 5, 6, 7, 8 , 9, 10],
      color: (opacity = 1) => `rgba(20, 205, 200, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Wind Speed (m/s)"] // optional
};

export const WindGraph = () => {
    return (
        <View style={styles.graphStyle}>
            <LineChart
                data={data}
                width={screenWidth}
                height={300}
                chartConfig={chartConfig}
                onDataPointClick={({ value }) => Alert.alert("Wind Speed", `${value}`)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    graphStyle: {
      margin: 0,
      padding: 0,
      alignContent: 'center',
      alignItems: 'center',
      borderWidth: 1
    },
  });