import { useLocalSearchParams } from "expo-router";
import * as ExpoVideo from "expo-video";
import { VideoView } from "expo-video";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mediaDetailedList from "../../assets/data/mediaDetailedList.json";
import { Episode } from "../../types/type";
import EpisodeListItem from "../components/episodeListItem";
import MediaHeader from "../components/mediaHeader";
import MediaInfo from "../components/mediaInfo";
import SeasonSelector from "../components/seasonSelectorMenu";
export default function MediaDetails() {
  const { id } = useLocalSearchParams();
  const mediaItem = mediaDetailedList.find((media) => media.id === id);
  const videoViewRef = useRef<VideoView | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>("Season 1");
  const [seasonEpisodes, setSeasonEpisodes] = useState<Episode[]>([]);
  const [episodeLoadingId, setEpisodeLoadingId] = useState<string | null>(null);

  const {
    type = "",
    title = "",
    description = "",
    releaseYear = 0,
    ageRestriction = "",
    duration = 0,
    thumbnail = "",
    trailer = "",
    videoUrl = "",
    seasons = [],
  } = mediaItem ?? {};
  useEffect(() => {
    if (!mediaItem || type !== "TV_SERIES") return;
    const season = mediaItem.seasons?.find(
      (seasonItem) => seasonItem.seasonName === selectedSeason
    );
    setSeasonEpisodes(season?.episodes || []);
  }, [selectedSeason, mediaItem, type]);
  const trailerPlayer = ExpoVideo.useVideoPlayer(trailer, (player) => {
    if (player) {
      player.currentTime = 10;
      player.play();
    }
  });
  const videoSource =
    type === "MOVIE" ? videoUrl : seasons?.[0]?.episodes?.[0]?.videoUrl;
  const mediaPlayer = ExpoVideo.useVideoPlayer(videoSource ?? "", (player) => {
    if (player) {
      player.showNowPlayingNotification = true;
    }
  });

  if (!mediaItem) {
    return <Text>Media Not Found!</Text>;
  }

  if (!videoSource) {
    return <Text>No playable video found.</Text>;
  }
  const onPlayMediaPressed = async (video?: string, episodeId?: string) => {
    try {
      trailerPlayer.pause();
      if (video && episodeId) {
        setEpisodeLoadingId(episodeId);
        await mediaPlayer.replaceAsync(video);

        setEpisodeLoadingId(null);
        await new Promise((res) => setTimeout(res, 500)); // small delay
      }
      videoViewRef.current?.enterFullscreen();
      mediaPlayer.play();
    } catch (error) {
      console.error("Video play error", error);
    }
  };

  return (
    <SafeAreaView>
      <MediaHeader
        thumbnail={thumbnail ?? ""}
        trailerPlayer={trailerPlayer}
        mediaPlayer={mediaPlayer}
        videoViewRef={videoViewRef}
      />
      <FlatList
        data={seasonEpisodes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EpisodeListItem
            episode={item}
            onPlayMediaPressed={onPlayMediaPressed}
            isEpisodeLoading={episodeLoadingId === item.id}
          />
        )}
        ListHeaderComponent={
          <View>
            <MediaInfo
              title={title ?? ""}
              releaseYear={releaseYear ?? ""}
              ageRestriction={ageRestriction ?? ""}
              duration={duration ?? 0}
              description={description ?? ""}
              type={type ?? ""}
              thumbnail={thumbnail}
              nrOfSeasons={seasons?.length}
              onPlayMediaPressed={onPlayMediaPressed}
            />

            {type === "TV_SERIES" && !!seasons && (
              <SeasonSelector
                seasons={seasons}
                selectedSeason={selectedSeason}
                setSelectedSeason={setSelectedSeason}
              />
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}
