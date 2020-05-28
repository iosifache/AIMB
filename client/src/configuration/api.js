// Define configuration object
const config = {
    details: {
        host: "http://192.168.0.10",
        port: "3001"
    },
    routes: {
        home: "/",
        login: "/login",
        register: "/register",
        logout: "/logout",
        get_sectors_data: "/get_sectors_data",
        get_alerts: "/get_alerts",
        create_alert: "/create_alert",
        remove_alert: "/remove_alert"
    }
}

// Export
export default config