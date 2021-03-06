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
      inputSelect: {
        marginTop: 9,
        marginLeft: 13,
        padding: 0,
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
      viewSelectText: {
        backgroundColor: "#ccc",
        marginTop: 10,
        marginLeft: 0,
        borderRadius: 8,    
        width: '20%',
        height: 65,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      viewSelect: {
        backgroundColor: "#ccc",
        marginTop: 10,
        marginLeft: 20,
        borderWidth: 1,
        borderRadius: 8,    
        width: '65%',
        height: 65,
        justifyContent: 'center',
      },
});

export default styles