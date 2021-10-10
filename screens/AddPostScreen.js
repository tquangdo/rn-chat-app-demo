import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useContext, useState } from 'react';
import {
    ActivityIndicator, Alert, Platform,
    StyleSheet, Text, View
} from 'react-native';
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../navigation/AuthProvider';
import {
    AddImage, InputField,
    InputWrapper, StatusWrapper, SubmitBtn,
    SubmitBtnText
} from '../styles/AddPost';

const AddPostScreen = () => {
    const { staUser } = useContext(AuthContext)

    const [staImage, setStaImage] = useState(null);
    const [staUploading, setStaUploading] = useState(false);
    const [staTransferred, setStaTransferred] = useState(0);
    const [staPost, setStaPost] = useState(null);

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            // console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setStaImage(imageUri);
        });
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            // console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setStaImage(imageUri);
        });
    };

    const submitPost = async () => {
        const imageUrl = await uploadImage();
        // console.log('Post: ', staPost);

        firestore()
            .collection('posts')
            .add({
                userId: staUser.uid,
                post: staPost,
                postImg: imageUrl,
                postTime: firestore.Timestamp.fromDate(new Date()),
                likes: null,
                comments: null,
            })
            .then(() => {
                // console.log('Post Added!');
                Alert.alert(
                    'Bài đã xuất bản!',
                    'Bài viết của bạn đã được xuất bản thành công!',
                );
                setStaPost(null);
            })
            .catch((error) => {
                alert('Đã xảy ra sự cố với bài đăng được thêm vào firestore: ' + error);
            });
    }

    const uploadImage = async () => {
        if (staImage == null) {
            return null;
        }
        const uploadUri = staImage;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        setStaUploading(true);
        setStaTransferred(0);

        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            // console.log(
            //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            // );
            setStaTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });

        try {
            await task;
            const url = await storageRef.getDownloadURL();
            setStaUploading(false);
            setStaImage(null);
            return url;
        } catch (e) {
            alert(e);
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <InputWrapper>
                {staImage != null ? <AddImage source={{ uri: staImage }} /> : null}

                <InputField
                    placeholder="Bạn đang nghĩ gì?"
                    multiline
                    numberOfLines={4}
                    value={staPost}
                    onChangeText={(content) => setStaPost(content)}
                />
                {staUploading ? (
                    <StatusWrapper>
                        <Text>{staTransferred} % hoàn thành!</Text>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </StatusWrapper>
                ) : (
                    <SubmitBtn onPress={submitPost}>
                        <SubmitBtnText>Đăng</SubmitBtnText>
                    </SubmitBtn>
                )}
            </InputWrapper>
            <ActionButton buttonColor="#2e64e5">
                <ActionButton.Item
                    buttonColor="#9b59b6"
                    title="Chụp ảnh"
                    onPress={takePhotoFromCamera}>
                    <Icon name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor="#3498db"
                    title="Chọn ảnh"
                    onPress={choosePhotoFromLibrary}>
                    <Icon name="md-images-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
};

export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});