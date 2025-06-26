import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mediaList from "../../assets/data/mediaList.json";
import MediaListItem from "../components/medialistItem";

export default function HomeScreen() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Filtered list based on search by ID
  const filteredMediaList = searchText
    ? mediaList
        .map((section) => ({
          ...section,
          title: section.title,
          id: section.id,
          data: section.data.filter((item) =>
            item.id.toString().includes(searchText)
          ),
        }))
        .filter((section) => section.data.length > 0)
    : mediaList;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>For Sagar</Text>
          {showSearch ? (
            <Feather
              name="x"
              size={22}
              color={"white"}
              onPress={() => {
                setShowSearch(false);
                setSearchText("");
              }}
            />
          ) : (
            <Feather
              name="search"
              size={22}
              color={"white"}
              onPress={() => setShowSearch(true)}
            />
          )}
        </View>

        {showSearch && (
          <TextInput
            placeholder="Search by ID..."
            placeholderTextColor="lightgray"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            keyboardType="numeric"
          />
        )}

        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={styles.filterText}>Tv Show</Text>
          <Text style={styles.filterText}>Movies</Text>
          <Text style={styles.filterText}>Category</Text>
        </View>
      </View>
      {filteredMediaList.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No data found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredMediaList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item: verticalListItem }) => (
            <View>
              <Text style={styles.sectionTile}>{verticalListItem.title}</Text>
              <FlatList
                horizontal
                data={verticalListItem.data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item: horizontalListItem }) => (
                  <MediaListItem mediaItem={horizontalListItem} />
                )}
              />
            </View>
          )}
        />
      )}
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
    alignItems: "center",
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
  searchInput: {
    backgroundColor: "#222",
    color: "white",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
