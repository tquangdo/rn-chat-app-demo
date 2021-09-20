import firestore from '@react-native-firebase/firestore';
// import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../navigation/AuthProvider';
import {
    Card, Divider, Interaction,
    InteractionText, InteractionWrapper, PostImg, PostText, PostTime, UserImg, UserInfo, UserInfoText, UserName
} from '../styles/FeedStyles';
// import ProgressiveImage from './ProgressiveImage';

const PostCard = ({ propItem, propOnDelete, propOnPress }) => {
    // const { staUser } = useContext(AuthContext);
    // const [staUserData, setStaUserData] = useState(null);

    likeIcon = propItem.liked ? 'heart' : 'heart-outline';
    likeIconColor = propItem.liked ? '#2e64e5' : '#333';

    if (propItem.likes == 1) {
        likeText = '1 Like';
    } else if (propItem.likes > 1) {
        likeText = propItem.likes + ' Likes';
    } else {
        likeText = 'Like';
    }

    if (propItem.comments == 1) {
        commentText = '1 Comment';
    } else if (propItem.comments > 1) {
        commentText = propItem.comments + ' Comments';
    } else {
        commentText = 'Comment';
    }

    // const _getUser = async () => {
    //     await firestore()
    //         .collection('users')
    //         .doc(propItem.userId)
    //         .get()
    //         .then((documentSnapshot) => {
    //             if (documentSnapshot.exists) {
    //                 console.log('User Data', documentSnapshot.data());
    //                 setStaUserData(documentSnapshot.data());
    //             }
    //         });
    // };

    // useEffect(() => {
    //     _getUser();
    // }, []);

    // CHU Y!!!
    // Error: Objects are not valid as a React child(found: object with keys { }). If you meant to render a collection of children, use an array instead
    // ==> day la loi {propItem.xxx} co value sai, VD {}, la object!!!
    return (
        <Card key={propItem.id}>
            <UserInfo>
                <UserImg
                    // source={{
                    //     uri: staUserData
                    //         ? staUserData.userImg ||
                    //         'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                    //         : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                    // }}
                    source={propItem.userImg}
                />
                <UserInfoText>
                    {/* <TouchableOpacity propOnPress={propOnPress}> */}
                    <UserName>
                        {/* {staUserData ? staUserData.fname || 'Test' : 'Test'}{' '}
                            {staUserData ? staUserData.lname || 'User' : 'User'} */}
                        {propItem.userName}
                    </UserName>
                    {/* </TouchableOpacity> */}
                    {/* <PostTime>{moment(propItem.postTime.toDate()).fromNow()}</PostTime> */}
                    <PostTime>{propItem.postTime}</PostTime>
                </UserInfoText>
            </UserInfo>
            <PostText>{propItem.post}</PostText>
            {/* {propItem.postImg != null ? (
                <ProgressiveImage
                    defaultImageSource={require('../assets/default-img.jpg')}
                    source={{ uri: propItem.postImg }}
                    style={{ width: '100%', height: 250 }}
                    resizeMode="cover"
                />
            ) : (
                <Divider />
            )} */}
            {propItem.postImg != 'none' ? (
                <PostImg source={propItem.postImg} />
            ) : (
                <Divider />
            )}

            <InteractionWrapper>
                <Interaction active={propItem.liked}>
                    <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                    <InteractionText active={propItem.liked}>{likeText}</InteractionText>
                </Interaction>
                <Interaction>
                    <Ionicons name="md-chatbubble-outline" size={25} />
                    <InteractionText>{commentText}</InteractionText>
                </Interaction>
                {/* {staUser.uid == propItem.userId ? (
                    <Interaction propOnPress={() => propOnDelete(propItem.id)}>
                        <Ionicons name="md-trash-bin" size={25} />
                    </Interaction>
                ) : null} */}
            </InteractionWrapper>
        </Card>
    );
};

export default PostCard