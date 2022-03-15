import { StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        color: '#E5E5E5',
        marginTop: StatusBar.currentHeight || 0,
      },
      inputUsuario: {
        marginTop: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'  ,
      }
});

export default styles