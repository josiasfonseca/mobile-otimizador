import { StatusBar, StyleSheet, useWindowDimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    color: '#E5E5E5',
    marginTop: StatusBar.currentHeight || 0,
  },
  titleId: {
      justifyContent: 'flex-start',
      marginLeft: 2,
      flex: 0.3,
  },
  titleNome: {
    alignContent: 'center',
    marginLeft: 2,
    flex: 2,
  },
  titleAcao: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: 2,
    flex: 0.6,
  },
  cellId: {
    justifyContent: 'flex-start',
    marginLeft: 5,
    flex: 0.3,
  },
  cellNome: {
    alignContent: 'center',
    marginLeft: 9,
    flex: 2,
  },
  cellAcao: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex:1.1,
    flexDirection: 'row',
    // backgroundColor: 'blue'
  },
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   color: '#E5E5E5',
  //   marginTop: StatusBar.currentHeight || 0,
  // },
  // viewHeader: {
  //   width: '100%',
  //   height: 70,
  //   alignItems: 'center',
  //   backgroundColor: '#13B58C'
  // },  
  viewReferencia: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    width: '100%',
    height: 70,
    marginTop: 0,
    // alignItems: 'center',
    justifyContent: 'center',
  },  
  viewTextReferencia: {
    justifyContent: 'center',
    
  },  
  textReferencia: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  viewSelect: {
    backgroundColor: "#bbb",
    borderRadius: 8,
    width: 120,
    padding: 0,
    justifyContent: 'center',
    // elevation: 2,
    // backgroundColor: 'red'
  },
  // viewFlatList: {
  //   width: '100%',
  //   marginTop: 5
  // },
  // itemStatus: {
  //   alignItems: 'flex-end',
  //   width: '30%',
  //   justifyContent: 'center',
  // }, 
  // textItemStatus: {
  //   color: '#0e0e0e',
  //   marginRight: 30,
  //   textAlign: 'right',
  //   width: '100%'
  // },
  // item: {
  //   backgroundColor: '#ccc',
  //   padding: 8,
  //   marginVertical: 5,
  // },
  // itemError: {
  //   // backgroundColor: '#98979a',
  //   backgroundColor: '#FA8072',
  //   padding: 8,
  //   marginVertical: 5,
  // },
  // row: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  // },
  // itemNome: {
  //   // color: '#000',
  //   width: '37%',
  //   justifyContent: 'center',
  // },
  // textItemNome: {
  //   color: '#0e0e0e',
  //   marginRight: 30,
  //   textAlign: 'left',
  //   width: '100%'
  // },
  // itemCodigo: {
  //   width: '10%',
  //   color: '#fff',
  //   textAlign: 'right',
  //   justifyContent: 'center',
  // },
  // textItemCodigo: {
  //   color: '#0e0e0e',
  //   textAlign: 'left',
  // },
  // title: {
  //   fontSize: 18,
  // },
})

export default styles
