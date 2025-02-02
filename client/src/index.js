// Import libraries
import React from "react"
import ReactDOM from "react-dom"
import WebFont from "webfontloader"
import * as ServiceWorker from "./helpers/ServiceWorker"

// Import components
import MainApplication from "./router/MainApplication"

// Load fonts
WebFont.load({
    google: {
        families: ["Roboto:300,400,700,900", "sans-serif"]
    }
})

// Render the app
ReactDOM.render(<MainApplication/>, document.getElementById("root"))

// Start the service worker
ServiceWorker.unregister()