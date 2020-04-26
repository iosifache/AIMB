# AIMB :city_sunset:

## Setup :wrench:

1. **install** required software
   - `Python 3`
   - `npm`
   - `mongoDB`
2. **use** `mongoDB` shell or a GUI interface (for example, *[Robo 3T](https://robomongo.org/)*) to import the database from `/database` folder
3. **install** `Python`'s requirements

```
cd server
pip3 install -r requirements.txt
```

4. **run** the server with command `python3 ./server.py`
5. **install** `Javascript`'s required modules

```
cd client
npm install
```

6. **run** the client with command `npm start`

**Note**: The user interface could be tested without a server involved. In order to do this, install `npm` and follow only the **5** and **6** steps. The routes will not redirect automatically, so you will have to enter manually, in the URL bar, the desired route (one of `/register`, `/login`, and `/dashboard`).

## Resources :books:

### Javascript Modules :computer:

| Name              | Type       | Link                                                                    | 
|-------------------|------------|-------------------------------------------------------------------------|
| React Router DOM  | library    | [homepage](https://reacttraining.com/react-router)                      |
| SuperAgent        | library    | [homepage](https://visionmedia.github.io/superagent)                    |
| Web Font Loader   | library    | [Github repository](https://github.com/typekit/webfontloader)           |
| React Bootstrap   | components | [homepage](https://react-bootstrap.github.io)                           |
| React Resonsive   | components | [Github repository](https://github.com/contra/react-responsive)         |
| Video React       | components | [homepage](https://video-react.js.org)                                  |
| React Mapbox GL   | components | [homepage](https://uber.github.io/react-map-gl)                         |
| Styled Components | components | [homepage](https://styled-components.com)                               |
| React Icons       | components | [homepage](https://react-icons.netlify.com)                             |
| React Animations] | components | [Github repository](https://github.com/FormidableLabs/react-animations) |

### Python Modules  :factory:

| Name             | Link                                                                |
|------------------|---------------------------------------------------------------------|
| Flask            | [homepage](https://flask.palletsprojects.com)                       |
| pymongo          | [Github repository](https://github.com/mongodb/mongo-python-driver) |
| pycrypto         | [homepage](https://www.dlitz.net/software/pycrypto/)                |