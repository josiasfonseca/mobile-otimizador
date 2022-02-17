import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native'
import styles from './styles'

export default function Login({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.msg}>
            <Text style={styles.msg1}>Benvindo ao sistema!</Text>
          </View>
          <View style={styles.msg}>
            <Text style={styles.msg1}>Otimizador Contábil</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
