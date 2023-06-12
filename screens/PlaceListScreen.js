import React from 'react'
import { FlatList } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import {useSelector} from "react-redux"
import PlaceItem from '../components/PlaceItem'

const PlaceListScreen = () => {
    const  places = useSelector(state => state.places.places)

    const renderItem =({ item,}) => (
        <PlaceItem 
        title={item.title}
        image={item.image}
        address={"cualquiera"}
        onSelect={() => navigation.navigate("Detalle",{placeId: item.id})}
        />
        )

    return (
        <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaceListScreen
