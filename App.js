import React, { Component } from 'react';
import { Text, TextInput, FlatList, View, TouchableHighlight, Icon } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { ListItem } from 'native-base'
import axios from 'axios';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            todos: [],

        }
    }

    handleInsertData() {
        // alert("Ganteg")
        const titletext = {
            userId: 1,
            title: this.state.text,
            completed: false
        }
        axios.post('https://jsonplaceholder.typicode.com/todos/', { titletext })
            .then((res) => {
                let todo = this.state.todos.concat(titletext)
                this.setState({
                    todos: todo
                })
                console.log(res);
                console.log(this.state.todos)
                console.log(this.state.text)
                this.setState({
                    text: ''
                })
            })
    }

    handleDeleteData(id) {
        axios.delete('https://jsonplaceholder.typicode.com/todos/' + id)
            .then((res) => {
                const index = this.state.todos.slice();
                index.splice(id, 1);
                this.setState({todos: index})
                console.log(res);
                console.log('Berhasil Dihapus');
            })
    }



    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos/')
            .then(res => {
                const todos = res.data;
                console.log(res.data)
                this.setState({ todos })
            })

    }




    render() {
        return (
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput placeholder='Enter the Title' style={{ borderBottomColor: '#303A52' }} onChangeText={(text) => this.setState({ text })} value={this.state.text} />
                <Button
                    title='SUBMIT'
                    style={{ height: 40 }}
                    backgroundColor='#303A52'
                    onPress={() => this.handleInsertData()}
                >
                </Button>
                <FlatList
                    inverted={true}
                    style={{ margin: 17 }}
                    data={this.state.todos}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <ListItem>
                            <TouchableHighlight onLongPress={() => this.handleDeleteData(index)}>
                                <Text>{item.title}</Text>
                            </TouchableHighlight>
                        </ListItem>

                    )}
                />
            </View>
        )
    }
}