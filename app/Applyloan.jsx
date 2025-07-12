import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Alert,
    Switch,
    Platform,
    TouchableOpacity, // For custom pickers
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // You'll need to install this

const LoanApplicationForm = () => {
    // Personal Information
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(''); // YYYY-MM-DD
    const [idNumber, setIdNumber] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('single'); // Default value

    // Address Information
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState(''); // e.g., Mashonaland West
    const [postalCode, setPostalCode] = useState('');

    // Employment Information
    const [employmentStatus, setEmploymentStatus] = useState('employed'); // Default value
    const [employerName, setEmployerName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [payday, setPayday] = useState(''); // Day of the month

    // Loan Information
    const [loanAmount, setLoanAmount] = useState('');
    const [loanPurpose, setLoanPurpose] = useState('');
    const [repaymentPeriod, setRepaymentPeriod] = useState(''); // in months

    // Declarations & Consent
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [privacyConsent, setPrivacyConsent] = useState(false);

    const handleSubmit = () => {
        // Basic validation (you'd want more robust validation in a real app)
        if (
            !fullName ||
            !email ||
            !phoneNumber ||
            !dateOfBirth ||
            !idNumber ||
            !streetAddress ||
            !city ||
            !province ||
            !postalCode ||
            !employerName ||
            !jobTitle ||
            !monthlyIncome ||
            !payday ||
            !loanAmount ||
            !loanPurpose ||
            !repaymentPeriod ||
            !agreedToTerms ||
            !privacyConsent
        ) {
            Alert.alert('Validation Error', 'Please fill in all required fields and agree to the terms.');
            return;
        }

        // Prepare data for submission
        const formData = {
            personalInfo: {
                fullName,
                email,
                phoneNumber,
                dateOfBirth,
                idNumber,
                maritalStatus,
            },
            addressInfo: {
                streetAddress,
                city,
                province,
                postalCode,
            },
            employmentInfo: {
                employmentStatus,
                employerName,
                jobTitle,
                monthlyIncome: parseFloat(monthlyIncome),
                payday: parseInt(payday, 10),
            },
            loanInfo: {
                loanAmount: parseFloat(loanAmount),
                loanPurpose,
                repaymentPeriod: parseInt(repaymentPeriod, 10),
            },
            consent: {
                agreedToTerms,
                privacyConsent,
            },
        };

        console.log('Loan Application Data:', formData);
        Alert.alert('Success', 'Loan application submitted! (Check console for data)');

        // In a real application, you would send 'formData' to your backend API here
        // Example: fetch('YOUR_API_ENDPOINT', { method: 'POST', body: JSON.stringify(formData) });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Loan Application</Text>

            {/* Personal Information */}
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number (e.g., +263771234567)"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Date of Birth (YYYY-MM-DD)"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
            />
            <TextInput
                style={styles.input}
                placeholder="ID/Passport Number"
                value={idNumber}
                onChangeText={setIdNumber}
            />

            <Text style={styles.label}>Marital Status:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={maritalStatus}
                    onValueChange={(itemValue) => setMaritalStatus(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Single" value="single" />
                    <Picker.Item label="Married" value="married" />
                    <Picker.Item label="Divorced" value="divorced" />
                    <Picker.Item label="Widowed" value="widowed" />
                </Picker>
            </View>

            {/* Address Information */}
            <Text style={styles.sectionTitle}>Address Information</Text>
            <TextInput
                style={styles.input}
                placeholder="Street Address"
                value={streetAddress}
                onChangeText={setStreetAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={setCity}
            />
            <TextInput
                style={styles.input}
                placeholder="Province (e.g., Mashonaland West)"
                value={province}
                onChangeText={setProvince}
            />
            <TextInput
                style={styles.input}
                placeholder="Postal Code"
                value={postalCode}
                onChangeText={setPostalCode}
                keyboardType="numeric"
            />

            {/* Employment Information */}
            <Text style={styles.sectionTitle}>Employment Information</Text>
            <Text style={styles.label}>Employment Status:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={employmentStatus}
                    onValueChange={(itemValue) => setEmploymentStatus(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Employed" value="employed" />
                    <Picker.Item label="Self-Employed" value="self-employed" />
                    <Picker.Item label="Unemployed" value="unemployed" />
                    <Picker.Item label="Student" value="student" />
                    <Picker.Item label="Retired" value="retired" />
                </Picker>
            </View>

            {employmentStatus === 'employed' || employmentStatus === 'self-employed' ? (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Employer/Business Name"
                        value={employerName}
                        onChangeText={setEmployerName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Job Title / Occupation"
                        value={jobTitle}
                        onChangeText={setJobTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Gross Monthly Income (ZWL)"
                        value={monthlyIncome}
                        onChangeText={setMonthlyIncome}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Monthly Payday (Day of month, e.g., 25)"
                        value={payday}
                        onChangeText={setPayday}
                        keyboardType="numeric"
                    />
                </>
            ) : null}

            {/* Loan Information */}
            <Text style={styles.sectionTitle}>Loan Information</Text>
            <TextInput
                style={styles.input}
                placeholder="Desired Loan Amount (ZWL)"
                value={loanAmount}
                onChangeText={setLoanAmount}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Purpose of Loan (e.g., Home Renovation, Business Capital)"
                value={loanPurpose}
                onChangeText={setLoanPurpose}
            />
            <TextInput
                style={styles.input}
                placeholder="Desired Repayment Period (Months, e.g., 12, 24)"
                value={repaymentPeriod}
                onChangeText={setRepaymentPeriod}
                keyboardType="numeric"
            />

            {/* Declarations & Consent */}
            <Text style={styles.sectionTitle}>Declarations & Consent</Text>
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>I agree to the Terms and Conditions</Text>
                <Switch
                    onValueChange={setAgreedToTerms}
                    value={agreedToTerms}
                />
            </View>
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>I consent to my data being processed as per the Privacy Policy</Text>
                <Switch
                    onValueChange={setPrivacyConsent}
                    value={privacyConsent}
                />
            </View>

            <Button title="Submit Application" onPress={handleSubmit} />

            <View style={{ height: 50 }} /> {/* Spacer at the bottom */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
        color: '#333',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 15,
        color: '#555',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        fontWeight: '500',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    pickerContainer: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#fff',
        overflow: 'hidden', // Ensures picker stays within bounds
    },
    picker: {
        height: 50,
        width: '100%',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    switchLabel: {
        fontSize: 15,
        flex: 1,
        marginRight: 10,
        color: '#333',
    },
});

export default LoanApplicationForm;