import { StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        color: '#E5E5E5',
        // marginTop: StatusBar.currentHeight || 0,
      },
      inputText: {
        marginTop: 1,
        width: '90%',
      },
      buttons: {
        flexDirection: 'row'
      },
      viewButtonSalvar: {
        margin: 10
      },
      buttonSalvar: {
        fontSize: 4,
        borderRadius: 10
      },
      viewButtonCancelar: {
        margin: 10
      },
      buttonCancelar: {
        fontSize: 4,
        borderRadius: 10
      },
});

export default styles