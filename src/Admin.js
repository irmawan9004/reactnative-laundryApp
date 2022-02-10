import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaksi: [
        {
          nama: '',
          harga: 0,
          jumlah: 0,
          icon: '',
        },
      ],
      transaksiModal: false,
      selectedIndex: 0,
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      let value = await AsyncStorage.getItem('@transaksi');
      value = JSON.parse(value);

      if (value !== null) {
        this.setState({transaksi: value});
      }
      console.log('data berhasil diget', value);
    } catch (error) {
      console.log('data gagal di get', error.message);
    }
  };
  render() {
    return (
      <View>
        <FlatGrid
          itemDimension={130}
          data={this.state.transaksi}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                backgroundColor: '#5778FF',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 4,
                paddingVertical: 20,
                borderRadius: 5,
              }}
              onPress={() =>
                this.setState({transaksiModal: true, selectedIndex: index})
              }>
              <Icon name="user" size={50} color="#fff" />
              <Text style={styles.textTitle}>{item.nama}</Text>
              <Text style={styles.text}>{item.alamat}</Text>
            </TouchableOpacity>
          )}
        />

        <Modal isVisible={this.state.transaksiModal}>
          <View style={{flex: 1, backgroundColor: '#fff', borderRadius: 8}}>
            <View style={{flex: 1}}>
              <FlatGrid
                itemDimension={130}
                data={this.state.transaksi[this.state.selectedIndex].cart}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      backgroundColor: '#5778FF',
                      justifyContent: 'center',
                      alignItems: 'center',
                      elevation: 4,
                      paddingVertical: 20,
                      borderRadius: 5,
                    }}
                    onPress={() =>
                      this.setState({
                        transaksiModal: true,
                        selectedIndex: index,
                      })
                    }>
                    <Icon name={item.icon} size={50} color="#fff" />
                    <Text style={styles.textTitle}>{item.nama}</Text>
                    <Text style={styles.text}>{item.harga}</Text>
                    <Text style={styles.text}>{item.jumlah}</Text>
                  </View>
                )}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
              }}
              onPress={() => this.setState({transaksiModal: false})}>
              <Text style={{color: 'white'}}>Selesai</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Black',
    color: '#fff',
    marginLeft: 10,
  },
  text: {
    color: 'white',
  },
  textTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
  },
});
