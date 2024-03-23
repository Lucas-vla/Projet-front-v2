import { Camera, CameraType, FlashMode } from 'expo-camera'
import { useEffect, useState, useRef } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import AddArticle from './AddArticleScreen';



export default function CameraScreen({ onPictureTaken }) {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const [hasPermission, setHasPermission] = useState(false)
  const [type, setType] = useState(CameraType.back)
  const [flashMode, setFlashMode] = useState(FlashMode.off)
  let cameraRef = useRef(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const takePicture = async () => {
    // base64: true -> Voir doc: https://docs.expo.dev/versions/latest/sdk/camera/#takepictureasyncoptions
    const photo = await cameraRef.takePictureAsync({ quality: 0.3, base64: true })
    onPictureTaken(photo)

    //  dispatch(
    //    addPhoto(photo)
    //  )

    //  navigation.goBack()
  }

  if (!hasPermission || !isFocused) {
    return <View />
  }
  return (
    <Camera type={type} flashMode={flashMode} ref={(ref) => cameraRef = ref} style={styles.camera}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddArticle')}>
          <FontAwesome name='times' size={30} color='#ffffff' style={styles.deleteIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
          style={styles.button}
        >
          <FontAwesome name='rotate-right' size={25} color='#ffffff' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)}
          style={styles.button}
        >
          <FontAwesome name='flash' size={25} color={flashMode === FlashMode.off ? '#ffffff' : '#e8be4b'} />
        </TouchableOpacity>
      </View>

      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => cameraRef && takePicture()}>
          <FontAwesome name='circle-thin' size={95} color='#ffffff' />
        </TouchableOpacity>
      </View>
    </Camera>
  )
}

const styles = StyleSheet.create({

  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 30,
    marginTop: 130,

  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 55,
  },


})
