import { Link } from "expo-router";
import { Image, Pressable } from "react-native";
import { MediaListData } from "../../types/type";
type MediaListItemProps = {
  mediaItem: MediaListData;
};
export default function MediaListItem({ mediaItem }: MediaListItemProps) {
  return (
    <Link href={`../mediaDetails/${mediaItem.id}`} asChild>
      <Pressable>
        <Image
          source={{ uri: mediaItem.image }}
          style={{
            width: 110,
            aspectRatio: 3 / 4,
            borderRadius: 5,
            marginHorizontal: 4,
          }}
        />
      </Pressable>
    </Link>
  );
}
