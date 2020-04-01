// Import tokens
import tokens from "./tokens"

// Define configuration object
const config = {
    all: {
        app_details: {
            name: {
                short: "AIMB",
                long: "Analiza Imobiliarelor din București"
            }
        },
        loading: {
            delay: 3000
        },
        logo: {
            black_source: "images/logo/black.png",
            white_source: "images/logo/white.png"
        },
        secrets: {
            mapbox_token: tokens.mapbox
        },
        toasts: {
            titles: {
                notification: "Notificare",
                alert: "Alertă",
                error: "Eroare"
            },
            time_caption: "acum cateva secunde",
            duration: 3000
        }
    },
    dashboard: {
        map: {
            default_viewport: {
                latitude: 44.4325,
                longitude: 26.103889,
                zoom: 11.5
            }
        },
        menu: {
            items: {
                    alerts: "Alerte de Preț",
                    logout: "Ieșire"
                }
        },
        table: {
            column_names: [
                {
                    name: "Nume",
                    sortable: false
                },
                {
                    name: "Pret Mediu",
                    sortable: true
                },
                {
                    name: "Calitatea Medie a Aerului",
                    sortable: true
                },
                {
                    name: "Overall Score",
                    sortable: true
                }
            ]
        }
    },
    loading: {
        animation: {
            duration: "1s",
            delay: "2s"
        }
    },
    log_gate: {
        animation: {
            duration: "2s",
            delay: "0s"
        },
        background_video: {
            source: "video/timelapse.mp4"
        }
    },
    login: {
        button: {
            text: "Conectați-vă"
        },
        inputs: [
            {
                type: "text",
                verified_type: "email",
                name: "email",
                placeholder: "Adresă de Email"
            },
            {
                type: "password",
                verified_type: "password",
                name: "password",
                placeholder: "Parolă"
            }
        ],
        labels: {
            first_part: "Dacă nu aveți un cont, vă rugăm să vă înregistrați ",
            link_part: "aici",
            last_part: "."
        },
        toasts: {
            bodies: {
                welcome: "Vă rugăm să introduceți credentialele contului dumneavoastră.",
                credentials_error: "Credentialele introduse nu respectă regulile de validare."
            }
        }
    },
    register: {
        button: {
            text: "Înregistrați-vă"
        },
        inputs: [
            {
                type: "text",
                verified_type: "name",
                name: "full_name",
                placeholder: "Nume Complet"
            },
            {
                type: "text",
                verified_type: "email",
                name: "email",
                placeholder: "Adresă de Email"
            },
            {
                type: "password",
                verified_type: "password",
                name: "password",
                placeholder: "Parolă"
            }
        ],
        labels: {
            first_part: "Dacă aveți deja un cont, vă rugăm să îl folosiți pentru autentificare ",
            link_part: "aici",
            last_part: "."
        },
        toasts: {
            bodies: {
                welcome: "Vă rugăm să introduceți datele noului cont.",
                credentials_error: "Datele introduse nu respectă regulile de validare."
            }
        }
    }
}

// Export
export default config