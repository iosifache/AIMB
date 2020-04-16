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
            delay: 0
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
            },
            pinned_locations: [
                {
                    name: "Sector I",
                    latitude: 44.455602,
                    longitude: 26.073696
                },
                {
                    name: "Sector II",
                    latitude: 44.448600,
                    longitude: 26.127491
                },
                {
                    name: "Sector III",
                    latitude: 44.420707,
                    longitude: 26.136354
                },
                {
                    name: "Sector IV",
                    latitude: 44.421354,
                    longitude: 26.089141
                },
                {
                    name: "Sector V",
                    latitude: 44.415468,
                    longitude: 26.090047
                },
                {
                    name: "Sector VI",
                    latitude: 44.446176, 
                    longitude: 26.066406
                }
            ]
        },
        modals: {
            both: {
                scores: ["prețulului mediu", "calitații aerului", "scorului"],
                operations: ["mai mică decât", "egală cu", "mai mare decât"],
                buttons: {
                    close: "Închide"
                }
            },
            list: {
                title: "Alerte Existente",
                buttons: {
                    list: "Listare Alerte Existente",
                }
            },
            add: {
                title: "Alertă Nouă",
                buttons: {
                    add: "Adăugare Alertă",
                    add_now: "Adaugă"
                }
            },
        },
        menu: {
            items: {
                refresh: "Refresh al Datelor",
                alerts: "Manager de Alerte",
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
                    name: "Preț Mediu",
                    sortable: true
                },
                {
                    name: "Calitate Medie a Aerului",
                    sortable: true
                },
                {
                    name: "Scor",
                    sortable: true
                }
            ]
        },
        toasts: {
            bodies: {
                added_alert: "Alerta a fost atașată cu succes contului dumneavoastră.",
                deleted_alert: "Alerta a fost dezasociată cu succes.",
                invalid_alert: "Datele introduse pentru noua alertă nu respectă regulile de validare.",
                refreshed_datas: "Datele au fost reîmprospătate.",
                logout: "Delogarea a fost efectuată cu succes. Vei fi redirecționat imediat."
            }
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
                welcome: "Vă rugăm să introduceți credențialele contului dumneavoastră.",
                credentials_error: "Credențialele introduse nu respectă regulile de validare.",
                correct_credentials: "Credențialele sunt corecte. Veți fi redirectat în câteva momente",
                incorrect_credentials: "Credențialele introduse sunt incorecte"
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
                credentials_error: "Datele introduse nu respectă regulile de validare.",
                valid_credentials: "Contul a fost creat cu succes. Veți fi redirectat în câteva momente."
            }
        }
    }
}

// Export
export default config