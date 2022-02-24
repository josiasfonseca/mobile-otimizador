import { StatusBar, StyleSheet, useWindowDimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    color: '#E5E5E5',
    marginTop: StatusBar.currentHeight || 0,
    // backgroundColor: '#13B58C',
  },
  // head: { height: 40, backgroundColor: '#f1f8ff' },
  // text: { margin: 6 },
  viewHeader: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#13B58C'
  },  
  header: {
    marginTop: 20,
    fontSize: 20,
    color: '#fff',
  },
  viewFlatList: {
    width: '100%',
    marginTop: 5
  },
  buttonControle: {
    alignItems: 'flex-end',
    width: '30%',
    justifyContent: 'center',
  },
  buttonImportador: {
    alignItems: 'flex-end',
    width: '30%',
    // backgroundColor: 'red'
    justifyContent: 'center',
  },  
  item: {
    backgroundColor: '#ccc',
    padding: 8,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemNome: {
    // color: '#000',
    width: '32%',
    justifyContent: 'center',
  },
  textItemNome: {
    color: '#0e0e0e',
    marginRight: 30,
    textAlign: 'right',
    width: '100%'
  },
  itemCodigo: {
    width: '6%',
    color: '#fff',
    textAlign: 'right',
    justifyContent: 'center',
  },
  textItemCodigo: {
    color: '#0e0e0e',
    textAlign: 'left',
  },
  itemEmail: {
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  textItemEmail: {
    color: '#cecece',
    fontSize: 18,
  },
  title: {
    fontSize: 18,
  },
})

export default styles
