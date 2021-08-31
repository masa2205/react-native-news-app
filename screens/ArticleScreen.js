import React from 'react';
import {StyleSheet, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {addClip, deleteClip} from '../store/actions/user';
import ClipButton from '../components/ClipButton';

export default ArticleScreen = ({route}) => {
  const {article} = route.params;

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const {clips} = user;

  const isClipped = () => {
    return clips.some(clip => clip.url === article.url);
  };

  const toggleClip = () => {
    if (isClipped()) {
      dispatch(deleteClip({clip: article}));
    } else {
      dispatch(addClip({clip: article}));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <ClipButton onPress={toggleClip} enabled={isClipped()} /> */}
      <TouchableOpacity
        onPress={() => {
          dispatch(addClip({clip: article}));
        }}>
        <Text style={{margin: 10, fontSize: 30}}>ADD_CLIP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(deleteClip({clip: article}));
        }}>
        <Text style={{margin: 10, fontSize: 30}}>DELETE_CLIP</Text>
      </TouchableOpacity>
      <WebView source={{uri: article.url}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
