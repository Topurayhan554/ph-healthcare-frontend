const prefix = "/patient";
export const patientRoutes = [
  {
    title: "Analytics",
    url: "#",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
    ],
  },
  {
    title: "Appointments",
    url: "#",
    items: [
      {
        title: "Book Appointment",
        url: `${prefix}/appointments/book`,
      },
    ],
  },
  {
    title: "Payments",
    url: "#",
    items: [
      {
        title: "Payment History",
        url: `${prefix}/payments`,
      },
    ],
  },
  {
    title: "Profile",
    url: "#",
    items: [
      {
        title: "My Profile",
        url: `${prefix}/profile`,
      },
      {
        title: "Update Profile",
        url: `${prefix}/profile/update`,
      },
    ],
  },
];
