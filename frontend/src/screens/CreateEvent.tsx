import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import styled from "styled-components";
import useThemeContext from "~/hooks/useThemeContext";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Animated, {
    Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "react-native-paper";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const IMG_HEIGHT = 300;

type createEvent = {
  eventName: string;
  date: Date;
  time: Date;
  location: string;
  tags: string;
  description: string;
};

export default function CreateEvent() {
  const { theme } = useThemeContext();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffSet = useScrollViewOffset(scrollRef);

  // React Hook Related
  const schema = zod.object({
    eventName: zod.string(),
    date: zod.date(),
    time: zod.date(),
    location: zod.string(),
    tags: zod.string(),
    description: zod.string(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createEvent>({
    defaultValues: {
      eventName: "",
      date: new Date(),
      time: new Date(),
      location: "",
      tags: "",
      description: "",
    },
    resolver: zodResolver(schema),
  });

  //Functions
  const onSubmit = (data: createEvent) => {
    console.log(data);
  };
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffSet.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffSet.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [3, 1, 1],
          ),
        },
      ],
    };
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}  
      style={{flex:1}}
    >
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          style={{ height: "100%", backgroundColor: "white", }}
          scrollEventThrottle={16}
        >
        <View>
          <Animated.Image
            source={require("~/assets/images/lightGreyImage.png")}
            style={[{
                width: "100%",
                height: 250,
                
            },imageAnimatedStyle]}>
          </Animated.Image>
          <AntDesign
              style={{position:"absolute", marginLeft:"90%", marginBottom: 10, marginTop:200 }}
              name="upload"
              size={24}
              color="black"
            />
        </View >
        <View style={{backgroundColor:"white"}}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ marginTop: 10, marginBottom: 15 }}>
                  <Text style={{ marginLeft: 20, marginBottom:3, fontFamily:"Nunito-Medium", fontSize:16 }}>Event Name*</Text>
                  <EventNameInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="eventName"
            /> 
        </View>
            {/* <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View   style={{
                    flexDirection: "row",
                    height: 30,
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 25,
                    marginBottom:15
                  }}>
                    <Text style={{ marginLeft: 20, fontFamily:"Nunito-Medium", fontSize:16 }}>Date *</Text>
                    <DateTimePicker
                    style={{ marginRight: 10 }}
                    value={value}
                    mode={"date"}
                    is24Hour={true}
                    onChange={(event, date) => {
                        onChange(date);
                    }}
                    />
                </View>
              )}
              name="date"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View  style={{
                    flexDirection: "row",
                    height: 30,
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 25,
                    marginBottom:15
                  }}>
                    <Text style={{ marginLeft: 20, fontFamily:"Nunito-Medium", fontSize:16 }}>Time*</Text>
                    <DateTimePicker
                    style={{ marginRight: 10 }}
                    value={value}
                    mode={"time"}
                    is24Hour={true}
                    onChange={(event, time) => {
                        onChange(time);
                    }}
                    />
                </View>
              )}
              name="time"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{marginBottom:15}}>
                  <Text style={{ marginLeft: 20, marginBottom:3, fontFamily:"Nunito-Medium", fontSize:16 }}>Location*</Text>
                  <TextInput
                    style={{
                      width: 350,
                      height: 50,
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: "grey",
                      padding: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="location"
            />
       

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{marginBottom:15}}>
                  <Text style={{ marginLeft: 20,  marginBottom:3, fontFamily:"Nunito-Medium", fontSize:16 }}>Tags*</Text>
                  <TextInput
                    style={{
                      width: 350,
                      height: 50,
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: "grey",
                      padding: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="tags"
            />
       
          
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text style={{ marginLeft: 20,  marginBottom:3, fontFamily:"Nunito-Medium", fontSize:16 }}>Event Description:*</Text>
                  <EventTextInput
                    multiline={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="description"
            />
        </View>
          <View style={{ marginBottom: 15, marginTop: 15}}>
            <Button style={{backgroundColor:"", width:300, marginLeft:"auto", marginRight:"auto"}} onPress={handleSubmit(onSubmit)}>Submit</Button>
          </View> */}
        </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
}


const EventTextInput = styled(TextInput)`
  textAlignVertical: top;
  width: 350px;
  height: 100px;
  borderWidth: 1px;
  borderRadius: 8px;
  borderColor:grey;
  padding: 10px;
  marginLeft: auto;
  marginRight: auto;
`;

const EventNameInput = styled(TextInput)`
    width: 350px;
    height: 50px;
    borderWidth: 1px;
    borderRadius: 8px;
    borderColor: grey;
    padding: 10px;
    marginLeft: auto;
    marginRight: auto;
`

