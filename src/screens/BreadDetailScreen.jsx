import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
//import { BREADS } from '../data/products'
import { useSelector,useDispatch } from 'react-redux'

import { addItem } from '../store/actions/cart.action'

const BreadDetailScreen = ({navigation,route}) => {
    //const productId=route.params.productId
    //const bread = BREADS.find(product => product.id === productId);
    const dispatch=useDispatch()
    const breadId = useSelector(state=>state.breads.id)
    const breads = useSelector(state=>state.breads.breads)
    const bread = useSelector(state=>state.breads.selected)

    const onHandleAddToCart =()=>{
        dispatch(addItem(bread))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{bread.name}</Text>
            <Text>{bread.description}</Text>
            <Text>$ {bread.price}</Text>
            <Text>{bread.weight}</Text>
            <Button title="Agregar al carrito" onPress={onHandleAddToCart} />
            <Button title="Ir al carrito" onPress={()=>navigation.navigate("CartTab")} />
        </View>
    )
}

export default BreadDetailScreen

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    title: {
        fontSize:20,
        fontFamily: 'OpenSans_700Bold',
        marginBottom:10
    }
})