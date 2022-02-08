import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jasa: [
        {
          namaJasa: 'Cuci Pakaian',
          description: 'Cuci Pakaian Bersih dan Wangi',
          icon: 'tshirt',
          route: 'Cuci',
        },
        {
          namaJasa: 'Setrika',
          description: 'Setrika Pakaian Kering dan Wangi',
          icon: 'fan',
          route: '',
        },
        {
          namaJasa: 'Sepatu',
          description: 'Cuci Sepatu Bersih dan Kinclong',
          icon: 'shoe-prints',
          route: '',
        },
        {
          namaJasa: 'Admin',
          description: 'Admin Laundry',
          icon: 'user',
          route: 'Admin',
        },
      ],
    };
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="#fffff" backgroundColor="#3E61ED" />
        <View style={{backgroundColor: '#5778FF', elevation: 5}}>
          <Text style={styles.title}>X Laundry</Text>
        </View>
        <FlatGrid
          itemDimension={130}
          data={this.state.jasa}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                backgroundColor: '#6886FE',
                paddingVertical: 20,
                height: 180,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderRadius: 5,
                elevation: 5,
              }}
              onPress={() => this.props.navigation.navigate(item.route)}>
              <Icon name={item.icon} size={50} color="#fff" />
              <Text style={{color: 'white', fontWeight: 'bold', marginTop: 20}}>
                {item.namaJasa}
              </Text>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                }}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Black',
    color: '#fff',
    paddingVertical: 10,
    textAlign: 'center',
  },
});
