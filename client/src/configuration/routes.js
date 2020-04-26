// Import tokens
import tokens from "./tokens"

// Import used enumerations
import {VERIFIED_TYPE} from "../components/VerifiedInputControl"

// Define configuration object
const config = {
    all: {
        app_details: {
            name: {
                short: "AIMB",
                long: "Analiza Imobiliarelor din Municipiul București"
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
            time_caption: "acum câteva secunde",
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
                scores: ["prețulului mediu per cameră", "prețulului mediu per metru pătrat", "calității aerului", "scorului"],
                operations: ["mai mic decât", "egală cu", "mai mare decât"],
                buttons: {
                    close: "Închide"
                },
                labels: {
                    value: "Valoarea",
                    for: "pentru",
                    is: "să fie",
                    compared_value: "valoarea",
                    end: "."
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
            }
        },
        menu: {
            items: {
                bird_view: "Birdview",
                calculator: "Calculator de Preț",
                alerts: "Manager de Alerte",
                logout: "Ieșire"
            }
        },
        table: {
            details: {
                title: "Birdview",
                description: "Această funcționalitate vă permite vizualizarea comparativă a metricilor pe diferite sectoare. Evidențierea unei coloane se face in mod automat odată cu punerea mouse-ului asupra unei primării afișate pe hartă.",
                note_prefix: "Notă",
                note: "Puteți sorta după o anumită coloană apăsând pe iconița din dreptul acesteia."
            },
            column_names: [
                {
                    name: "Nume",
                    sortable: false
                },
                {
                    name: "Preț Mediu per Cameră",
                    sortable: true
                },
                {
                    name: "Preț Mediu per Metru Pătrat",
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
        calculator: {
            details: {
                title: "Calculator de Preț",
                description: "Această funcționalitate vă permite calcularea prețului unui apartament, ținând cont de factori precum sectorul în care acesta se află, numărul de camere și suprafața utilă.",
                note_prefix: "Notă",
                note: "Alegerea sectorului se face selectând un punct de pe hartă ce aparține sectorului dorit."
            },
            inputs: {
                labels: {
                    choosed_sector: "Sectorul Ales",
                    number_of_rooms: "Număr de Camere",
                    number_of_square_meters: "Număr de Metri Pătrați"
                }
            },
            buttons: {
                compute: "Calculează"
            }
        },
        toasts: {
            bodies: {
                added_alert: "Alerta a fost atașată cu succes contului dumneavoastră.",
                deleted_alert: "Alerta a fost dezasociată cu succes.",
                invalid_alert: "Datele introduse pentru noua alertă nu respectă regulile de validare.",
                refreshed_datas: "Datele au fost reîmprospătate.",
                logout: "Delogarea a fost efectuată cu succes. Vei fi redirecționat în cateva momente."
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
                verified_type: VERIFIED_TYPE.EMAIL,
                name: "email",
                placeholder: "Adresă de Email"
            },
            {
                verified_type: VERIFIED_TYPE.PASSWORD,
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
                correct_credentials: "Credențialele sunt corecte. Veți fi redirectat în câteva momente.",
                incorrect_credentials: "Credențialele introduse sunt incorecte.",
                fail: "Nu s-a putut efectua logarea din cauza unei erori.",
            }
        }
    },
    register: {
        button: {
            text: "Înregistrați-vă"
        },
        inputs: [
            {
                verified_type: VERIFIED_TYPE.NAME,
                name: "full_name",
                placeholder: "Nume Complet"
            },
            {
                verified_type: VERIFIED_TYPE.EMAIL,
                name: "email",
                placeholder: "Adresă de Email"
            },
            {
                verified_type: VERIFIED_TYPE.PASSWORD,
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
                valid_credentials: "Contul a fost creat cu succes. Veți fi redirectat în câteva momente.",
                fail: "Nu s-a putut efectua înregistrarea din cauza unei erori.",
                email_already_used: "Un alt cont înregistrat folosește adresa de email introdusă."
            }
        }
    },
    errors: {
        error_prefix: "Eroare",
        types: {
            not_found: {
                description: "Pagina nu a fost gasită."
            },
            not_authorized: {
                description: "Nu aveți dreptul de a vizualiza aceasta pagină."
            },
            resolution_not_allowed: {
                description: "Device-ul dumneavoastră nu are rezoluția necesară. Incercați sa îl rotiți."
            }
        }
    }
}

// Export
export default config