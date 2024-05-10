import React from 'react'
import { Platform, Pressable, StyleSheet, Text } from 'react-native'

interface Props {
  label: string
  reset?: () => void
  sumar?: () => void
}

export const PrimaryButton = ({ sumar, reset, label }: Props) => {
  return (
    <Pressable style={({ pressed }) => [styles.boton, pressed && styles.botonPress]} onPress={() => sumar && sumar()} onLongPress={() => reset && reset()}>
      <Text style={{ color: 'white' }}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: Platform.OS === 'windows' ? '#e68c25' : '#5957d8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  },
  botonPress: {
    backgroundColor: Platform.OS === 'windows' ? '#f89320' : '#5856e9'
  }
})
