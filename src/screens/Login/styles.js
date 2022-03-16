import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#13B58C',
  },
  welcome: {
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageWelcome: {
    fontSize: 20,
    color: '#ffffff',
    padding: 10,
    marginTop: 10,
    width: '100%',
  },
  title: {
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageTitle: {
    fontSize: 25,
    color: '#ffffff',
    padding: 10,
    marginTop: 10,
    width: '100%',
  },
  messageTitle1: {
    fontSize: 25,
    color: '#ffffff',
    marginTop: -15,
    width: '100%',
  },
  login: {
    marginTop: 11,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageLogin: {
    fontSize: 15,
    color: '#dddddd',
    padding: 10,
    marginTop: 10,
    width: '50%',
  },
  inputUsuario: {
    // backgroundColor: 'blue',
    height: 50,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    width: '85%',
    borderColor: '#ccccdd',
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
  },
  inputTextUsuario: {
    fontSize: 19,
    color: '#ffffff',
    marginLeft: 10,
  },
  inputSenha: {
    height: 50,
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
    width: '85%',
    borderColor: '#ccccdd',
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
  },
  inputTextSenha: {
    fontSize: 19,
    color: '#ffffff',
    marginLeft: 10,
  },
  buttonLogin: {
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
    width: '100%',
  },
  inputButtonLogin: {
    width: '85%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#cccccc',
  },
  viewButtonLogin: {
    padding: 5,
  },
  messageResetSenha: {
    fontSize: 13,
    color: '#dddddd',
    padding: 10,
    marginTop: 10,
    width: '50%',
  },
})

export default styles
