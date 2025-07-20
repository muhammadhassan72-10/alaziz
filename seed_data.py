#!/usr/bin/env python3

import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from src.main import app
from src.models.school import (
    db, User, UserRole, AcademicYear, Class, Subject, 
    Teacher, Student, Parent, StudentParent
)
from datetime import date, datetime

def seed_database():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        print("Seeding database with initial data...")
        
        # Create Academic Year
        academic_year = AcademicYear(
            name="2024-2025",
            start_date=date(2024, 4, 1),
            end_date=date(2025, 3, 31),
            is_current=True
        )
        db.session.add(academic_year)
        db.session.flush()
        
        # Create Subjects
        subjects = [
            Subject(name="Mathematics", code="MATH", description="Mathematics and Arithmetic"),
            Subject(name="English", code="ENG", description="English Language and Literature"),
            Subject(name="Science", code="SCI", description="General Science"),
            Subject(name="Social Studies", code="SS", description="Social Studies and History"),
            Subject(name="Urdu", code="URD", description="Urdu Language"),
            Subject(name="Computer Science", code="CS", description="Computer Science and Programming"),
            Subject(name="Physics", code="PHY", description="Physics"),
            Subject(name="Chemistry", code="CHEM", description="Chemistry"),
            Subject(name="Biology", code="BIO", description="Biology")
        ]
        
        for subject in subjects:
            db.session.add(subject)
        
        db.session.flush()
        
        # Create Classes
        classes = []
        for grade in range(1, 13):  # Grade 1 to 12
            for section in ['A', 'B']:
                class_obj = Class(
                    name=f"Grade {grade}",
                    section=section,
                    academic_year_id=academic_year.id
                )
                classes.append(class_obj)
                db.session.add(class_obj)
        
        db.session.flush()
        
        # Create Admin User
        admin_user = User(
            email="admin@crestwoodacademy.edu.pk",
            role=UserRole.ADMIN,
            is_active=True
        )
        admin_user.set_password("admin123")
        db.session.add(admin_user)
        
        # Create Principal User
        principal_user = User(
            email="principal@crestwoodacademy.edu.pk",
            role=UserRole.PRINCIPAL,
            is_active=True
        )
        principal_user.set_password("principal123")
        db.session.add(principal_user)
        
        db.session.flush()
        
        # Create Sample Teachers
        teacher_users = []
        teachers = []
        
        teacher_data = [
            {"email": "sarah.ahmed@crestwoodacademy.edu.pk", "first_name": "Sarah", "last_name": "Ahmed", "qualification": "M.Sc Mathematics"},
            {"email": "ali.hassan@crestwoodacademy.edu.pk", "first_name": "Ali", "last_name": "Hassan", "qualification": "M.A English"},
            {"email": "fatima.khan@crestwoodacademy.edu.pk", "first_name": "Fatima", "last_name": "Khan", "qualification": "M.Sc Physics"},
            {"email": "ahmed.malik@crestwoodacademy.edu.pk", "first_name": "Ahmed", "last_name": "Malik", "qualification": "M.Sc Computer Science"}
        ]
        
        for i, teacher_info in enumerate(teacher_data):
            user = User(
                email=teacher_info["email"],
                role=UserRole.TEACHER,
                is_active=True
            )
            user.set_password("teacher123")
            teacher_users.append(user)
            db.session.add(user)
            db.session.flush()
            
            teacher = Teacher(
                user_id=user.id,
                employee_id=f"TEA{i+1:06d}",
                first_name=teacher_info["first_name"],
                last_name=teacher_info["last_name"],
                phone=f"+92 300 123456{i}",
                address="Karachi, Pakistan",
                hire_date=date(2020, 1, 1),
                qualification=teacher_info["qualification"]
            )
            teachers.append(teacher)
            db.session.add(teacher)
        
        db.session.flush()
        
        # Assign class teachers
        classes[0].class_teacher_id = teachers[0].id  # Grade 1-A
        classes[1].class_teacher_id = teachers[1].id  # Grade 1-B
        classes[2].class_teacher_id = teachers[2].id  # Grade 2-A
        classes[3].class_teacher_id = teachers[3].id  # Grade 2-B
        
        # Create Sample Students
        student_users = []
        students = []
        
        student_data = [
            {"email": "student1@crestwoodacademy.edu.pk", "first_name": "Muhammad", "last_name": "Ali", "class_id": classes[0].id},
            {"email": "student2@crestwoodacademy.edu.pk", "first_name": "Ayesha", "last_name": "Khan", "class_id": classes[0].id},
            {"email": "student3@crestwoodacademy.edu.pk", "first_name": "Hassan", "last_name": "Ahmed", "class_id": classes[1].id},
            {"email": "student4@crestwoodacademy.edu.pk", "first_name": "Zara", "last_name": "Malik", "class_id": classes[1].id}
        ]
        
        for i, student_info in enumerate(student_data):
            user = User(
                email=student_info["email"],
                role=UserRole.STUDENT,
                is_active=True
            )
            user.set_password("student123")
            student_users.append(user)
            db.session.add(user)
            db.session.flush()
            
            student = Student(
                user_id=user.id,
                student_id=f"STU{i+1:06d}",
                first_name=student_info["first_name"],
                last_name=student_info["last_name"],
                date_of_birth=date(2010, 1, 1),
                gender="Male" if i % 2 == 0 else "Female",
                phone=f"+92 300 987654{i}",
                address="Karachi, Pakistan",
                admission_date=date(2024, 4, 1),
                class_id=student_info["class_id"]
            )
            students.append(student)
            db.session.add(student)
        
        db.session.flush()
        
        # Create Sample Parents
        parent_users = []
        parents = []
        
        parent_data = [
            {"email": "parent1@example.com", "first_name": "Abdullah", "last_name": "Ali", "occupation": "Engineer"},
            {"email": "parent2@example.com", "first_name": "Amna", "last_name": "Khan", "occupation": "Doctor"},
            {"email": "parent3@example.com", "first_name": "Tariq", "last_name": "Ahmed", "occupation": "Teacher"},
            {"email": "parent4@example.com", "first_name": "Sadia", "last_name": "Malik", "occupation": "Lawyer"}
        ]
        
        for i, parent_info in enumerate(parent_data):
            user = User(
                email=parent_info["email"],
                role=UserRole.PARENT,
                is_active=True
            )
            user.set_password("parent123")
            parent_users.append(user)
            db.session.add(user)
            db.session.flush()
            
            parent = Parent(
                user_id=user.id,
                first_name=parent_info["first_name"],
                last_name=parent_info["last_name"],
                phone=f"+92 300 555666{i}",
                address="Karachi, Pakistan",
                occupation=parent_info["occupation"]
            )
            parents.append(parent)
            db.session.add(parent)
        
        db.session.flush()
        
        # Create Student-Parent relationships
        for i, student in enumerate(students):
            student_parent = StudentParent(
                student_id=student.id,
                parent_id=parents[i].id,
                relationship="father" if i % 2 == 0 else "mother"
            )
            db.session.add(student_parent)
        
        # Commit all changes
        db.session.commit()
        
        print("Database seeded successfully!")
        print("\nDefault login credentials:")
        print("Admin: admin@crestwoodacademy.edu.pk / admin123")
        print("Principal: principal@crestwoodacademy.edu.pk / principal123")
        print("Teacher: sarah.ahmed@crestwoodacademy.edu.pk / teacher123")
        print("Student: student1@crestwoodacademy.edu.pk / student123")
        print("Parent: parent1@example.com / parent123")

if __name__ == "__main__":
    seed_database()

