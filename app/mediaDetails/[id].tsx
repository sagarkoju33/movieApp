import mediaDetailedList from "@/assets/data/mediaDetailedList.json";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MediaInfo from "../components/mediaInfo";

export default function MediaDetails() {
  const { id } = useLocalSearchParams();

  const mediaItem = mediaDetailedList.find((media) => media.id === id);

  if (!mediaItem) {
    return <Text>Media Not Found!</Text>;
  }

  const {
    type,
    title,
    description,
    releaseYear,
    ageRestriction,
    duration,
    thumbnail,
    trailer,
    videoUrl,
    seasons,
  } = mediaItem;

  const videoSource =
    type === "MOVIE" ? videoUrl : seasons?.[0]?.episodes?.[0]?.videoUrl;

  if (!videoSource) {
    return <Text>No playable video found.</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 2 }}>
      <MediaInfo
        title={title}
        releaseYear={releaseYear}
        ageRestriction={ageRestriction}
        duration={duration}
        description={description}
        type={type}
        thumbnail={thumbnail}
        nrOfSeasons={seasons?.length}
      />
    </SafeAreaView>
  );
}
