import { Student } from "../models/student.js";
import { Op } from "sequelize";

export const getStudents = async (req, res) => {
  const { name, house } = req.query;
  // TODO QUERY PARAMS

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

export const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).send({ data: `Student ID: ${student.id} created` });
  } catch (error) {
    res.status(403).send(error.message);
  }
};

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
