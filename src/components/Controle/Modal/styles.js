import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
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
    backgroundColor: "#13B58C",
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
    textAlign: "center"
  },
  viewButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30
  },
  viewCancelar: {
    marginRight: 50,
    backgroundColor: '#ff4c4c',
    height: 35,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  viewConfirmar: {
    backgroundColor: '#13B58C',
    height: 35,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  }
})

export default styles