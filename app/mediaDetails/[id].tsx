import mediaDetailedList from "@/assets/data/mediaDetailedList.json";
import { useLocalSearchParams } from "expo-router";
import { useVideoPlayer } from "expo-video";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MediaHeader from "../components/mediaHeader";
import MediaInfo from "../components/mediaInfo";
export default function MediaDetails() {
  const { id } = useLocalSearchParams();

  const mediaItem = mediaDetailedList.find((media) => media.id === id);
  // const [isTrailerLoading, setIsTrailerLoading] = useState<boolean>(true);
  // const videoViewRef = useRef<VideoView | null>(null);
  // Prepare default values to satisfy hooks' dependencies

  if (!mediaItem) {
    return <Text>Media Not Found!</Text>;
  }
  const {
    type,
    title,
    description,
    releaseYear = 0,
    ageRestriction,
    duration = 0,
    thumbnail,
    trailer,
    videoUrl,
    seasons = [],
  } = mediaItem;

  const trailerPlayer = useVideoPlayer(trailer ?? "", (player) => {
    if (player) {
      player.currentTime = 10;
      player.play();
    }
  });
  const videoSource =
    type === "MOVIE" ? videoUrl : seasons?.[0]?.episodes?.[0]?.videoUrl;
  const mediaPlayer = useVideoPlayer(videoSource ?? "", (player) => {
    if (player) {
      player.showNowPlayingNotification = true;
    }
  });

  if (!videoSource) {
    return <Text>No playable video found.</Text>;
  }

  return (
    <SafeAreaView>
      <MediaHeader
        thumbnail={thumbnail ?? ""}
        trailerPlayer={trailerPlayer}
        mediaPlayer={mediaPlayer}
      />
      <MediaInfo
        title={title ?? ""}
        releaseYear={releaseYear ?? ""}
        ageRestriction={ageRestriction ?? ""}
        duration={duration ?? 0}
        description={description ?? ""}
        type={type ?? ""}
        thumbnail={thumbnail}
        nrOfSeasons={seasons?.length}
      />
    </SafeAreaView>
  );
}
function useRef<T>(arg0: null) {
  throw new Error("Function not implemented.");
}
