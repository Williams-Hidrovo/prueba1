import { Picker } from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { ICargos, IDepartamentos, user } from '../../interfaces/userInterface'
import { createUser, deleteUser, getUsersFetch, updateUser } from '../../services'
import { ModalBorrar } from './ModalBorrar'
import { ModalEdit } from './ModalEdit'
import { ModalNewUser } from './ModalNewUser'

interface Props {
  data: user[]
}

/*

 */
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
  }
]

const departamentosM = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const cargosM = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const deparsLetras = [
  'Departamentos',
  'Recursos Humanos',
  'Finanzas',
  'Tecnología',
  'Marketing',
  'Ventas',
  'Logística',
  'Desarrollo de Producto',
  'Servicio al Cliente',
  'Recursos Materiales'
]
const cargosLetras = [
  'Cargos',
  'Analista de Sistemas',
  'Desarrollador Backend',
  'Ingeniero de Software',
  'Arquitecto de Soluciones',
  'Especialista en Seguridad',
  'Consultor de TI',
  'Desarrollador Frontend'
]
//**************************************COMPONENTE */
//************************************************** */

export const DataTable = ({ data }: Props) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalUserOpen, setModalUserOpen] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [users, setUsers] = useState<user[]>(data)
  const [resUsers, setResUsers] = useState<user[]>(data)
  const [cargos, setCargos] = useState<ICargos[]>([])
  const [departamentos, setDepartamentos] = useState<IDepartamentos[]>([])
  const [depar, setDepar] = useState()
  const [cargo, setCargo] = useState()
  const [borrar, setBorrar] = useState(false)
  const [userEditar, setUserEditar] = useState<user>()
  const [newUser, setNewUser] = useState<user>({
    usuario: '',
    primerNombre: '',
    primerApellido: '',
    idCargo: 1,
    idDepartamento: 1,
    segundoApellido: '',
    segundoNombre: ''
  })
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (name: any, value: any) => {
    setUserEditar(() => ({
      ...userEditar!,
      [name]: value
    }))
  }

  const handleNewInputChange = (name: any, value: any) => {
    setNewUser(() => ({
      ...newUser!,
      [name]: value
    }))
  }

  function eliminarUsuarioPorId(id: number) {
    setUsers(data.filter(usuario => usuario.id !== id))
  }

  const formatearDatos = (format: user[]): user[] => {
    const usuariosConLetras = format.map((usuario: user) => ({
      ...usuario,
      idDepartamento: deparsLetras[usuario.idDepartamento],
      idCargo: cargosLetras[usuario.idCargo]
    }))
    return usuariosConLetras
  }

  const formatearDatosINVER = (user: user): user => {
    const user1: user = {
      ...user,
      idDepartamento: departamentos[deparsLetras.indexOf(user.idDepartamento)],
      idCargo: cargos[cargosLetras.indexOf(user.idDepartamento)]
    }
    return user1
  }

  function filtrarCargo(id: number | string): void {
    if (id === 'Cargos') {
      setBorrar(!borrar)
      return
    }
    const filtro = formatearDatos(resUsers).filter(usuario => usuario.idCargo === id)
    setUsers(filtro)
  }
  function filtrarDepar(id: number | string): void {
    if (id === 'Departamentos') {
      setBorrar(!borrar)
      return
    }
    const filtro = formatearDatos(resUsers).filter(usuario => usuario.idDepartamento === id)
    setUsers(filtro)
  }

  const renderItem = ({ item }: { item: user }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{item.usuario}</Text>
        <Text style={styles.cell}>{item.primerNombre + ' ' + item.segundoNombre}</Text>
        <Text style={styles.cell}>{item.primerApellido + ' ' + item.segundoApellido}</Text>
        <Text style={styles.cell}>{item.idCargo}</Text>
        <Text style={styles.cell}>{item.idDepartamento}</Text>
        <Pressable
          onPress={() => {
            setModalOpen(true)
            setUserEditar(item)
          }}
          style={styles.acciones}
        >
          <Icon name="clipboard-outline" type="ionicon" color={'#159649'} />
          <Text style={styles.editar}> Editar</Text>
        </Pressable>
        <Pressable
          style={styles.acciones}
          onPress={async () => {
            setModalEliminar(true)
            setUserEditar(item)
          }}
        >
          <Icon name="trash-outline" type="ionicon" color={'#E51156'} />
          <Text style={styles.eliminar}>Eliminar</Text>
        </Pressable>
      </View>
    )
  }

  useEffect(() => {
    getUsersFetch()
      .then(rest => {
        setUsers(formatearDatos(rest))
        setResUsers(rest)
      })
      .catch(error => {
        console.log('Error en la promesaxxxxxxxxxxxxxxxxx:', error)
        // Maneja el error aquí
      })
  }, [borrar, modalOpen, modalUserOpen])

  /*
**********************VISTA PRINCIPAL
//**********************************************************
*/
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Picker style={styles.combo} selectedValue={cargo} onValueChange={(itemValue, index) => filtrarCargo(itemValue!)}>
              {cargosLetras.map(d => (
                <Picker.Item key={d.toString()} label={d.toString()} value={d} />
              ))}
            </Picker>
          </View>
          <Picker style={styles.combo} selectedValue={depar} onValueChange={(itemValue, index) => filtrarDepar(itemValue!)}>
            {deparsLetras.map(d => (
              <Picker.Item key={d.toString()} label={d.toString()} value={d} />
            ))}
          </Picker>
        </View>
        <Pressable style={{ backgroundColor: '#E0E7EB', width: 143, height: 40, borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'black', textAlign: 'center' }} onPress={() => setModalUserOpen(true)}>
            Crear nuevo usuario
          </Text>
        </Pressable>
      </View>
      <View style={styles.header}>
        <Text style={styles.heading}> Usuario</Text>
        <Text style={styles.heading}> Nombres</Text>
        <Text style={styles.heading}> Apellidos</Text>
        <Text style={styles.heading}> IdCargo</Text>
        <Text style={styles.heading}> ID Departamento</Text>
        <Text style={styles.heading}> Acciones</Text>
      </View>

      {/******************************************* MODAL CREAR USUARIO****************************************************** */}
      {/******************************************* MODAL CREAR USUARIO****************************************************** */}
      <ModalNewUser isOpen={modalUserOpen}>
        <View style={styles.container2}>
          <View style={styles.modal}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10, borderBottomColor: '#f0f0f0', borderBottomWidth: 1 }}>
              <Text style={{ fontSize: 28, paddingVertical: 5, textAlign: 'left' }}>Registrar Usuario</Text>
            </View>

            <View style={styles.modalRow}>
              <View>
                <Text style={styles.subtitles2}>Departamento</Text>
                <Picker style={styles.combo2} selectedValue={depar} onValueChange={(itemValue, itemIndex) => setNewUser({ ...newUser!, idDepartamento: itemIndex! })}>
                  {cargosLetras.map(d => (
                    <Picker.Item key={d.toString()} label={d.toString()} value={d} />
                  ))}
                </Picker>
              </View>

              <View>
                <Text style={styles.subtitles2}>Cargos</Text>
                <Picker style={styles.combo2} selectedValue={cargo} onValueChange={(itemValue, itemIndex) => setNewUser({ ...newUser!, idCargo: itemIndex! })}>
                  {deparsLetras.map(d => (
                    <Picker.Item key={d.toString()} label={d.toString()} value={d} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.modalRow}>
              <View>
                <Text style={styles.subtitles2}>Primer Nombre</Text>
                <TextInput
                  style={[styles.inputs]}
                  onChangeText={text => {
                    handleNewInputChange('primerNombre', text)
                  }}
                ></TextInput>
              </View>

              <View>
                <Text style={styles.subtitles2}>Segundo Nombre</Text>
                <TextInput
                  style={styles.inputs}
                  onChangeText={text => {
                    handleNewInputChange('segundoNombre', text)
                  }}
                ></TextInput>
              </View>
            </View>

            <View style={styles.modalRow}>
              <View>
                <Text style={styles.subtitles2}>Primer Apellido</Text>
                <TextInput
                  style={styles.inputs}
                  onChangeText={text => {
                    handleNewInputChange('primerApellido', text)
                  }}
                ></TextInput>
              </View>

              <View>
                <Text style={styles.subtitles2}>Segundo Apellido</Text>
                <TextInput
                  style={styles.inputs}
                  onChangeText={text => {
                    handleNewInputChange('segundoApellido', text)
                  }}
                ></TextInput>
              </View>
            </View>

            <View style={styles.modalRow}>
              <View>
                <Text style={styles.subtitles2}>Usuario</Text>
                <TextInput
                  style={styles.inputs}
                  onChangeText={text => {
                    handleNewInputChange('usuario', text)
                  }}
                ></TextInput>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderTopColor: '#f0f0f0', borderTopWidth: 1 }}>
              <View style={{ margin: 10 }}>
                <Pressable
                  style={{ backgroundColor: '#006AB2', width: 143, height: 37, marginHorizontal: 15, borderRadius: 5 }}
                  onPress={async () => {
                    try {
                      console.log(newUser)
                      await createUser(newUser).then(resp => {
                        console.log(resp)
                        setUsers(prevState => {
                          newUser.id = 2102
                          prevState.push(newUser)
                          return prevState
                        })
                      })
                    } catch (error) {
                      console.log(error)
                    }

                    setBorrar(borrar => !borrar)
                    setModalUserOpen(false)
                  }}
                >
                  <Text style={{ color: 'white', textAlign: 'center', paddingVertical: 5 }}>Registrar</Text>
                </Pressable>
              </View>
              <View style={{ margin: 10 }}>
                <Pressable style={{ backgroundColor: '#DFE1E5', width: 143, height: 37, borderRadius: 5 }} onPress={() => setModalUserOpen(false)}>
                  <Text style={{ color: 'black', textAlign: 'center', paddingVertical: 5 }}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ModalNewUser>

      {/* ***********************************************MODAL ELIMINAR*/}
      {/* ***********************************************MODAL ELIMINAR*/}

      <ModalBorrar isOpen={modalEliminar}>
        <View style={styles.container2}>
          <View style={styles.modalEliminar}>
            <Text style={{ marginHorizontal: 10, marginVertical: 5, paddingVertical: 15 }}>¿Esta seguro que desea eliminar el usuario Seleccionado?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 10 }}>
              <Pressable
                style={{ width: 81, height: 29, margin: 10, backgroundColor: '#2F7DE3', borderRadius: 5 }}
                onPress={() => {
                  deleteUser(userEditar!.id!)
                  setBorrar(!borrar)
                  setModalEliminar(false)
                }}
              >
                <Text style={{ color: 'white', paddingVertical: 5, textAlign: 'center' }}>Aceptar</Text>
              </Pressable>
              <Pressable
                style={{ width: 81, height: 29, margin: 10, backgroundColor: '#white', borderRadius: 5, borderColor: '#d4d4d4', borderWidth: 1 }}
                onPress={() => setModalEliminar(false)}
              >
                <Text style={{ color: '#2F7DE3', paddingVertical: 5, textAlign: 'center' }}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ModalBorrar>

      {/* ***********************************************MODAL EDITAR*/}
      {/* ***********************************************MODAL EDITAR*/}

      <ModalEdit isOpen={modalOpen}>
        <View style={styles.container2}>
          <View style={styles.modal}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, borderBottomColor: '#f0f0f0', borderBottomWidth: 1 }}>
              <Text style={{ fontSize: 28, paddingVertical: 5 }}>Editar Usuario</Text>
            </View>
            <View style={styles.modalRow}>
              <View>
                <Text style={styles.subtitles2}>Departamento</Text>
                <Picker
                  style={styles.combo2}
                  selectedValue={depar}
                  onValueChange={(itemValue, itemIndex) => setUserEditar({ ...userEditar!, idDepartamento: parseInt(itemValue!) })}
                >
                  <Picker.Item label="departamentos" value={0} />
                  {deparsLetras.map(d => (
                    <Picker.Item key={d.toString()} label={d.toString()} value={d} />
                  ))}
                </Picker>
              </View>

              <View>
                <Text style={styles.subtitles2}>Cargos</Text>
                <Picker style={styles.combo2} selectedValue={cargo} onValueChange={(itemValue, itemIndex) => setUserEditar({ ...userEditar!, idCargo: parseInt(itemValue!) })}>
                  <Picker.Item label="cargos" value={0} />
                  {cargosLetras.map(d => (
                    <Picker.Item key={d.toString()} label={d.toString()} value={d} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.modalRow}>
              <View>
                <Text style={styles.subtitles2}>Primer Nombre</Text>
                <TextInput
                  style={styles.inputs}
                  onChangeText={text => {
                    handleInputChange('primerNombre', text)
                  }}
                  placeholder={userEditar?.primerNombre}
                ></TextInput>
              </View>

              <View>
                <Text style={styles.subtitles2}>Segundo Nombre</Text>
                <TextInput
                  style={styles.inputs}
                  onChangeText={text => {
                    handleInputChange('segundoNombre', text)
                  }}
                  placeholder={userEditar?.segundoNombre}
                ></TextInput>
              </View>
            </View>

            <View style={styles.modalRow}>
              <View>
                <Text style={styles.subtitles2}>Primer Apellido</Text>
                <TextInput
                  style={styles.inputs}
                  onChangeText={text => {
                    handleInputChange('primerApellido', text)
                  }}
                  placeholder={userEditar?.primerApellido}
                ></TextInput>
              </View>

              <View>
                <Text style={styles.subtitles2}>Segundo Apellido</Text>
                <TextInput
                  style={styles.inputs}
                  onChangeText={text => {
                    handleInputChange('segundoApellido', text)
                  }}
                  placeholder={userEditar?.segundoApellido}
                ></TextInput>
              </View>
            </View>

            <View style={styles.modalRow}>
              <View>
                <Text style={styles.subtitles2}>Usuario</Text>
                <TextInput
                  style={styles.inputs}
                  onChangeText={text => {
                    handleInputChange('usuario', text)
                  }}
                  placeholder={userEditar?.usuario}
                ></TextInput>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: '#f0f0f0' }}>
              <View style={{ marginVertical: 10 }}>
                <Pressable
                  style={{ backgroundColor: '#006AB2', width: 143, height: 37, marginHorizontal: 15, borderRadius: 5 }}
                  onPress={async () => {
                    console.log(userEditar)
                    await updateUser(userEditar!.id, formatearDatosINVER(userEditar!))
                      .then(resp => {
                        console.log(resp)
                        setUsers(prevState => {
                          const nuevos = [...prevState]
                          const indice = nuevos.findIndex(user => user.id === userEditar?.id)

                          if (indice !== -1) {
                            nuevos[indice].idCargo = userEditar!.idCargo
                            nuevos[indice].idDepartamento = userEditar!.idDepartamento
                            nuevos[indice].primerApellido = userEditar!.primerApellido
                            nuevos[indice].segundoApellido = userEditar!.segundoApellido
                            nuevos[indice].primerNombre = userEditar!.primerNombre
                            nuevos[indice].segundoNombre = userEditar!.segundoNombre
                          }

                          return nuevos
                        })
                      })
                      .catch()
                    setModalOpen(false)
                  }}
                >
                  <Text style={{ color: 'white', textAlign: 'center', paddingVertical: 5 }}>Actualizar</Text>
                </Pressable>
              </View>
              <View style={{ margin: 10 }}>
                <Pressable style={{ backgroundColor: '#DFE1E5', width: 143, height: 37, borderRadius: 5 }} onPress={() => setModalOpen(false)}>
                  <Text style={{ color: 'black', textAlign: 'center', paddingVertical: 5 }}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ModalEdit>
      <FlatList data={users} keyExtractor={item => item.id!.toString()} renderItem={renderItem} />
      <View style={{ flex: 1, justifyContent: 'center', minHeight: 50, backgroundColor: '#f0f0f0', marginVertical: 5 }}>
        <Text>Total Registros: {users.length}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 30
  },
  container2: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center'
  },
  headerTopBar: {
    width: 344,
    height: 50,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 10
  },
  combo: { height: 40, width: 300, borderColor: 'white', backgroundColor: '#E0E7EB', borderRadius: 5 },

  combo2: { height: 50, width: 200, borderColor: 'white', backgroundColor: '#F5F5F5', borderRadius: 5 },

  subtitles2: {
    //fontWeight: 500
  },
  headerTopBarText: {
    color: '#fff',
    fontSize: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 15
  },
  heading: {
    flex: 1,
    fontSize: 15
    //fontWeight: 500
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 2,
    elevation: 1,
    borderColor: 'rgba(146, 146, 146, 0.13)',
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1
  },
  cell: {
    fontSize: 15,
    textAlign: 'left',
    flex: 1,
    color: 'black'
  },
  acciones: {
    flexDirection: 'row',
    marginHorizontal: 8
  },
  eliminar: {
    color: '#E51156'
    //fontWeight: 600
  },
  editar: {
    color: '#159649'
    //fontWeight: 600
  },
  modal: {
    width: 500,
    height: 500,
    backgroundColor: '#FEFEFE',
    borderRadius: 20,
    shadowColor: 'black',
    borderColor: '#ededed',
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  modalEliminar: {
    width: 450,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    borderColor: '#d4d4d4',
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    elevation: 5
  },
  inputs: {
    backgroundColor: '#fff',
    borderColor: '#EDEDED',
    borderWidth: 1,
    height: 45,
    width: 200,
    borderRadius: 5
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardShadow: {
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3 // Solo para Android
  }
})
