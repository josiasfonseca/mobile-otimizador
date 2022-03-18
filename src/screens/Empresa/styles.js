import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    color: '#E5E5E5',
  },
  datatable: {
    width: '100%',
    height: '98%'
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
    flex: 1.1,
    flexDirection: 'row',
    // backgroundColor: 'blue'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 80,
    backgroundColor: '#13B58C'
  },
});

export default styles