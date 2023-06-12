import { StyleSheet, Text, View, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import * as Location from "expo-location"
import { COLORS } from '../constants'
import MapPreview from './MapPreview'

const LocationSelector = ({ onLocation }) => {
    const navigation = useNavigation()
    const [pickedLocation, setPickedLocation] = useState()

    const veryPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== "granted") {
            Alert.alert(
                "PERMISOS INSUFICIENTES",
                "NECESITAMOS PERMISOS PARA LA UBICACION", [{ text: "OKAY" }]
            )
            return false
        }
        return true
    }

    const handleGetLocation = async () => {
        const isLocationOk = await veryPermissions()
        if (!isLocationOk) return

        const location = await Location.getCurrentPositionAsync()
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
        onLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }

    return (
        <View style={styles.container}>
          <MapPreview location={pickedLocation} newStyle={styles.preview}>
            <Text>UBICACION EN PROCESO...</Text>
          </MapPreview>
            <Button
                title='OBTENER UBICACION'
                color={COLORS.PINK}
                onPress={handleGetLocation} />
        </View>
    )
}

export default LocationSelector

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
    action: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
})