import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker"
import { COLORS } from "../constants";


const ImageSelector = props => {
    const [pickedUri, setPickedUri] = useState();

    const verifyPermissons = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted"){
           Alert.alert("PERMISOS SON INSUFICIENTES", "NECESITAMOS DAR PERMISOS PARA USAR LA CAMARA", [{Text: "OKAY"}]) 

           return false;
        }
        return true;
    }
    const handlerTakeImage = async () => {
        const hasPermission = await verifyPermissons();
        if(!hasPermission) return

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.8,
        })
        setPickedUri(image.assets[0].uri)
        props.onImage(image.assets[0].uri)
    }


    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                {!pickedUri ? (
                    <Text>NO HAY IMAGEN SELECCIONADA...</Text>
                ) : (
                    <Image style={styles.image} source={{ uri: pickedUri }} />
                )}
            </View>
            <Button
                title="TOMAR FOTO"
                color={COLORS.RED}
                onPress={handlerTakeImage} />
        </View>
    );
};

export default ImageSelector;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    preview: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: COLORS.PURPLE,
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
})