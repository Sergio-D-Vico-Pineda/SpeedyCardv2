import { View, Text, Image } from 'react-native';
import { styles } from '../../styles/Settings.styles';

export default function AboutSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About</Text>
      <View style={styles.sectionContent}>
        <View style={styles.aboutHeader}>
          <Image
            source={require('@/assets/images/logo-icon.png')}
            style={styles.aboutLogo}
          />
          <Text style={styles.aboutTitle}>About SpeedyCard</Text>
        </View>
        <View style={styles.aboutContent}>
          <Text style={styles.aboutSectionTitle}>Our Mission</Text>
          <Text style={styles.aboutText}>
            SpeedyCard is dedicated to providing fast and efficient card management solutions.{"\n"}
            We strive to make digital card organization simple and accessible for everyone.{"\n"}
            By going digital, we help reduce paper waste and protect our environment.
          </Text>
          <Text style={styles.aboutSectionTitle}>Contact Us</Text>
          <Text style={styles.aboutText}>
            Email: servicpin2@alu.edu.gva.es{"\n"}
            Phone: +34 123 456 789{"\n"}
            Address: Av. Ciudad León de Nicaragua, 8, 03015 Alicante, Spain
          </Text>
        </View>
      </View>
    </View>
  );
}