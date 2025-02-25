import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

// Define navigation props for TypeScript
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://10.0.2.2:5000/api/auth/login", { email, password });

      await AsyncStorage.setItem("token", response.data.token);
      setLoading(false);
      navigation.replace("Dashboard"); // Navigate after login

    } catch (error: any) {
      setLoading(false);
      Alert.alert("Login Failed", error.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="user-lock" size={50} color="#007BFF" style={styles.icon} />
      <Text style={styles.title}>Welcome Back</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#007BFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#007BFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>
            <Icon name="sign-in-alt" size={18} color="#fff" /> Login
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>
        Don't have an account? <Text style={styles.boldText}>Sign Up</Text>
      </Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f6f9",
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default Login;
