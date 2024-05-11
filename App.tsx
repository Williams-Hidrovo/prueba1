import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { user } from './src/interfaces/userInterface'
import { DataTable } from './src/presentation/components'

const data: user[] = [
  {
    id: 1,
    usuario: 'will',
    primerNombre: 'will256',
    primerApellido: 'hidrovo',
    idCargo: 4,
    idDepartamento: 8,
    segundoApellido: 'Bernal',
    segundoNombre: 'antonio'
  },
  {
    id: 2,
    usuario: 'juan',
    primerNombre: 'Juan',
    primerApellido: 'Perez',
    idCargo: 3,
    idDepartamento: 6,
    segundoApellido: 'García',
    segundoNombre: 'Carlos'
  },
  {
    id: 3,
    usuario: 'ana',
    primerNombre: 'Ana',
    primerApellido: 'Gomez',
    idCargo: 1,
    idDepartamento: 2,
    segundoApellido: 'Martinez',
    segundoNombre: 'María'
  },
  {
    id: 4,
    usuario: 'luis',
    primerNombre: 'Luis',
    primerApellido: 'Rodriguez',
    idCargo: 2,
    idDepartamento: 7,
    segundoApellido: 'Hernandez',
    segundoNombre: 'Jose'
  },
  {
    id: 5,
    usuario: 'marta',
    primerNombre: 'Marta',
    primerApellido: 'Lopez',
    idCargo: 5,
    idDepartamento: 1,
    segundoApellido: 'Fernandez',
    segundoNombre: 'Pedro'
  },
  {
    id: 6,
    usuario: 'david',
    primerNombre: 'David',
    primerApellido: 'Sanchez',
    idCargo: 3,
    idDepartamento: 5,
    segundoApellido: 'Gomez',
    segundoNombre: 'Javier'
  }
]

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Modulo de Administracion</Text>
        <Text style={styles.subtitle}>Administracion de Usuarios</Text>
      </View>
      <DataTable data={data} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 30
  },
  title: {
    fontSize: 26
    //fontWeight: 700
  },
  subtitle: {
    fontSize: 16
    //fontWeight: 300
  }
})

export default App
