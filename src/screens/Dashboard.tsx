import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

// Define TypeScript Interface for Sensor Data
interface SensorData {
  moisture: number;
  temperature: number;
}

const Dashboard = () => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:5000/api/data/sensor"); // Adjust for Android Emulator
        setSensorData(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch sensor data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh data every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View style={styles.card}>
          <Text style={styles.label}>🌱 Soil Moisture:</Text>
          <Text style={styles.value}>{sensorData?.moisture.toFixed(2)}%</Text>

          <Text style={styles.label}>🌡️ Temperature:</Text>
          <Text style={styles.value}>{sensorData?.temperature.toFixed(2)}°C</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f4f6f9" },
  title: { fontSize: 28, fontWeight: "bold", color: "#333", marginBottom: 20 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "90%", elevation: 5, alignItems: "center" },
  label: { fontSize: 18, fontWeight: "bold", color: "#555", marginTop: 10 },
  value: { fontSize: 22, fontWeight: "bold", color: "#007BFF" },
  error: { color: "red", fontSize: 16, marginTop: 10 },
});

export default Dashboard;
