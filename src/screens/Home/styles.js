import { StatusBar, StyleSheet } from 'react-native'

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
  header: {
    marginTop: 20,
    fontSize: 20,
    color: '#fff',
  },
  viewFlatList: {
    width: '100%',
    marginTop: 5,
    padding: 5
  },
  buttonControle: {
    alignItems: 'center',
    backgroundColor: '#13B58C',
    marginLeft: 55,
    width: '20%',
    fontStyle: 'italic',
    justifyContent: 'center',
    fontSize: 30,
    height: 35,
    borderRadius: 5
  },
  buttonImportador: {
    alignItems: 'center',
    backgroundColor: '#5F9EA0',
    marginLeft: 10,
    width: '25%',
    fontStyle: 'italic',
    justifyContent: 'center',
    fontSize: 30,
    height: 35,
    borderRadius: 5
  },
  item: {
    backgroundColor: '#A9A9A9',
    paddingTop: 10,
    paddingBottom: 10,
    height: 45,
    justifyContent: 'center',
    marginVertical: 2,
    borderRadius: 5
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemNome: {
    width: '32%',
    justifyContent: 'center',
  },
  textItemNome: {
    color: '#0e0e0e',
    marginLeft: 2,
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
    marginLeft: 1
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
