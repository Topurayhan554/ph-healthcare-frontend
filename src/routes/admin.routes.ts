const prefix = "/admin";
export const adminRoutes = [
  {
    title: "Management",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: `${prefix}`,
      },
      {
        title: "Doctor Approval",
        url: `${prefix}/approve-doctor`,
      },
      {
        title: "All Doctors",
        url: `${prefix}/doctors`,
      },
      {
        title: "All Schedules",
        url: `${prefix}/schedules`,
      },
      {
        title: "All Payments",
        url: `${prefix}/payments`,
      },
    ],
  },
  {
    title: "Profile",
    url: "#",
    items: [
      {
        title: "Update Profile Image",
        url: `${prefix}/profile`,
      },
    ],
  },
];
