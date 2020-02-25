/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { todoRef } from './config/firebaseConfig'
const arrData = [1, 1, 1, 1, 1, 1, 1, 1];
const App: () => React$Node = () => {


  // chỉ cần hiểu 2 hàm add, remove, update của firebase 



  const [value, setValue] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(todoRef);
  useEffect(() => {
    onFetchFirtime(); // gọi khi bắt đầu  click button fetch 
  }, [])
  const onFetchFirtime = () => {
    todoRef.once("value").then(shapShot => {   // hàm bắt buộc để fetch data 1 lần từ firebase // đđọc trên docs của firebase 
      let data = shapShot.val() ? shapShot.val() : {};
      let todos = { ...data };
      const arrr = Object.keys(todos).map((key) => {
        return {
          todo: todos[key].todo,
          key,
          isEdit: false
        }
      })
      setList(arrr);
      setLoading(false);
    })
  }
  useEffect(() => {

    todoRef.on("value", shapShot => {// hàm bắt buộc để lắng nghe sự kiện khi thay đôi (add, remove, edit) // đọc trên docs của firebase 
      let data = shapShot.val() ? shapShot.val() : {};
      let todos = { ...data };
      const arrr = Object.keys(todos).map((key) => {
        return {
          todo: todos[key].todo,
          key,
          isEdit: false
        }
      })
      setList(arrr)
    });
    return () => todoRef.off("value", shapShot => {  // remove event  lăng nghe sự kiên thay đổi của fire để không bị  rerender never stop 
      let data = shapShot.val() ? shapShot.child().child() : {};
      todos = { ...data };
    })
    // return () => todoRef.off('value', listener);
  }, [ref.current]);




  // todoRef.once('value').then((snapshot) => {
  //   console.log("value shapshot ", snapshot.val());
  // })
  // todoRef.on("value", snapshot => {
  //   console.log("snapshot ", snapshot.val())
  // })
  const onSetValues = (value) => {
    setValue(value); // onchangeText của input 
  }
  const onAddTodo = () => {
    todoRef.push({
      todo: value
    }).then(() => setValue(''))
  }
  const editTask = (item, index) => {
    const _tempList = [...list];
    setValue(item.todo)
    _tempList[index].isEdit = true;
    setList(_tempList); // find item của list để isEdit = true => để edit được 
  }
  const onOk = (key) => {
    todoRef.child("/" + key).update({ todo: value }).then(() => {  // hàm của firebase dể update/ đọc trên docs 
      setValue('')
    })
  }
  const removeTask = (index, key) => {
    todoRef.child("/" + key).remove((err) => {  // same above
      if (!err) {

      }
    })
  }
  if (loading) {
    return <ActivityIndicator size={25} style={{ marginTop: 100 }} ></ActivityIndicator>
  }
  return (
    <View style={{ flex: 1, marginTop: 100, marginHorizontal: 20 }}>
      <TouchableOpacity
        onPress={() => {
          setLoading(true)
        }}
        style={{ height: 40 }}
        onPress={() => {
          setLoading(true)
        }}><Text>Fetch</Text></TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ height: 40, width: 60, backgroundColor: "coral" }}
          onPress={onAddTodo}><Text>Add</Text></TouchableOpacity>
        <TextInput
          onChangeText={onSetValues}
          style={{ height: 40, flex: 1, borderRadius: 5, backgroundColor: "#ceccec", color: "coral", padding: 5 }}></TextInput>
      </View>
      <FlatList
        data={list}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          return (<View style={{ marginVertical: 10, borderRadius: 5, flexDirection: "row" }}
          >
            <TextInput
              editable={item.isEdit}
              onChangeText={onSetValues}
              style={{ height: 40, flex: 1, borderRadius: 5, backgroundColor: item.isEdit ? "#eeeeee" : "#37474f", color: item.isEdit ? '#000' : "#ffebee", padding: 10, fontWeight: "bold" }}
              value={item.isEdit ? value : item.todo} />
            {!item.isEdit ? <TouchableOpacity style={{ height: 40, width: 60, alignItems: "center", justifyContent: "center", backgroundColor: "#eeeeee", borderRadius: 5, marginLeft: 10 }} onPress={() => {
              editTask(item, index);
            }}>
              <Text style={{ fontWeight: "bold", color: "#039be5" }}>Edit</Text></TouchableOpacity> : <TouchableOpacity style={{ height: 40, width: 60, alignItems: "center", justifyContent: "center", backgroundColor: "#eeeeee", borderRadius: 5, marginLeft: 10 }} onPress={() => {
                onOk(item.key);
              }}>
                <Text style={{ fontWeight: "bold", color: "#039be5" }}>Ok</Text></TouchableOpacity>}
            <TouchableOpacity style={{ height: 40, width: 60, alignItems: "center", justifyContent: "center", backgroundColor: "#cfd8dc", borderRadius: 5, marginLeft: 10 }} onPress={() => {
              removeTask(index, item.key);
            }}>
              <Text style={{ fontWeight: "bold", color: "#e57373" }}>Remove</Text></TouchableOpacity>
          </View>)
        }}
      >
      </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
