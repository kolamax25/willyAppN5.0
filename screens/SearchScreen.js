import React from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import db from '../config.js';

export default class Searchscreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allTransactions: [],
      lastVisibleTransaction: null,
      search: '',
    };
  }

  fetchMoreTransactions = async () => {
    var text = this.state.search.toUpperCase();
    var enteredText = text.split('');

    if (enteredText[0].toUpperCase() === 'B') {
      const query = await db
        .collection('transactions')
        .where('bookID', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();
      query.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    }

    if (enteredText[0].toUpperCase() === 'S') {
      const query = await db
        .collection('transactions')
        .where('studentId', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();
      query.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    }
  };

  searchTransactions = async (text) => {
    var enteredText = text.split('');
    if (enteredText[0].toUpperCase() === 'B') {
      const transaction = await db
        .collection('transactions')
        .where('bookID', '==', text)
        .get();
      transaction.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    }
    if (enteredText[0].toUpperCase() === 'S') {
      const transaction = await db
        .collection('transactions')
        .where('stdentId', '==', text)
        .get();
      transaction.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.InputBox}
            placeholder="Search bookID or studentId"
            value={this.state.scannedBookId}
            onChangeText={(text) => {
              this.setState({
                search: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => {
              this.searchTransactions(this.state.search);
            }}>
            <Text style={styles.buttonText}>SEARCH</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.allTransactions}
          renderItem={({ item }) => (
            <View style={{ borderBottomWidth: 2 }}>
              <Text> {'Book Id : ' + item.bookID}</Text>
              <Text> {'Student Id : ' + item.studentId}</Text>
              <Text> {'Transaction type :' + item.transactionType}</Text>
              <Text> {'Date :' + item.date.toDate()}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.fetchMoreTransactions}
          onEndReachedThreshold={0.6}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    width: 100,

    borderWidth: 0.5,
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  inputBox: {
    borderWidth: 2,

    height: 30,
    width: 300,
    paddingLeft: 10,
  },
  searchButton: {
    borderWidth: 1,
    height: 30,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  buttonText: {
    fontSize: 20,
  },
});
