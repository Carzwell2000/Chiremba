export type RootStackParamList = {
    DoctorsScreen: undefined;
    BookAppointment: {
        doctorName: string;
        doctorId: string; // ✅ Add this line
    };
    // other screens...
};

