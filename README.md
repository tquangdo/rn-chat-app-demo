# rn-chat-app-demo 🐳

![Stars](https://img.shields.io/github/stars/tquangdo/rn-chat-app-demo?color=f05340)
![Issues](https://img.shields.io/github/issues/tquangdo/rn-chat-app-demo?color=f05340)
![Forks](https://img.shields.io/github/forks/tquangdo/rn-chat-app-demo?color=f05340)
[![Report an issue](https://img.shields.io/badge/Support-Issues-green)](https://github.com/tquangdo/rn-chat-app-demo/issues/new)

## demos app
![demo](screenshots/demo.gif)

## setting choose "photos" in ios simulator
- `ios/rnChatAppDemo/Info.plist`, add these codes:
```shell
	<key>NSPhotoLibraryUsageDescription</key>
	<string>Advertisement would like to store a photo.</string>
	<key>NSCameraUsageDescription</key>
	<string/>
```

## warning
- there is a warning like this: `EventEmitter.removeListener('change', ...): Method has been deprecated. Please instead use 'remove()' on the subscription returned by EventEmitter.addListener`
- the reason is due to `@react-native-community`
- `warning " > @react-native-community/async-storage@1.12.1" has incorrect peer dependency "react@^16.8"`
- reference: [stackoverflow](https://stackoverflow.com/a/69252029)