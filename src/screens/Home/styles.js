import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        color: '#E5E5E5',
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
});

export default styles