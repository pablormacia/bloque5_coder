import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
//import { ORDERS } from '../data/orders'
import OrderItem from '../components/OrderItem'
import { useSelector,useDispatch } from 'react-redux'
import { getOrders } from '../store/actions/orders.action'


const OrdersScreen = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state=>state.orders.list)
    const onHandleDeleteOrder = ()=>console.log("Elimina órden")

    useEffect(()=>{
      dispatch(getOrders())
    },[])

    const renderOrdersItem = ({item}) =>(
        <OrderItem
            item={item}
            onDelete={onHandleDeleteOrder}
        />
    )

  return (
    <View style={styles.container}>
      <FlatList 
        data={orders}
        renderItem={renderOrdersItem}
        keyExtractor={(item)=>item.id}
      />
    </View>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({})