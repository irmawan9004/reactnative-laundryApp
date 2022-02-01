import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatGrid} from 'react-native-super-grid';
import Modal from 'react-native-modal';

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
    };
  }

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
        <View style={{backgroundColor: '#5778FF', padding: 5}}>
          <Text style={{color: 'white', paddingHorizontal: 10}}>
            Total :{' '}
            <Text style={{fontWeight: 'bold'}}>
              Rp{' '}
              {this.state.total
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </Text>
          </Text>
        </View>
        <Modal isVisible={true}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Text>I am the modal content!</Text>
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
