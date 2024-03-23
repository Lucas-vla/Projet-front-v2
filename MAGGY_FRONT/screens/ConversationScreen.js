import { useEffect, useRef, useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import Pusher from "pusher-js/react-native";
import { useSelector } from "react-redux";


const pusher = new Pusher("ebf3a2cca566dfc72216", { cluster: "eu" });
const BACKEND_ADDRESS = "http://10.20.2.112:3000";





export default function ConversationScreen({ navigation }) {

    const User = useSelector((state) => state.user.value);
    const scrollViewRef = useRef();
    const pseudo = User.pseudo;
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");




  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/users/${pseudo}`, { method: "PUT" });

    const subscription = pusher.subscribe("chat");

    subscription.bind("pusher:subscription_succeeded", () => {
      subscription.bind("message", handleReceiveMessage);
    });

    return () =>
      fetch(`${BACKEND_ADDRESS}/users/${pseudo}`, {
        method: "DELETE",
      });
  }, [pseudo]);

  const handleReceiveMessage = (data) => {
    setMessages((messages) => [...messages, data]);
  };

  const handleSendMessage = () => {
    if (!messageText) {
      return;
    }

    const payload = {
      text: messageText,
      pseudo: pseudo,
      createdAt: new Date(),
      id: Math.floor(Math.random() * 100000),
    };

    fetch(`${BACKEND_ADDRESS}/message`, {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(payload),
    });

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }

    setMessageText("");
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>


    <View style={styles.banner}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
  <FontAwesome name="arrow-left" size={30} color="#553DED" style={styles.fleche} />
</TouchableOpacity>
      <Text style={styles.greetingText}>Manon99</Text>
      <TouchableOpacity>
  <FontAwesome name="bars" size={30} color="#553DED" style={styles.fleche} />
</TouchableOpacity>
    </View>


    <View style={styles.inset}>
      <ScrollView ref={scrollViewRef} style={styles.scroller}>
        {messages.map((message, i) => (
          <View
            key={i}
            style={[
              styles.messageWrapper,

              {
                ...(message.pseudo === pseudo
                  ? styles.messageSent
                  : styles.messageRecieved),
              },
            ]}
          >
            <Text style={styles.messagePseudo}>{message.pseudo}</Text>
            <View
              style={[
                styles.message,

                {
                  ...(message.pseudo === pseudo
                    ? styles.messageSentBg
                    : styles.messageRecievedBg),
                },
              ]}
            >
              <Text
                style={[
                  styles.messageText,

                  {
                    ...(message.pseudo === pseudo
                      ? styles.messageSentText
                      : styles.messageReceivedText),
                  },
                ]}
              >
                {message.text}
              </Text>
            </View>

            <Text style={styles.timeText}>
              {new Date(message.createdAt).getHours()}:
              {String(new Date(message.createdAt).getMinutes()).padStart(
                2,

                "0"
              )}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(value) => setMessageText(value)}
          value={messageText}
          style={styles.input}
          autoFocus
        />

        <TouchableOpacity
          onPress={() => handleSendMessage()}
          style={styles.sendButton}
        >
          <FontAwesome name="send" color="#553DED" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#3B9D38",
      },

      inset: {
        flex: 1,
        borderTopLeftRadius: '20%',
        borderTopRightRadius: '20%',
        backgroundColor: "#FAF4E3",
        width: "100%",
        paddingTop: 20,
        position: "relative",
      },

      banner: {
        width: "100%",
        height: "15%",
        paddingTop: 20,
        paddingLeft: '5%',
        paddingRight: '5%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },

      greetingText: {
        color: "#F474D0",
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: 15,
      },

      message: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 24,
        alignItems: "flex-end",
        justifyContent: "center",
        maxWidth: "65%",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6.41,
        elevation: 1.2,
      },

      messageWrapper: {
        alignItems: "flex-end",
        marginBottom: 20,
      },

      messageRecieved: {
        alignSelf: "flex-start",
        alignItems: "flex-start",
      },

      messagePseudo: {
        textDecorationStyle: "solid",
        fontStyle: "italic",
        marginBottom: 7,
      },
      messageSent: {
        alignSelf: "flex-end",
        alignItems: "flex-end",
      },

      messageSentBg: {
        backgroundColor: "#007BFF",
        color: "black",
      },

      messageSentText: {
        color: "white",
      },
      messageReceivedText: {
        color: "black",
      },

      messageRecievedBg: {
        backgroundColor: "#E0E0E0",
      },

      messageText: {
        fontWeight: "400",
      },

      timeText: {
        color: "orange",
        opacity: 0.5,
        fontSize: 10,
        marginTop: 2,
      },

      inputContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        justifySelf: "flex-end",
        alignContent: "flex-start",
        marginBottom: 30,
        marginTop: "auto",
        background: "transparent",
        paddingLeft: 20,
        paddingRight: 20,
      },

      input: {
        backgroundColor: "orange",
        width: "85%",
        padding: 15,
        borderRadius: '20%',
        elevation: 1.2,
      },

      sendButton: {
        padding: 15,
        marginLeft: 12,
        alignItems: "center",
        justifyContent: "center",
        elevation: 1.2,
      },

      buttonText: {
        color: "#553DED",
        fontWeight: "800",
        textTransform: "uppercase",
      },

      scroller: {
        paddingLeft: 20,
        paddingRight: 20,
      },
    });
