import { Feather } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mediaList from "../../assets/data/mediaList.json";
import MediaListItem from "../components/medialistItem";
export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>For Sagar</Text>
          <Feather name="search" size={22} color={"white"} />
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={styles.filterText}> Tv Show</Text>
          <Text style={styles.filterText}>Movies</Text>
          <Text style={styles.filterText}>Category</Text>
        </View>
      </View>
      <FlatList
        data={mediaList}
        renderItem={({ item: verticalListItem }) => (
          <View>
            <Text style={styles.sectionTile}>{verticalListItem.title}</Text>
            <FlatList
              horizontal
              data={verticalListItem.data}
              renderItem={({ item: horizontalListItem }) => (
                <MediaListItem mediaItem={horizontalListItem} />
              )}
            ></FlatList>
          </View>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  sectionTile: {
    fontSize: 16,
    color: "white",
    fontWeight: "700",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  headerTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  filterText: {
    color: "white",
    fontSize: 12,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 6,
    fontWeight: "bold",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  headerContainer: {
    marginHorizontal: 10,
    gap: 10,
  },
});
