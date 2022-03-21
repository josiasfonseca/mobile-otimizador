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
  }, 
  viewReferencia: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    width: '100%',
    height: 70,
    marginTop: 0,
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
  },
})

export default styles
