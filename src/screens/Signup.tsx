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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Icon from "react-native-vector-icons/FontAwesome5";

// ✅ Define type for navigation
type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

const Signup: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);

    // ✅ Basic form validation
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Error", "All fields are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
        await axios.post("http://10.0.2.2:5000/api/auth/signup", { email, password });

      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => navigation.replace("Login") },
      ]);
    } catch (error: any) {
      Alert.alert("Signup Failed", error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="user-plus" size={50} color="#007BFF" style={styles.icon} />
      <Text style={styles.title}>Create Account</Text>

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

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#007BFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          <Text style={styles.buttonText}>
            <Icon name="user-plus" size={18} color="#fff" /> Sign Up
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? <Text style={styles.boldText}>Login</Text>
      </Text>
    </View>
  );
};

// ✅ Modern Styles
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

export default Signup;
