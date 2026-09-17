const prefix = "/doctor";
export const doctorRoutes = [
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
    title: "Schedule",
    url: "#",
    items: [
      {
        title: "My Schedules",
        url: `${prefix}/schedules`,
      },
      {
        title: "Create Schedule",
        url: `${prefix}/schedules/create`,
      },
    ],
  },
  {
    title: "Prescriptions",
    url: "#",
    items: [
      {
        title: "Create Prescription",
        url: `${prefix}/prescriptions/create`,
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
