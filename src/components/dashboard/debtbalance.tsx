import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "@components/reusable/card";
import DonutChart from "../../DonutChart";
import { DebtChartDataItem } from "../../commonTypes";
import { DonutDataItem } from "../../commonTypes";
import { widthToDP as wp } from "react-native-responsive-screens";
interface DebtbalanceProps {
  data: DonutDataItem[];
  totalBalance: number;
}

const Debtbalance: React.FC<DebtbalanceProps> = ({ data, totalBalance }) => {
  // Transform DebtChartDataItem[] to DonutDataItem[]
  return (
    <Card style={styles.section_card} cardStyle={styles.section_card_inner}>
      <View style={styles.section_card_inner_content}>
        <View style={styles.section_card_inner_content_item}>
          <View style={styles.donut_chart_container}>
            <DonutChart
              data={data}
              radius={55}
              donutStrokeWidth={10}
              arcCornerRadius={0}
              canvasWidth={30}
              canvasHeight={5}
              labelFontSize={10}
              centerText={`₹${totalBalance}`}
              fontFamily="PlusJakartaSans-Bold"
              centerTextFontSize={wp(4)}
              showLabel={false}
              centerTextColor="#E63A30"
            />
          </View>
          <View style={styles.section_card_inner_content_item3}>
            <Text style={styles.section_card_text}>Balance</Text>
            <Image
              style={styles.image}
              source={require("@images/dashboard/balanceicon.png")}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

export default Debtbalance;

const styles = StyleSheet.create({
  section_card: {
    width: "48%",
    height: 168,
    borderWidth: 0.5,
  },
  section_card_text: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
  },
  section_card_inner_content: {
    gap: 20,
    justifyContent: "center",
    paddingVertical: 10,
  },
  section_card_inner_content_item: {
    flexDirection: "column",
    gap: ".5%",
    alignItems: "center",
  },
  section_card_inner_content_item_text: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 30,
  },
  section_card_inner_content_item_text2: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 20,
  },
  section_card_text2: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
  },
  section_card_inner: {
    height: "auto",
    justifyContent: "center",
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  section_card_inner_content_item2: {},
  section_card_inner_content_item3: {
    flexDirection: "row",
    alignItems: "center",
    gap: "4%",
  },
  donut_chart_container: {},
});
