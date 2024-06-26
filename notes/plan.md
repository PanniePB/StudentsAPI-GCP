## Set up

Update watch script -> `"watch": "nodemon index.js"`

Add dependencies

[Getting started](https://sequelize.org/docs/v6/getting-started/)

`npm install --save sequelize mysql2`

Set up DB in `db/index.js`

```js
// db/index.js
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("students_db", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});
```

Connect DB in `index.js`

```js
import { sequelize } from "./db/index.js";
import router from "./routes/students.js";

const app = express();
const port = process.env.PORT || 3000;
// DEMO TRY CATCH
try {
  const result = await sequelize.sync();
  console.log(result);
} catch (error) {
  console.log(error);
}
```

Run nodemon this will cause an error. In MySQL workbench create the DB

```sql
CREATE DATABASE students_db;
```

Create model.

```js
// models/student.js
import { Sequelize } from "sequelize";
import { sequelize } from "../db/index.js";

export const Student = sequelize.define(
  "student",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    house: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  // RENAMING AUTO GENERATED COLUMNS
  { updatedAt: "updated_at", createdAt: "created_at" }
);
```

Run watch go to MySQL workbench and see it has created the table.

Import the provide [students.json](./students.json) using the mysql import data wizard.

## CREATE / INSERT

[DOCS](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

Import model in to `controllers/students`

`import { Student } from "../models/student.js";`

```js
export const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).send({ data: `Student ID: ${student.id} created` });
  } catch (error) {
    res.status(403).send(error.message);
  }
};
```

## READ / SELECT

```js
export const getStudents = async (req, res) => {
  // COME BACK TO QUERYING
  const { name, house } = req.query;
  try {
    // SHOW ALL OF THE METHODS
    const students = await Student.findAll();
    res.send(students);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
```

### Challenge #1

```js
// UPDATE getStudentById TO USE THE Student Model
// - CAN YOU FIND BY ITS ID?
// - IN SQL WHAT TYPE OF KEY WAS THE ID?
// - IF YOU FIND A STUDENT SEND IT BACK
// - WHAT WILL YOU DO IF YOU GET BACK NULL?
//    - HOW DO YOU THROW AN ERROR IN JS?
```

```js
export const getStudentById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const student = await Student.findByPk(id);

    if (!student) {
      throw new Error("Student not found");
    }

    res.send(student);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
```

## Update & Delete

```js
export const updateStudentById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const student = await Student.update(req.body, {
      where: {
        id,
      },
    });

    if (student[0] === 0) {
      throw new Error("Student not found");
    }

    res.status(204).send();
  } catch (error) {
    res.status(404).send(error.message);
  }
};
```

### Challenge #2

```js
// UPDATE deleteStudentById TO USE THE Student Model
// - LOOK AT THE DOCS HOW DO YOU DELETE?
// - HOW CAN DO YOU KNOW IF IT HAS BEEN DELETED?
// - IF SOMETHING HAS BEEN DELETED SEND A 204 WITH NO MESSAGE
// - IF NOTHING HAS BEEN DELETED SEND A 404
```

```js
export const deleteStudentById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const student = await Student.destroy({ where: { id } });

    if (student[0] === 0) {
      throw new Error("Student not found");
    }

    res.status(204).send();
  } catch (error) {
    res.status(404).send(error.message);
  }
};
```

## QUERY PARAMS

```js
export const getStudents = async (req, res) => {
  const { name, house } = req.query;

  const query = { where: {} };

  if (name) {
    query.where.first_name = {
      [Op.like]: `%${name}%`,
    };
  }

  try {
    const students = await Student.findAll(query);
    res.send(students);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
```

### Challenge #3

```js
// UPDATE getStudents TO USE THE house QUERY
// - THE QUERY SHOULD EQUAL THE house QUERY
//  - e.g. house=compton -> WILL RETURN STUDENTS IN THE COMPTON HOUSE
//  - e.g. house=comp -> WILL RETURN STUDENTS IN THE COMP HOUSE
// READ THE DOCS & UPDATE THE QUERY IF house HAS BEEN GIVEN
```

```js
export const getStudents = async (req, res) => {
  const { name, house } = req.query;

  const query = { where: {} };

  if (name) {
    query.where.first_name = {
      [Op.like]: `%${name}%`,
    };
  }

  if (house) {
    query.where.house = {
      [Op.eq]: house,
    };
  }

  try {
    const students = await Student.findAll(query);
    res.send(students);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
```
