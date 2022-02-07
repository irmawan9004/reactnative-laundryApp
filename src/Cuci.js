import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatGrid} from 'react-native-super-grid';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Cuci extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daftarJenisPakaian: [
        {
          nama: 'Baju',
          harga: 2000,
          jumlah: 0,
          icon: 'tshirt',
        },
        {
          nama: 'Kaos Kaki',
          harga: 4000,
          jumlah: 0,
          icon: 'socks',
        },
        {
          nama: 'Topi',
          harga: 4000,
          jumlah: 0,
          icon: 'hat-cowboy',
        },
      ],
      total: 0,
      cart: [],
      totalModal: false,
      nama: '',
      alamat: '',
      transaksi: [],
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

  saveData = async () => {
    try {
      await AsyncStorage.setItem(
        '@transaksi',
        JSON.stringify(this.state.transaksi),
      );
      console.log('data berhasil disimpan');
    } catch (error) {
      console.log('data gaggal disimpan');
    }
  };

  prosesTransaksi = () => {
    let detailTransaksi = {
      nama: this.state.nama,
      alamat: this.state.alamat,
      cart: this.state.cart,
    };
    let transaksi = this.state.transaksi;
    transaksi.push(detailTransaksi);
    this.saveData();

    this.setState({nama: '', alamat: '', cart: []});
  };

  editQty = (command, index) => {
    let daftarJenisPakaian = this.state.daftarJenisPakaian;
    if (command == '+') {
      daftarJenisPakaian[index].jumlah++;
    } else {
      if (daftarJenisPakaian[index].jumlah > 0) {
        daftarJenisPakaian[index].jumlah--;
      }
    }
    this.hitungTotal();
    this.setState({daftarJenisPakaian});
  };

  hitungTotal = () => {
    let daftarJenisPakaian = this.state.daftarJenisPakaian;
    let total = 0;
    for (let i = 0; i < daftarJenisPakaian.length; i++) {
      total += daftarJenisPakaian[i].harga * daftarJenisPakaian[i].jumlah;
    }
    this.setState({total});
  };

  displayCheckout = () => {
    let daftarJenisPakaian = [...this.state.daftarJenisPakaian];
    for (let i = 0; i < daftarJenisPakaian.length; i++) {
      if (daftarJenisPakaian[i].jumlah == 0) {
        daftarJenisPakaian.splice(i--, 1);
      }
    }
    this.setState({cart: daftarJenisPakaian, totalModal: true});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="#fffff" backgroundColor="#3E61ED" />
        <View
          style={{
            backgroundColor: '#5778FF',
            elevation: 5,
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 15,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.pop()}>
            <Icon name="chevron-left" size={25} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Layanan Cuci</Text>
        </View>
        <FlatGrid
          itemDimension={130}
          data={this.state.daftarJenisPakaian}
          renderItem={({item, index}) => (
            <View
              style={{
                backgroundColor: '#5778FF',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 4,
                paddingVertical: 20,
                borderRadius: 5,
              }}>
              <Icon name={item.icon} size={50} color="#fff" />
              <Text style={styles.textTitle}>{item.nama}</Text>
              <Text style={styles.text}>
                Rp {item.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </Text>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => this.editQty('-', index)}>
                  <Icon name="minus-square" size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.text}>{item.jumlah}</Text>
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() => this.editQty('+', index)}>
                  <Icon name="plus-square" size={25} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <View
          style={{
            backgroundColor: '#5778FF',
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', paddingHorizontal: 10}}>
            Total :{' '}
            <Text style={{fontWeight: 'bold'}}>
              Rp{' '}
              {this.state.total
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </Text>
          </Text>
          <TouchableOpacity
            style={{backgroundColor: 'black', padding: 10, borderRadius: 5}}
            onPress={() => this.displayCheckout()}>
            <Text style={{color: 'white'}}>Selesai</Text>
          </TouchableOpacity>
        </View>

        <Modal isVisible={this.state.totalModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 5,
            }}>
            <Text
              style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
              Total
            </Text>
            <FlatGrid
              itemDimension={130}
              data={this.state.cart}
              renderItem={({item, index}) => (
                <View
                  style={{
                    backgroundColor: '#5778FF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 4,
                    paddingTop: 20,
                    paddingBottom: 10,
                    borderRadius: 5,
                  }}>
                  <Icon name={item.icon} size={50} color="#fff" />
                  <Text style={styles.textTitle}>{item.nama}</Text>
                  <Text style={styles.text}>
                    Rp{' '}
                    {item.harga
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </Text>
                  <Text
                    style={{color: 'white', fontWeight: 'bold', marginTop: 5}}>
                    {item.jumlah}
                  </Text>
                </View>
              )}
            />
            <View style={{marginBottom: 20}}>
              <TextInput
                style={{borderBottomWidth: 1, marginHorizontal: 20}}
                value={this.state.nama}
                placeholder="Masukkan Nama Anda Disini..."
                onChangeText={text => this.setState({nama: text})}
              />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  marginHorizontal: 20,
                  marginTop: 20,
                }}
                // value={this.state.alamat}
                placeholder="Masukkan Nama Anda Disini..."
                onChangeText={text => this.setState({alamat: text})}
              />
            </View>
            <Text
              style={{
                color: 'black',
                paddingHorizontal: 10,
                textAlign: 'center',
              }}>
              Total :{' '}
              <Text style={{fontWeight: 'bold'}}>
                Rp{' '}
                {this.state.total
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </Text>
            </Text>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: 'crimson',
                  padding: 10,
                  borderBottomLeftRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => this.setState({totalModal: false})}>
                <Text style={{color: 'white'}}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  borderBottomRightRadius: 5,
                }}
                onPress={() =>
                  this.setState({totalModal: false}, () =>
                    this.prosesTransaksi(),
                  )
                }>
                <Text style={{color: 'white'}}>Selesai</Text>
              </TouchableOpacity>
            </View>
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
