# 25/06/2024
# Student RESTful API

This project provides a Student RESTful API using Node.js and Express.js, tested with Postman.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. It is used to build the server-side of the application.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. It is used to create the RESTful endpoints for the Student API.
- **Postman**: A collaboration platform for API development. Postman is used to test the API endpoints by making HTTP requests and verifying the responses.

 ## Next Step:
The next step is to deploy the project on Google Cloud Platform (GCP).

# 27/062024
 The project was deployed via GCP. Here are the steps to deploy the application:

1. **Create a new project on Google Cloud Platform**:
   - Go to the [Google Cloud Platform Console](https://cloud.google.com/).
   - Create a new project.

2. **Set up a SQL instance and create a database for your application**:
   - Navigate to the SQL section in the GCP Console.
   - Create a new SQL instance.
   - Set up your database and user credentials.

3. **Configure the environment variables in the GCP environment settings**:
   - Go to your project's settings.
   - Add the necessary environment variables (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME).

4. **Deploy the application**:
   - Use the GCP Cloud Console or `gcloud` CLI to deploy your application.
   - Ensure the necessary API permissions and services are enabled on GCP.

