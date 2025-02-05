// src/config.js

const config = {
    debug: process.env.REACT_APP_DEBUG === "true" || false,
    development_server: process.env.REACT_APP_DEV_SERVER || "error!",
    use_development_server: process.env.REACT_APP_USE_DEV_SERVER === "true" || false,
};

export default config;
