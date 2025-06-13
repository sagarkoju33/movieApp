import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type MediaInfoProps = {
  title: string;
  releaseYear: number;
  ageRestriction: string;
  duration?: number;
  description: string;
  type: string;
  nrOfSeasons?: number;
  thumbnail?: string;
};

export default function MediaInfo(props: MediaInfoProps) {
  const {
    title,
    releaseYear,
    ageRestriction,
    duration,
    description,
    type,
    nrOfSeasons,
    thumbnail,
  } = props;

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.headerContainer}>
        <Text style={styles.metaInfoText}>{releaseYear}</Text>
        <Text style={styles.ageText}>{ageRestriction}</Text>
        <Text style={styles.metaInfoText}>
          {type === "MOVIE" ? `${duration}min` : `${nrOfSeasons} seasons`}
        </Text>
      </View>
      <Image
        source={{ uri: thumbnail }}
        style={{
          width: "100%",
          aspectRatio: 3 / 4,
          borderRadius: 5,
          marginHorizontal: 4,
        }}
      />
      <Pressable
        style={styles.playButton}
        onPress={() => console.log("Pressed")}
      >
        <FontAwesome name="play" size={20} color="black" />
        <Text style={{ fontWeight: "600" }}>Play</Text>
      </Pressable>

      <Text style={{ color: "white" }}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  playButton: {
    backgroundColor: "lightgrey",
    borderRadius: 3,
    padding: 7,
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  ageText: {
    color: "white",
    fontSize: 9,
    padding: 2,
    backgroundColor: "#636363",
    borderRadius: 2,
  },
  metaInfoText: {
    color: "white",
    fontSize: 12,
  },
  headerContainer: {
    flexDirection: "row",
    gap: 5,
  },
});
