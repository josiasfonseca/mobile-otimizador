import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#E0DDDD",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  viewSelect: {
    backgroundColor: "#BBB",
    borderRadius: 20,
    padding: 5,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18
  },
  viewButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30
  },
  viewCancelar: {
    marginRight: 50,
    backgroundColor: '#FF6347',
    height: 35,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  viewConfirmar: {
    // backgroundColor: '#13B58C',
    height: 35,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
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
})

export default styles