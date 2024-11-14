import { Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { client } from "@/app/client";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";
import * as Crypto from "expo-crypto";
import { ConnectError } from "@connectrpc/connect";

export default function PostScreen() {
  const [url, setUrl] = useState("");
  const [images, setImages] = useState<ImagePickerAsset[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      exif: true,
    });
    console.log(result);
    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  return (
    <SafeAreaView className="justify-center items-center h-full">
      <Text>Post Screen</Text>
      <TouchableOpacity onPress={pickImage}>
        <Text>Select Image for Upload</Text>
      </TouchableOpacity>
      {images && (
        <Image
          source={{ uri: images[0]?.uri }}
          className="aspect-square w-1/2 h-1/2"
        />
      )}

      <TouchableOpacity
        onPress={async () => {
          try {
            const imageKey = Crypto.randomUUID();
            console.log("imageKey", imageKey);
            const { uploadUrl, headers, method } =
              await client.getUploadImageURL({
                imageKey,
              });

            console.log("messages", images[0].base64);
            // const res = await fetch(uploadUrl, {
            //   headers: headers,
            //   method
            // })

            setUrl(uploadUrl);

            console.log("uploadUrl", uploadUrl);
          } catch (e) {
            if (e instanceof ConnectError) {
              console.error(e.cause, e.details, e.code);
            }
          }
        }}
      >
        <Text>Upload Image</Text>
      </TouchableOpacity>
      <Text>{url}</Text>
    </SafeAreaView>
  );
}
