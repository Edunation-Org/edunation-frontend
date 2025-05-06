const config = {
  apis: {
    auth: {
      base: "auth",
      endpoints: {
        signup: "sign-up",
        login: "login",
        updateUser: "update-user",
        refresh: "refresh-token",
        forgotPassword: "forgot-password",
        resetPassword: "reset-password",
        completeProfile: "complete-profile",
      },
    },
    users: {
      cms: {
        base: "cms/users",
      },
      web: {
        base: "web/users",
        endpoints: {
          getWalletDetails: "wallet-details",
        },
      },
    },
    userProfiles: {
      base: "user-profiles",
    },
    courses: {
      cms: {
        base: "cms/courses",
        endpoints: {
          updateCourse: (id) => `${id}`,
        },
      },
      web: {
        base: "web/courses",
        endpoints: {
          getCourseById: (id) => `${id}`,
        },
      },
    },
    reservations: {
      web: {
        base: "web/reservations",
        endpoints: {
          updateReservation: (id) => `${id}`,
        },
      },
    },
    stripe: {
      base: "stripe",
      endpoints: {
        createCheckoutSession: "create-checkout-session",
      },
    },
  },
};

export default config;
