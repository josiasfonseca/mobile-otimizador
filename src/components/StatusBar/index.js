import { View, Image, Text } from 'react-native'
import styles from './styles'

export default function StatusBar() {
  return (
    <View>
      <Image
        style={styles.image}
        source={require('./../../../assets/icon.png')}
      />
    </View>
  )
}
