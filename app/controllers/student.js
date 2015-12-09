var Student = require('../models/Student');

exports.getStudentById = function(req, res) {

    //get all students based on id
    Student.findById(req.params.id, function(err, student) {
        if (err)
            res.json({
                "Error": err
            });
        else
            res.json(student);
    });
};


exports.getStudents = function(req, res) {
  Student.find(function(err, students) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(students);
    }
  });
};

//create a new student
exports.postStudent = function(req, res) {

    var student = new Student({
        name: req.body.name,
        age: req.body.age
    });

    student.save(function(err) {
        if (err)
            res.json({
                'ERROR': err
            });
        else
            res.json({
                'success': student
            });
    });
};

//update the student
exports.putStudentById = function(req, res) {
    Student.findById(req.params.id, function(err, student) {
        if (err)
            res.json({
                "Error": err
            }); 
        if(!student)
            res.json({message:"Student not found"})
        else
            student.name = req.body.name;
            student.age = req.body.age;

        student.save(function(err) {
            if (err)
                res.json({
                    'ERROR': err
                });
            else
                res.json({
                    'success': student
                });
        });
    });
};

// Delete the student

exports.deleteStudent = function(req, res) {
    Student.findById(req.params.id, function(err, student) {
        if (err)
            res.json({
                'ERROR': err
            });
        else
            student.remove(function(err) {
                if (err)
                    res.json({'ERROR': err});
                else
                    res.json({'success': student});
            });
    });
};