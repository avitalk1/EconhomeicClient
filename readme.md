## Running The app on local android device 
open terminal and navigate to project folder and run 

```bash
npx react-native start 
```

(npx react-native start --reset-cache)

open another terminal and navigate to project folder and run

```bash
npx react-native run-android
```
**********************************
if we have an error with gradlew :
cd android 
mac : chmod 755 gradlew
      ./gradlew clean
windows: gradlew clean
cd ..
npx react-native run-android
**********************************
## Installing a Package

```bash
npm install package-name
```

after installing the package run this command 

```bash
npx react-native link package-name
```