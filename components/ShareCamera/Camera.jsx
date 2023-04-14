import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { Camera } from 'expo-camera'

const CameraCapture = () => {
    const [hasCameraPermission, setCameraPermission] = useState(null)
    const [camera, setCamera] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setCameraPermission(status === 'granted')
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            setImage(data.uri)
        }
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
                <Camera ref={ref => setCamera(ref)} style={styles.fixedRatio} 
                type={type} 
                ratio={'4:3'} 
                />
            </View>
            <Button title="Take Picture" onPress={() => takePicture()} />
            {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
        </View>
    )
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 7/20
    }
})

export default CameraCapture;