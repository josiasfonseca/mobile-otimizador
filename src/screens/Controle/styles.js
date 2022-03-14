import { StatusBar, StyleSheet, useWindowDimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    color: '#E5E5E5',
    marginTop: StatusBar.currentHeight || 0,
  },
  viewHeader: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    backgroundColor: '#13B58C'
  },  
  viewReferencia: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',

  },  
  textReferencia: {
    color: '#000',
    textAlign: 'left'
  },
  viewSelect: {
    backgroundColor: "#13B58C",
    borderRadius: 8,
    width: 100,
    height: 65,
    padding: 2,
    // elevation: 2,
    // backgroundColor: 'red'
  },
  viewFlatList: {
    width: '100%',
    marginTop: 5
  },
  itemStatus: {
    alignItems: 'flex-end',
    width: '30%',
    justifyContent: 'center',
  }, 
  textItemStatus: {
    color: '#0e0e0e',
    marginRight: 30,
    textAlign: 'right',
    width: '100%'
  },
  item: {
    backgroundColor: '#ccc',
    padding: 8,
    marginVertical: 5,
  },
  itemError: {
    // backgroundColor: '#98979a',
    backgroundColor: '#FA8072',
    padding: 8,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemNome: {
    // color: '#000',
    width: '37%',
    justifyContent: 'center',
  },
  textItemNome: {
    color: '#0e0e0e',
    marginRight: 30,
    textAlign: 'left',
    width: '100%'
  },
  itemCodigo: {
    width: '10%',
    color: '#fff',
    textAlign: 'right',
    justifyContent: 'center',
  },
  textItemCodigo: {
    color: '#0e0e0e',
    textAlign: 'left',
  },
  title: {
    fontSize: 18,
  },
})

export default styles
